import { takeEvery, select } from 'redux-saga/effects'
import { startSession, endSession } from './analytics.reader.timer'
import { sendAnalytics } from '../../../Common/Api'
import { ANALYTICS_KEYS } from '../../../Common/constants'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { APP_INITIALIZED } from '../../../actions'
import { COLLECTION_OPENED } from '../../../actions'
import { COLLECTION_ACTIVE } from '../../../actions'
import { DISCOVER_OPENED } from '../../../actions'
import { DISCOVER_LOAD_EXTERNAL } from '../../../actions'
import { READER_VIEW_OPENED } from '../../../actions'
import { READER_VIEW_CLOSED } from '../../../actions'
import { READER_EXIT_METHOD } from '../../../actions'
import { TRACK_CLICK } from '../../../actions'

export const analyticsActions = {
  trackClick: payload => ({ type: TRACK_CLICK, payload })
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const analyticsSagas = [
  takeEvery(APP_INITIALIZED, appInitialized),
  takeEvery(COLLECTION_OPENED, collectionOpened),
  takeEvery(COLLECTION_ACTIVE, collectionOpened),
  takeEvery(DISCOVER_OPENED, discoverOpened),
  takeEvery(DISCOVER_LOAD_EXTERNAL, discoverLoadExternal),
  takeEvery(READER_VIEW_OPENED, readerOpened),
  takeEvery(READER_VIEW_CLOSED, readerClosed),
  takeEvery(READER_EXIT_METHOD, readerExitMethod),
  takeEvery(TRACK_CLICK, trackClick)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const { UI, VIEW, LIST_MODE, INDEX } = ANALYTICS_KEYS
const getListMode = state => state.options.listMode

function* appInitialized() {
  yield sendAnalytics([{ action: 'opened_app' }])
}

function* collectionOpened() {
  const listMode = yield select(getListMode)

  yield sendAnalytics([
    {
      action: 'opened_list',
      [VIEW]: 'list',
      [LIST_MODE]: listMode
    }
  ])
}

function* discoverOpened() {
  yield sendAnalytics([{ action: 'opened_feed' }])
}

function* discoverLoadExternal({ payload }) {
  yield sendAnalytics([{ action: 'opened_feed', ...payload }])
}

function* readerOpened({ payload }) {
  const { item_id } = payload

  yield startSession({
    trigger: 'opened_article',
    view: 'list',
    item_id
  })
}

function readerClosed({ payload }) {
  endSession({ action: 'closed_reader' })
}

function* readerExitMethod({ payload }) {
  yield sendAnalytics([
    {
      action: 'left_item',
      item_id: payload.item_id,
      [VIEW]: 'reader',
      [UI]: payload.ui
    }
  ])
}

function* trackClick({ payload }) {
  yield sendAnalytics([{ action: 'pv_wt', ...payload }])
}

export function addIndexToAnalytics(itemIndex, analytics) {
  if (itemIndex === false) return analytics
  return Object.assign({}, analytics, { [INDEX]: itemIndex })
}
