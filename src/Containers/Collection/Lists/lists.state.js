import * as Sentry from '@sentry/browser'
import { actionChannel } from 'redux-saga/effects'
import { call, put, select, take, race, delay } from 'redux-saga/effects'
import { takeEvery, takeLeading, takeLatest } from 'redux-saga/effects'
import { clear } from '../../../Containers/Collection/collection.state'
import { LOADER_DELAY, LOADER_MINIMUM } from '../../../Common/constants'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { GATHER_LIST_ITEMS } from '../../../actions'
import { ITEMS_DELETED } from '../../../actions'

import { COLLECTION_LIST_ACTIVE } from '../../../actions'
import { COLLECTION_LIST_UPDATE } from '../../../actions'
import { COLLECTION_LIST_NO_UPDATE } from '../../../actions'
import { COLLECTION_LIST_UPDATED } from '../../../actions'
import { COLLECTION_LIST_OPENED } from '../../../actions'
import { COLLECTION_LIST_END } from '../../../actions'
import { COLLECTION_LIST_SORT } from '../../../actions'
import { SORT_BY_NEWEST } from '../../../actions'
import { SORT_BY_OLDEST } from '../../../actions'
import { APP_SET_SECTION } from '../../../actions'
import { COLLECTION_FOCUS } from '../../../actions'
import { COLLECTION_REFRESHED } from '../../../actions'
import { COLLECTION_RECONCILE } from '../../../actions'
import { COLLECTION_LIST_RECONCILED } from '../../../actions'
import { COLLECTION_LIST_END_LOADING } from '../../../actions'
import { COLLECTION_LIST_LOADING } from '../../../actions'
import { COLLECTION_LIST_READY } from '../../../actions'
import { COLLECTION_LIST_SHOW_LOADER } from '../../../actions'

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const defaultState = {
  unread: { offset: 0, list: [], loading: false, ready: false },
  archive: { offset: 0, list: [], loading: false, ready: false }
}

export const collectionListReducers = (state = defaultState, action) => {
  switch (action.type) {
    case COLLECTION_LIST_SHOW_LOADER: {
      const { subset } = action.payload
      return {
        ...state,
        [subset]: { ...state[subset], loading: true, ready: true }
      }
    }

    case COLLECTION_LIST_READY: {
      const { subset } = action.payload
      return {
        ...state,
        [subset]: { ...state[subset], loading: false, ready: true }
      }
    }

    case COLLECTION_LIST_UPDATED: {
      const { list, subset, offset, total } = action.payload
      return {
        ...state,
        [subset]: { ...state[subset], list, offset, total }
      }
    }

    case COLLECTION_LIST_RECONCILED: {
      const { unreadList, archiveList } = action.payload
      const { unread, archive } = state
      return {
        unread: { ...unread, list: unreadList },
        archive: { ...archive, list: archiveList }
      }
    }

    case SORT_BY_NEWEST:
    case SORT_BY_OLDEST: {
      return defaultState
    }

    case ITEMS_DELETED: {
      const { unread, archive } = state
      const { itemIds } = action.payload
      return {
        unread: { ...unread, list: clear(itemIds, unread) },
        archive: { ...archive, list: clear(itemIds, archive) }
      }
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getItemsState = state => state.items
const getArchivedState = state => state.collection.lists.archive.list
const getUnreadState = state => state.collection.lists.unread.list

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const collectionListSagas = [
  takeEvery(COLLECTION_LIST_OPENED, collectionListActive),
  takeEvery(COLLECTION_LIST_ACTIVE, collectionListActive),
  takeEvery(COLLECTION_LIST_UPDATE, collectionListUpdate),
  takeEvery(COLLECTION_LIST_SORT, collectionListActive),
  takeEvery(COLLECTION_REFRESHED, collectionListUpdate),
  takeLatest(COLLECTION_RECONCILE, collectionListReconcile),
  takeLatest(COLLECTION_LIST_LOADING, collectionListLoading),
  takeLeading(COLLECTION_LIST_END, collectionListEnd)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* collectionListActive({ payload }) {
  yield put({ type: APP_SET_SECTION, payload })
  const { subset, offset, sort } = payload
  if (offset > 0) return yield put({ type: COLLECTION_FOCUS, payload })

  yield put({ type: COLLECTION_LIST_LOADING, payload: { subset } })
  yield put({ type: GATHER_LIST_ITEMS, payload: { subset, offset, sort } })
}

function* collectionListUpdate(action) {
  try {
    const { type } = action
    const { subset, offset = 0, sort } = action.payload
    const { count, since, total } = action.update
    const newOffset = type === COLLECTION_REFRESHED ? offset : offset + count

    if (!itemFilters[subset]) return
    const items = yield select(getItemsState)
    const list = yield call(itemFilters[subset], items, sort)
    const payload = {
      subset,
      list,
      since,
      sort,
      offset: newOffset,
      total: parseInt(total)
    }
    yield put({ type: COLLECTION_LIST_UPDATED, payload })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* collectionListReconcile({ payload }) {
  const { subset, apiAction, items } = payload

  const validSubsets = ['unread', 'archive']
  if (validSubsets.indexOf(subset) === -1) return

  const validActions = ['archive', 'readd']
  if (validActions.indexOf(apiAction) === -1) return

  const archiveState = yield select(getArchivedState)
  const unreadState = yield select(getUnreadState)

  const draftArchive = archiveState.slice()
  const draftUnread = unreadState.slice()

  const itemIds = Object.keys(items)

  for (let index = 0; index < itemIds.length; index++) {
    const id = itemIds[index]
    if (apiAction === 'archive') draftUnread.splice(draftUnread.indexOf(id), 1)
    if (apiAction === 'readd') draftArchive.splice(draftArchive.indexOf(id), 1)
  }

  const unreadList = draftUnread
  const archiveList = draftArchive

  yield put({
    type: COLLECTION_LIST_RECONCILED,
    payload: { unreadList, archiveList }
  })
}

function* collectionListEnd({ payload }) {
  // TODO: Should we check for more?
  const hasMoreItems = true
  const { subset, offset, sort } = payload

  // YES!
  if (hasMoreItems) {
    yield put({ type: COLLECTION_LIST_LOADING, payload: { subset } })
    return yield put({
      type: GATHER_LIST_ITEMS,
      payload: { subset, offset, sort }
    })
  }

  // NO
  yield put({ type: COLLECTION_LIST_END_LOADING, payload: { subset } })
}

function* collectionListLoading({ payload }) {
  const loadingChannel = yield actionChannel([
    COLLECTION_LIST_END_LOADING,
    COLLECTION_LIST_NO_UPDATE,
    COLLECTION_LIST_UPDATED
  ])

  const { confirm } = yield race({
    confirm: delay(LOADER_DELAY), // The delay prior to showing the loader
    cancel: take(loadingChannel)
  })

  if (confirm) {
    let loadFinished
    while (!loadFinished) {
      yield put({ type: COLLECTION_LIST_SHOW_LOADER, payload })
      yield delay(LOADER_MINIMUM) // Set this to the minimum time the loader should show
      yield take(loadingChannel)
      yield put({ type: COLLECTION_LIST_READY, payload })
      loadingChannel.close()
      loadFinished = true
    }
    return
  }

  yield put({ type: COLLECTION_LIST_READY, payload })
}

/* FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

const itemFilters = {
  unread: itemsUnread,
  archive: itemsArchive
}

export function itemsUnread(items, sort) {
  return Object.keys(items)
    .map(key => items[key])
    .filter(item => item.status === '0')
    .sort((b, a) => {
      const isNewest = sort === 'newest'
      return isNewest
        ? a.time_added - b.time_added
        : b.time_added - a.time_added
    })
    .map(item => item.item_id)
}

export function itemsArchive(items, sort) {
  return Object.keys(items)
    .map(key => items[key])
    .filter(item => item.status === '1')
    .sort((b, a) => {
      const isNewest = sort === 'newest'
      return isNewest ? a.time_read - b.time_read : b.time_read - a.time_read
    })
    .map(item => item.item_id)
}
