import * as Sentry from '@sentry/browser'
import { actionChannel } from 'redux-saga/effects'
import { call, put, select, take, race, delay } from 'redux-saga/effects'
import { takeEvery, takeLeading, takeLatest } from 'redux-saga/effects'
import { clearInclude } from '../../../Containers/Collection/collection.state'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { COLLECTION_FILTER_ACTIVE } from '../../../actions'
import { COLLECTION_FILTER_UPDATE } from '../../../actions'
import { COLLECTION_FILTER_UPDATED } from '../../../actions'
import { COLLECTION_FILTER_NO_UPDATE } from '../../../actions'
import { COLLECTION_FILTER_OPENED } from '../../../actions'
import { COLLECTION_FILTER_END } from '../../../actions'
import { COLLECTION_FILTER_SORT } from '../../../actions'
import { SORT_BY_NEWEST } from '../../../actions'
import { SORT_BY_OLDEST } from '../../../actions'
import { GATHER_FILTER_ITEMS } from '../../../actions'
import { COLLECTION_REFRESHED } from '../../../actions'
import { COLLECTION_FOCUS } from '../../../actions'
import { COLLECTION_FILTER_INCLUDE } from '../../../actions'
import { ITEMS_DELETED } from '../../../actions'
import { COLLECTION_RECONCILE } from '../../../actions'
import { COLLECTION_FILTER_RECONCILED } from '../../../actions'
import { COLLECTION_FILTER_END_LOADING } from '../../../actions'
import { COLLECTION_FILTER_LOADING } from '../../../actions'
import { COLLECTION_FILTER_SHOW_LOADER } from '../../../actions'
import { COLLECTION_FILTER_READY } from '../../../actions'

import { APP_SET_SECTION } from '../../../actions'
import { Object } from 'es6-shim'
import { LOADER_DELAY, LOADER_MINIMUM } from '../../../Common/constants'

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const defaultState = {
  favorites: {
    include: 'all',
    all: { offset: 0, list: [], loading: false, ready: false },
    read: { offset: 0, list: [], loading: false, ready: false },
    unread: { offset: 0, list: [], loading: false, ready: false }
  },
  articles: {
    include: 'all',
    all: { offset: 0, list: [], loading: false, ready: false },
    read: { offset: 0, list: [], loading: false, ready: false },
    unread: { offset: 0, list: [], loading: false, ready: false },
    favorite: { offset: 0, list: [], loading: false, ready: false }
  },
  videos: {
    include: 'all',
    all: { offset: 0, list: [], loading: false, ready: false },
    read: { offset: 0, list: [], loading: false, ready: false },
    unread: { offset: 0, list: [], loading: false, ready: false },
    favorite: { offset: 0, list: [], loading: false, ready: false }
  },
  highlights: {
    include: 'all',
    all: { offset: 0, list: [], loading: false, ready: false },
    read: { offset: 0, list: [], loading: false, ready: false },
    unread: { offset: 0, list: [], loading: false, ready: false },
    favorite: { offset: 0, list: [], loading: false, ready: false }
  }
}

export const collectionFiltersReducers = (state = defaultState, action) => {
  switch (action.type) {
    case COLLECTION_FILTER_SHOW_LOADER: {
      const { subset, include } = action.payload
      const subsetState = state[subset]
      const includeState = subsetState[include]
      return {
        ...state,
        [subset]: {
          ...subsetState,
          [include]: { ...includeState, loading: true, ready: true }
        }
      }
    }

    case COLLECTION_FILTER_READY: {
      const { subset, include } = action.payload
      const subsetState = state[subset]
      const includeState = subsetState[include]
      return {
        ...state,
        [subset]: {
          ...subsetState,
          [include]: { ...includeState, loading: false, ready: true }
        }
      }
    }

    case COLLECTION_FILTER_UPDATED: {
      const { list, subset, offset, include } = action.payload
      const subsetState = state[subset]
      return {
        ...state,
        [subset]: {
          ...subsetState,
          [include]: { ...subsetState[include], list, offset }
        }
      }
    }

    case COLLECTION_FILTER_RECONCILED: {
      const { list, subset, include } = action.payload
      const subsetState = state[subset]
      return {
        ...state,
        [subset]: {
          ...subsetState,
          [include]: { ...subsetState[include], list }
        }
      }
    }

    case COLLECTION_FILTER_INCLUDE: {
      const { subset, include } = action.payload
      return { ...state, [subset]: { ...state[subset], include } }
    }

    case SORT_BY_NEWEST:
    case SORT_BY_OLDEST: {
      return defaultState
    }

    case ITEMS_DELETED: {
      const { itemIds } = action.payload
      return Object.keys(state).reduce((accumulator, current) => {
        return Object.assign({}, accumulator, {
          [current]: {
            ...state[current],
            ...clearInclude(itemIds, state[current])
          }
        })
      }, {})
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getItemsState = state => state.items
const getFavoritesState = (state, include) =>
  state.collection.filters.favorites[include].list

/* SAGAS :: WATCHERS
 –––––––––––––––––––––––––––––––––––––––––––––––––– */
export const collectionFiltersSagas = [
  takeEvery(COLLECTION_FILTER_OPENED, collectionFilterActive),
  takeEvery(COLLECTION_FILTER_ACTIVE, collectionFilterActive),
  takeEvery(COLLECTION_FILTER_UPDATE, collectionFilterUpdate),
  takeEvery(COLLECTION_REFRESHED, collectionFilterUpdate),
  takeLeading(COLLECTION_FILTER_END, collectionFilterEnd),
  takeEvery(COLLECTION_FILTER_SORT, collectionFilterActive),
  takeLatest(COLLECTION_RECONCILE, collectionFilterReconcile),
  takeLatest(COLLECTION_FILTER_LOADING, collectionFilterLoading),
  takeLatest(COLLECTION_FILTER_INCLUDE, collectionFilterActive)
]

/* SAGAS :: RESPONDERS
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

function* collectionFilterActive({ payload }) {
  const { subset, include, offset, sort } = payload
  yield put({ type: APP_SET_SECTION, payload })
  if (offset > 0) return yield put({ type: COLLECTION_FOCUS, payload })

  yield put({ type: COLLECTION_FILTER_LOADING, payload: { subset, include } })
  yield put({
    type: GATHER_FILTER_ITEMS,
    payload: { subset, offset, include, sort }
  })
}

function* collectionFilterUpdate(action) {
  try {
    const { type } = action
    const { subset, offset = 0, include, sort } = action.payload
    const { count, since } = action.update
    const newOffset = type === COLLECTION_REFRESHED ? offset : offset + count

    if (!filters[subset]) return
    const items = yield select(getItemsState)
    const list = yield call(filters[subset], items, include, sort)
    const payload = { subset, list, since, offset: newOffset, include, sort }
    yield put({ type: COLLECTION_FILTER_UPDATED, payload })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* collectionFilterReconcile({ payload }) {
  const { subset, apiAction, include, items } = payload

  const validSubsets = ['favorites']
  if (validSubsets.indexOf(subset) === -1) return

  const validActions = ['unfavorite']
  if (validActions.indexOf(apiAction) === -1) return

  const favoritesState = yield select(getFavoritesState, include)
  const draftFavorites = favoritesState.slice()
  const itemIds = Object.keys(items)

  for (let index = 0; index < itemIds.length; index++) {
    const id = itemIds[index]
    draftFavorites.splice(draftFavorites.indexOf(id), 1)
  }

  const favoritesList = draftFavorites
  yield put({
    type: COLLECTION_FILTER_RECONCILED,
    payload: { list: favoritesList, include, subset }
  })
}

function* collectionFilterEnd({ payload }) {
  const { subset, offset, include, sort } = payload
  yield put({ type: COLLECTION_FILTER_LOADING, payload: { subset, include } })
  yield put({
    type: GATHER_FILTER_ITEMS,
    payload: { subset, offset, include, sort }
  })
}

function* collectionFilterLoading({ payload }) {
  const loadingChannel = yield actionChannel([
    COLLECTION_FILTER_END_LOADING,
    COLLECTION_FILTER_NO_UPDATE,
    COLLECTION_FILTER_UPDATED
  ])

  const { confirm } = yield race({
    confirm: delay(LOADER_DELAY), // The delay prior to showing the loader
    cancel: take(loadingChannel)
  })

  if (confirm) {
    let loadFinished
    while (!loadFinished) {
      yield put({ type: COLLECTION_FILTER_SHOW_LOADER, payload })
      yield delay(LOADER_MINIMUM) // Set this to the minimum time the loader should show
      yield take(loadingChannel)
      yield put({ type: COLLECTION_FILTER_READY, payload })
      loadingChannel.close()
      loadFinished = true
    }
    return
  }

  yield put({ type: COLLECTION_FILTER_READY, payload })
}

/* FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

const filters = {
  articles: itemsArticles,
  videos: itemsVideos,
  highlights: itemsHighlights,
  favorites: itemsFavorites
}

const fallbackInclude = () => true

const includeFilters = {
  all: fallbackInclude,
  unread: item => item.status === '0',
  read: item => item.status === '1',
  favorite: item => item.favorite === '1'
}

export function itemsArticles(items, include, sort) {
  const includeFilter = includeFilters[include] || fallbackInclude
  return Object.keys(items)
    .map(key => items[key])
    .filter(item => item.is_article === '1')
    .filter(includeFilter)
    .sort((b, a) => {
      const isNewest = sort === 'newest'
      return isNewest
        ? a.time_added - b.time_added
        : b.time_added - a.time_added
    })
    .map(item => item.item_id)
}

export function itemsVideos(items, include, sort) {
  const includeFilter = includeFilters[include] || fallbackInclude
  return Object.keys(items)
    .map(key => items[key])
    .filter(item => item.has_video === '2' || item.has_video === '1')
    .filter(includeFilter)
    .sort((b, a) => {
      const isNewest = sort === 'newest'
      return isNewest
        ? a.time_added - b.time_added
        : b.time_added - a.time_added
    })
    .map(item => item.item_id)
}

export function itemsHighlights(items, include, sort) {
  const includeFilter = includeFilters[include] || fallbackInclude
  return Object.keys(items)
    .map(key => items[key])
    .filter(
      item =>
        typeof item.annotations !== 'undefined' && item.annotations.length >= 1
    )
    .filter(includeFilter)
    .sort((b, a) => {
      const isNewest = sort === 'newest'
      return isNewest
        ? a.time_added - b.time_added
        : b.time_added - a.time_added
    })
    .map(item => item.item_id)
}

export function itemsFavorites(items, include, sort) {
  const includeFilter = includeFilters[include] || fallbackInclude
  return Object.keys(items)
    .map(key => items[key])
    .filter(item => item.favorite === '1')
    .sort((b, a) => {
      const isNewest = sort === 'newest'
      return isNewest
        ? a.time_favorited - b.time_favorited
        : b.time_favorited - a.time_favorited
    })
    .filter(includeFilter)
    .map(item => item.item_id)
}
