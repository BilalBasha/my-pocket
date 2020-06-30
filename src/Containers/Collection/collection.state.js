import { put, select, call } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { push } from 'connected-react-router'

import { sendAnalytics } from '../../Common/Api'

import { collectionSearchReducers } from './Search/search.state'
import { collectionSearchActions } from './Search/search.state'
import { collectionSearchSagas } from './Search/search.state'

import { collectionBulkEditReducers } from './BulkEdit/bulkEdit.state'
import { collectionBulkEditActions } from './BulkEdit/bulkEdit.state'
import { collectionBulkEditSagas } from './BulkEdit/bulkEdit.state'

import { collectionOptionsReducers } from './Options/options.state'
import { collectionOptionsActions } from './Options/options.state'

import { collectionListReducers } from './Lists/lists.state'
import { collectionListSagas } from './Lists/lists.state'

import { collectionFiltersReducers } from './Filters/filters.state'
import { collectionFiltersSagas } from './Filters/filters.state'

import { collectionTaggedActions } from './Tagged/tagged.state'
import { collectionTaggedReducers } from './Tagged/tagged.state'
import { collectionTaggedSagas } from './Tagged/tagged.state'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { COLLECTION_ITEM_OPENED } from '../../actions'
import { COLLECTION_REFRESH } from '../../actions'

import { COLLECTION_OPENED } from '../../actions'
import { COLLECTION_FOCUS } from '../../actions'
import { COLLECTION_ACTIVE } from '../../actions'
import { COLLECTION_END } from '../../actions'
import { COLLECTION_INCLUDE } from '../../actions'
import { SORT_BY_NEWEST } from '../../actions'
import { SORT_BY_OLDEST } from '../../actions'
import { GOTO_UNREAD } from '../../actions'
import { GOTO_ARCHIVE } from '../../actions'
import { GOTO_FAVORITES } from '../../actions'
import { GOTO_ARTICLES } from '../../actions'
import { GOTO_VIDEOS } from '../../actions'
import { GOTO_HIGHLIGHTS } from '../../actions'
import { Object } from 'es6-shim'

export const collectionActions = {
  ...collectionSearchActions,
  ...collectionTaggedActions,
  ...collectionBulkEditActions,
  ...collectionOptionsActions,
  collectionOpened: payload => ({ type: COLLECTION_OPENED, payload }),
  collectionFocused: payload => ({ type: COLLECTION_FOCUS, payload }),
  collectionActive: payload => ({ type: COLLECTION_ACTIVE, payload }),
  collectionEnd: payload => ({ type: COLLECTION_END, payload }),
  collectionInclude: payload => ({ type: COLLECTION_INCLUDE, payload }),
  collectionItemOpened: payload => ({ type: COLLECTION_ITEM_OPENED, payload })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const collectionReducers = combineReducers({
  search: collectionSearchReducers,
  lists: collectionListReducers,
  bulkEdit: collectionBulkEditReducers,
  options: collectionOptionsReducers,
  tags: collectionTaggedReducers,
  filters: collectionFiltersReducers
})

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getSince = state => state.collection.options.since
const getCurrent = state => state.app.sectionPayload

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const collectionSagas = [
  ...collectionBulkEditSagas,
  ...collectionSearchSagas,
  ...collectionListSagas,
  ...collectionFiltersSagas,
  ...collectionTaggedSagas,
  takeEvery(COLLECTION_OPENED, collectionOpened),
  takeEvery(COLLECTION_FOCUS, collectionFocus),
  takeEvery(COLLECTION_ACTIVE, collectionActive),
  takeEvery(COLLECTION_INCLUDE, collectionInclude),
  takeEvery(SORT_BY_NEWEST, collectionSortByNewest),
  takeEvery(SORT_BY_OLDEST, collectionSortByOldest),
  takeEvery(COLLECTION_END, collectionEnd),
  takeEvery(COLLECTION_ITEM_OPENED, collectionItemOpened),
  takeLatest(GOTO_UNREAD, activateUnread),
  takeLatest(GOTO_ARCHIVE, activateArchive),
  takeLatest(GOTO_FAVORITES, activateFavorites),
  takeLatest(GOTO_ARTICLES, activateArticles),
  takeLatest(GOTO_VIDEOS, activateVideos),
  takeLatest(GOTO_HIGHLIGHTS, activateHighlights)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* collectionOpened({ payload }) {
  const { type } = payload
  const actionType = yield buildActionType(type, 'OPENED')
  yield put({ type: actionType, payload })
}

function* collectionActive({ payload }) {
  const { type } = payload
  const actionType = yield buildActionType(type, 'ACTIVE')
  yield put({ type: actionType, payload })
}

export function* collectionFocus({ payload }) {
  const since = yield select(getSince)
  yield put({ type: COLLECTION_REFRESH, payload: { ...payload, since } })
}

function* collectionInclude({ payload }) {
  const { type } = payload

  const actionType = yield buildActionType(type, 'INCLUDE')
  yield put({ type: actionType, payload })
}

function* collectionSortByNewest() {
  yield call(collectionSort, 'newest')
}

function* collectionSortByOldest() {
  yield call(collectionSort, 'oldest')
}

function* collectionSort(sort) {
  const payload = yield select(getCurrent)
  const type = payload.type || payload.subset
  const actionType = yield buildActionType(type, 'SORT')
  yield put({ type: actionType, payload: { ...payload, sort } })
}

function* collectionEnd({ payload }) {
  const { type } = payload
  const actionType = yield buildActionType(type, 'END')
  yield put({ type: actionType, payload })
}

function* collectionItemOpened({ payload }) {
  yield sendAnalytics([payload])
}

function* buildActionType(type, actionName) {
  switch (type) {
    case 'lists': {
      return yield `COLLECTION_LIST_${actionName}`
    }
    case 'filters': {
      return yield `COLLECTION_FILTER_${actionName}`
    }
    case 'tags': {
      return yield `COLLECTION_TAGGED_${actionName}`
    }
    case 'tagged': {
      return yield `COLLECTION_TAGGED_${actionName}`
    }
    case 'search': {
      return yield `COLLECTION_SEARCH_${actionName}`
    }
    default: {
      return false
    }
  }
}

/* SAGAS :: ROUTES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* activateUnread() {
  yield put(push('/'))
}

function* activateArchive() {
  yield put(push('/archive'))
}

function* activateFavorites() {
  yield put(push('/favorites/all'))
}

function* activateArticles() {
  yield put(push('/articles/all'))
}

function* activateVideos() {
  yield put(push('/videos/all'))
}

function* activateHighlights() {
  yield put(push('/highlights/all'))
}

/* UTILITIES :: RECONCILERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function clear(itemIds, { list }) {
  return list.filter(itemId => !itemIds.includes(itemId))
}

export function clearInclude(itemIds, subObject) {
  return Object.keys(subObject)
    .filter(key => key !== 'include') // Filter out include value
    .reduce((accumulator, currentKey) => {
      const includeObject = subObject[currentKey]
      const { list } = includeObject
      return Object.assign({}, accumulator, {
        [currentKey]: { ...includeObject, list: clear(itemIds, { list }) }
      })
    }, {})
}
