import * as Sentry from '@sentry/browser'
import { call, put, select } from 'redux-saga/effects'
import { actionChannel, race, delay, take } from 'redux-saga/effects'
import { takeEvery, takeLatest, takeLeading } from 'redux-saga/effects'
import { push, replace } from 'connected-react-router'
import { clear } from '../../../Containers/Collection/collection.state'
import { getBool } from '../../../Common/helpers'
import { saveRecentSearch } from '../../../Common/Api'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { COLLECTION_SEARCH_OPENED } from '../../../actions'
import { COLLECTION_SEARCH } from '../../../actions'
import { COLLECTION_SEARCH_END } from '../../../actions'
import { COLLECTION_SEARCH_UPDATE } from '../../../actions'
import { COLLECTION_SEARCH_UPDATED } from '../../../actions'
import { COLLECTION_SEARCH_INCLUDE } from '../../../actions'
import { COLLECTION_SEARCH_FAILED } from '../../../actions'
import { COLLECTION_SEARCH_FROM } from '../../../actions'
import { COLLECTION_FILTER_OPENED } from '../../../actions'
import { COLLECTION_LIST_OPENED } from '../../../actions'
import { COLLECTION_TAGGED_OPENED } from '../../../actions'
import { COLLECTION_SEARCH_END_LOADING } from '../../../actions'
import { COLLECTION_SEARCH_LOADING } from '../../../actions'
import { COLLECTION_SEARCH_SHOW_LOADER } from '../../../actions'
import { COLLECTION_SEARCH_READY } from '../../../actions'

import { APP_SET_SECTION } from '../../../actions'
import { ITEMS_DELETED } from '../../../actions'

import { GATHER_SEARCH_ITEMS } from '../../../actions'
import { SEARCH_UPDATE_RESET } from '../../../actions'

import { EXIT_SEARCH_MODE } from '../../../actions'
import { MODE_CHANGE } from '../../../actions'
import { LOADER_DELAY, LOADER_MINIMUM } from '../../../Common/constants'

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const stored_premium_status = localStorage.getItem('premium_status')
const defaultInclude = getBool(stored_premium_status) ? 'all' : 'unread'
const defaultState = {
  query: '',
  count: 0,
  offset: 0,
  list: [],
  include: defaultInclude,
  loading: false,
  ready: false,
  searchedFrom: { subset: 'unread' }
}

export const collectionSearchReducers = (state = defaultState, action) => {
  switch (action.type) {
    case SEARCH_UPDATE_RESET: {
      const { include, sort } = state
      return { ...defaultState, include, sort }
    }

    case COLLECTION_SEARCH_SHOW_LOADER: {
      return { ...state, loading: true, ready: true }
    }

    case COLLECTION_SEARCH_READY: {
      return { ...state, loading: false, ready: true }
    }

    case COLLECTION_SEARCH_UPDATED: {
      return { ...state, ...action.payload }
    }

    case COLLECTION_SEARCH_FROM: {
      const { searchedFrom } = action.payload
      return { ...state, searchedFrom }
    }

    case COLLECTION_SEARCH: {
      const { include, searchedFrom, sort } = state
      return {
        ...defaultState,
        searchedFrom,
        sort,
        include,
        query: action.payload.value
      }
    }

    case ITEMS_DELETED: {
      const { itemIds } = action.payload
      return { ...state, list: clear(itemIds, { list: state.list }) }
    }

    case COLLECTION_SEARCH_INCLUDE: {
      const { include, value, sort } = action.payload
      const { searchedFrom } = state
      return {
        ...defaultState,
        query: value,
        include,
        sort,
        searchedFrom
      }
    }

    default: {
      return state
    }
  }
}

export const collectionSearchActions = {
  openSearch: payload => ({ type: COLLECTION_SEARCH_OPENED, payload }),
  searchCollection: payload => ({ type: COLLECTION_SEARCH, payload }),
  enterSearchMode: () => ({ type: MODE_CHANGE, payload: 'search' }),
  exitSearchMode: () => ({ type: EXIT_SEARCH_MODE }),
  setSearchInclude: payload => ({ type: COLLECTION_SEARCH_INCLUDE, payload }),
  collectionSearchEnd: payload => ({ type: COLLECTION_SEARCH_END, payload })
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getCurrentSearch = state => state.collection.search
const getSectionPayload = state => state.app.sectionPayload
const getPremium = state => getBool(state.app.isPremium)

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const collectionSearchSagas = [
  takeEvery(EXIT_SEARCH_MODE, exitSearchMode),
  takeEvery(COLLECTION_FILTER_OPENED, resetSearch),
  takeEvery(COLLECTION_LIST_OPENED, resetSearch),
  takeEvery(COLLECTION_TAGGED_OPENED, resetSearch),
  takeLatest(COLLECTION_SEARCH_OPENED, collectionSearchOpen),
  takeLatest(COLLECTION_SEARCH, collectionSearch),
  takeEvery(COLLECTION_SEARCH_UPDATE, collectionSearchUpdate),
  takeLatest(COLLECTION_SEARCH_LOADING, collectionSearchLoading),
  takeLeading(COLLECTION_SEARCH_END, collectionSearchEnd),
  takeEvery(COLLECTION_SEARCH_INCLUDE, collectionSearch)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* collectionSearchOpen({ payload }) {
  // Have we just done an organic search here?
  const { query } = yield select(getCurrentSearch)
  if (query === payload.value) return

  yield call(collectionSearch, { payload })
}

function* collectionSearch(action) {
  try {
    const isPremium = yield select(getPremium)
    const {
      value,
      offset = 0,
      include = isPremium ? 'all' : 'unread',
      sort = isPremium ? 'relevance' : 'newest'
    } = action.payload

    const payload = {
      search: value,
      subset: 'search',
      offset,
      include,
      sort
    }

    // toggle search mode
    if (!value) return yield put({ type: EXIT_SEARCH_MODE })

    // Start the loader
    yield put({ type: COLLECTION_SEARCH_LOADING, payload })

    // Where did we search from
    const searchedFrom = yield getSearchedFrom()
    yield put({ type: COLLECTION_SEARCH_FROM, payload: { searchedFrom } })

    // Set Section
    yield put({ type: APP_SET_SECTION, payload })

    // Perform a search
    yield put({ type: GATHER_SEARCH_ITEMS, payload })
    yield put(replace(`/search/${value}`))

    // Save to recent search ... ?? is this only on success
    if (isPremium) yield call(saveSearch, value)
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

export function* collectionSearchUpdate(action) {
  try {
    const { search, offset = 0, include, sort } = action.payload
    const { count, list, search_meta } = action.update
    const { total_result_count, has_more } = search_meta

    const current = yield select(getCurrentSearch)
    const sortedList = yield call(sortedSearch, list)

    const newList =
      current.query === search ? [...current.list, ...sortedList] : sortedList

    const payload = {
      list: newList,
      offset: offset + count,
      query: search,
      subset: 'search',
      sort,
      total_result_count,
      include,
      has_more
    }
    yield put({ type: COLLECTION_SEARCH_UPDATED, payload })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* collectionSearchEnd(action) {
  const { value, offset, has_more, include, sort } = action.payload
  const payload = { search: value, offset, sort, include }

  // Are there more items to load?
  if (has_more) {
    // Start the loader
    yield put({ type: COLLECTION_SEARCH_LOADING, payload })
    yield put({ type: GATHER_SEARCH_ITEMS, payload })
  }

  // NO
  yield put({ type: COLLECTION_SEARCH_END_LOADING, payload })
}

function* collectionSearchLoading({ payload }) {
  const loadingChannel = yield actionChannel([
    COLLECTION_SEARCH_END_LOADING,
    COLLECTION_SEARCH_FAILED,
    COLLECTION_SEARCH_UPDATED
  ])

  const { confirm } = yield race({
    confirm: delay(LOADER_DELAY), // The delay prior to showing the loader
    cancel: take(loadingChannel)
  })

  if (confirm) {
    let loadFinished
    while (!loadFinished) {
      yield put({ type: COLLECTION_SEARCH_SHOW_LOADER, payload })
      yield delay(LOADER_MINIMUM) // Set this to the minimum time the loader should show
      yield take(loadingChannel)
      yield put({ type: COLLECTION_SEARCH_READY, payload })
      loadingChannel.close()
      loadFinished = true
    }
    return
  }

  yield put({ type: COLLECTION_SEARCH_READY, payload })
}

function* exitSearchMode() {
  const currentSearch = yield select(getCurrentSearch)
  const { query, include, sort, searchedFrom } = currentSearch

  // exit an existing search
  if (query !== '') {
    yield put({ type: SEARCH_UPDATE_RESET, payload: { include, sort } })

    const { subset, tag } = searchedFrom

    if (!subset || subset === 'unread') return yield put(push('/'))
    if (subset === 'tagged') return yield put(push(`/tags/${tag}`))
    yield put(push(`/${subset}`))
  }
}

function* resetSearch() {
  const currentSearch = yield select(getCurrentSearch)
  const { query, include, sort } = currentSearch

  // exit an existing search
  if (query !== '') {
    yield put({
      type: SEARCH_UPDATE_RESET,
      payload: { include, sort, searchedFrom: { subset: 'unread' } }
    })
  }
}

function* getSearchedFrom() {
  // Get previous section
  const sectionPayload = yield select(getSectionPayload)
  const current = yield select(getCurrentSearch)
  const { subset, value } = sectionPayload
  const { searchedFrom } = current

  if (subset === 'search' || value) return searchedFrom
  return sectionPayload
}

function* saveSearch(search) {
  const data = yield saveRecentSearch(search)
  if (data) {
    // TODO: update the recent search state with the new search
    // yield put({type: RECENT_SEARCH_SUCCESS, recent_searches})
  }
}
/* SAGAS :: FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sortedSearch(items) {
  return Object.keys(items)
    .map(key => items[key])
    .sort((a, b) => a.sort_id - b.sort_id)
    .map(item => item.item_id)
}
