import * as Sentry from '@sentry/browser'
import { normalizeTag } from '../../../Common/helpers'
import { actionChannel, race, delay, take } from 'redux-saga/effects'
import { put, call, select } from 'redux-saga/effects'
import { takeEvery, takeLeading, takeLatest } from 'redux-saga/effects'
import { clearInclude } from '../../../Containers/Collection/collection.state'
import { replace } from 'connected-react-router'
import { LOADER_DELAY, LOADER_MINIMUM } from '../../../Common/constants'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { STORED_TAGS_SUCCESS } from '../../../actions'
import { STORED_TAGS_UPDATE } from '../../../actions'
import { EDIT_STORED_TAG_SUCCESS } from '../../../actions'
import { COLLECTION_TAGGED_UPDATE } from '../../../actions'
import { COLLECTION_TAGGED_UPDATED } from '../../../actions'
import { GATHER_TAGGED_ITEMS } from '../../../actions'
import { COLLECTION_TAGGED_OPENED } from '../../../actions'
import { COLLECTION_TAGGED_FOCUS } from '../../../actions'
import { COLLECTION_TAGGED_ACTIVE } from '../../../actions'
import { COLLECTION_TAGGED_END } from '../../../actions'
import { COLLECTION_TAGGED_SORT } from '../../../actions'
import { SORT_BY_NEWEST } from '../../../actions'
import { SORT_BY_OLDEST } from '../../../actions'
import { COLLECTION_TAGGED_INCLUDE } from '../../../actions'
import { COLLECTION_TAGGED_END_LOADING } from '../../../actions'
import { COLLECTION_TAGGED_LOADING } from '../../../actions'
import { COLLECTION_TAGGED_SHOW_LOADER } from '../../../actions'
import { COLLECTION_TAGGED_READY } from '../../../actions'
import { COLLECTION_TAGGED_NO_UPDATE } from '../../../actions'

import { COLLECTION_RECONCILE } from '../../../actions'
import { COLLECTION_TAGGED_RECONCILED } from '../../../actions'
import { COLLECTION_FOCUS } from '../../../actions'
import { COLLECTION_REFRESHED } from '../../../actions'
import { ITEMS_DELETED } from '../../../actions'
import { APP_SET_SECTION } from '../../../actions'

import { Object } from 'es6-shim'

export const collectionTaggedActions = {
  collectionTaggedOpened: payload => ({
    type: COLLECTION_TAGGED_OPENED,
    payload
  }),
  collectionTaggedFocused: payload => ({
    type: COLLECTION_TAGGED_FOCUS,
    payload
  }),
  collectionTaggedActive: payload => ({
    type: COLLECTION_TAGGED_ACTIVE,
    payload
  }),
  collectionTaggedEnd: payload => ({
    type: COLLECTION_TAGGED_END,
    payload
  }),
  setTaggedInclude: payload => ({
    type: COLLECTION_TAGGED_INCLUDE,
    payload
  })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const defaultState = {
  'untagged-items': {
    include: 'all',
    all: { offset: 0, list: [], loading: false, ready: false },
    read: { offset: 0, list: [], loading: false, ready: false },
    unread: { offset: 0, list: [], loading: false, ready: false },
    favorite: { offset: 0, list: [], loading: false, ready: false }
  }
}

export const collectionTaggedReducers = (state = defaultState, action) => {
  switch (action.type) {
    case COLLECTION_TAGGED_SHOW_LOADER: {
      const { include } = action.payload
      const tag = normalizeTag(action.payload.tag)
      const tagState = state[tag]
      const includeState = tagState[include]
      return {
        ...state,
        [tag]: {
          ...tagState,
          [include]: { ...includeState, loading: true, ready: true }
        }
      }
    }

    case COLLECTION_TAGGED_READY: {
      const { include } = action.payload
      const tag = normalizeTag(action.payload.tag)
      const tagState = state[tag]
      const includeState = tagState[include]
      return {
        ...state,
        [tag]: {
          ...tagState,
          [include]: { ...includeState, loading: false, ready: true }
        }
      }
    }

    case COLLECTION_TAGGED_UPDATED: {
      const { list, tag, offset, include } = action.payload
      const tagState = state[tag]
      return {
        ...state,
        [tag]: { ...tagState, include, [include]: { list, offset } }
      }
    }

    case COLLECTION_TAGGED_INCLUDE: {
      const { include, tag } = action.payload
      return { ...state, [tag]: { ...state[tag], include } }
    }

    case STORED_TAGS_SUCCESS: {
      const { tagsCollection } = action.payload

      return { ...state, ...tagsCollection }
    }

    case COLLECTION_TAGGED_RECONCILED: {
      const { items, sort } = action.payload
      return Object.keys(state).reduce((accumulator, current) => {
        const { all, read, unread, favorite } = state[current]
        return Object.assign({}, accumulator, {
          [current]: {
            ...state[current],
            all: { ...all, list: filter(items, current, 'all', sort) },
            read: { ...read, list: filter(items, current, 'read', sort) },
            unread: { ...unread, list: filter(items, current, 'unread', sort) },
            favorite: {
              ...favorite,
              list: filter(items, current, 'favorite', sort)
            }
          }
        })
      }, {})
    }

    case STORED_TAGS_UPDATE: {
      const { tagsCollection } = action.payload
      if (!Object.keys(tagsCollection).length) return state
      return { ...state, ...tagsCollection }
    }

    case SORT_BY_NEWEST:
    case SORT_BY_OLDEST: {
      return Object.keys(state).reduce((accumulator, current) => {
        return Object.assign({}, accumulator, {
          [current]: {
            ...state[current],
            all: { offset: 0, list: [], loading: false, ready: false },
            read: { offset: 0, list: [], loading: false, ready: false },
            unread: { offset: 0, list: [], loading: false, ready: false },
            favorite: { offset: 0, list: [], loading: false, ready: false }
          }
        })
      }, {})
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

    case EDIT_STORED_TAG_SUCCESS: {
      const { new_tag, old_tag } = action.payload
      const newSlug = normalizeTag(new_tag)
      const oldSlug = normalizeTag(old_tag)
      const tagState = state[oldSlug]
      const { [oldSlug]: deletedValue, ...stateDraft } = state // eslint-disable-line no-unused-vars
      return { ...stateDraft, [newSlug]: { ...state[newSlug], ...tagState } }
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getItemsState = state => state.items

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const collectionTaggedSagas = [
  takeEvery(COLLECTION_TAGGED_UPDATE, collectionTaggedUpdate),
  takeEvery(COLLECTION_TAGGED_OPENED, collectionTaggedActive),
  takeEvery(COLLECTION_TAGGED_ACTIVE, collectionTaggedActive),
  takeEvery(COLLECTION_REFRESHED, collectionTaggedUpdate),
  takeEvery(COLLECTION_TAGGED_SORT, collectionTaggedActive),
  takeLeading(COLLECTION_TAGGED_END, collectionTaggedEnd),
  takeLatest(COLLECTION_RECONCILE, collectionTaggedReconcile),
  takeLatest(COLLECTION_TAGGED_INCLUDE, collectionTaggedActive),
  takeLatest(COLLECTION_TAGGED_LOADING, collectionTaggedLoading),
  takeLatest(EDIT_STORED_TAG_SUCCESS, editStoredTag)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function* collectionTaggedActive({ payload }) {
  yield put({ type: APP_SET_SECTION, payload })

  const { offset } = payload
  if (offset > 0) return yield put({ type: COLLECTION_FOCUS, payload })

  yield put({ type: COLLECTION_TAGGED_LOADING, payload })
  yield put({ type: GATHER_TAGGED_ITEMS, payload })
}

function* collectionTaggedUpdate(action) {
  try {
    const { type } = action
    const { tag, offset = 0, include, sort } = action.payload
    const { count, since } = action.update
    const newOffset = type === COLLECTION_REFRESHED ? offset : offset + count

    if (!includeFilters[include]) return
    const items = yield select(getItemsState)
    const list = yield call(filter, items, tag, include, sort)
    const payload = {
      tag: normalizeTag(tag),
      list,
      include,
      since,
      offset: newOffset
    }
    yield put({ type: COLLECTION_TAGGED_UPDATED, payload })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* collectionTaggedReconcile({ payload }) {
  const { sort, subset } = payload
  if (subset !== 'tags') return

  const items = yield select(getItemsState)
  yield put({ type: COLLECTION_TAGGED_RECONCILED, payload: { items, sort } })
}

function* collectionTaggedEnd({ payload }) {
  yield put({ type: COLLECTION_TAGGED_LOADING, payload })
  yield put({ type: GATHER_TAGGED_ITEMS, payload })
}

function* editStoredTag(action) {
  const { new_tag } = action.payload
  const newSlug = normalizeTag(new_tag)
  yield put(replace(`/tags/${newSlug}`))
}

function* collectionTaggedLoading({ payload }) {
  const loadingChannel = yield actionChannel([
    COLLECTION_TAGGED_END_LOADING,
    COLLECTION_TAGGED_NO_UPDATE,
    COLLECTION_TAGGED_UPDATED
  ])

  const { confirm } = yield race({
    confirm: delay(LOADER_DELAY), // The delay prior to showing the loader
    cancel: take(loadingChannel)
  })

  if (confirm) {
    let loadFinished
    while (!loadFinished) {
      yield put({ type: COLLECTION_TAGGED_SHOW_LOADER, payload })
      yield delay(LOADER_MINIMUM) // Set this to the minimum time the loader should show
      yield take(loadingChannel)
      yield put({ type: COLLECTION_TAGGED_READY, payload })
      loadingChannel.close()
      loadFinished = true
    }
    return
  }

  yield put({ type: COLLECTION_TAGGED_READY, payload })
}

/* FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

const includeFilters = {
  all: () => true,
  unread: item => item.status === '0',
  read: item => item.status === '1',
  favorite: item => item.favorite === '1'
}

function filterByTag(tag, item) {
  if (tag === 'untagged items') return !item.tags
  return item.tags && Object.keys(item.tags).includes(tag)
}

function filter(items, tag, include, sort) {
  return Object.keys(items)
    .map(key => items[key])
    .filter(item => filterByTag(tag, item))
    .filter(includeFilters[include])
    .sort((b, a) => {
      const isNewest = sort === 'newest'
      return isNewest
        ? a.time_added - b.time_added
        : b.time_added - a.time_added
    })
    .map(item => item.item_id)
}
