import * as Sentry from '@sentry/browser'
import { put, call, select, take, race } from 'redux-saga/effects'
import { takeLatest, takeLeading, takeEvery } from 'redux-saga/effects'
import { getFeed, reportItem } from '../../Common/Api'
import { arrayToObject } from '../../Common/helpers'
import { sendItemActions } from '../../Containers/App/Items/item.utilities.js'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

import { MODAL_LAUNCH } from '../../actions'
import { MODAL_CONFIRM } from '../../actions'
import { MODAL_CANCEL } from '../../actions'
import { MODAL_TYPES } from '../../Containers/App/Modal/modal.state'

import { ITEM_ADD } from '../../actions'
import { API_ACTION_DELETE } from '../../actions'
import { DISCOVER_OPENED } from '../../actions'
import { DISCOVER_CLOSED } from '../../actions'
import { DISCOVER_ITEMS_UPDATED } from '../../actions'
import { SAVE_LIST_SCROLL } from '../../actions'
import { DISCOVER_END_TRIGGER } from '../../actions'
import { SAVE_DISCOVER_ITEM } from '../../actions'
import { UNSAVE_DISCOVER_ITEM } from '../../actions'
import { REMOVE_DISCOVER_ITEM } from '../../actions'
import { DISCOVER_ITEM_SAVED } from '../../actions'
import { DISCOVER_ITEM_UNSAVED } from '../../actions'
import { DISCOVER_ITEM_REMOVED } from '../../actions'
import { DISCOVER_LOADING } from '../../actions'
import { APP_SET_SECTION } from '../../actions'

export const discoverActions = {
  discoverOpened: payload => ({ type: DISCOVER_OPENED, payload }),
  discoverClosed: () => ({ type: DISCOVER_CLOSED }),
  saveListScroll: payload => ({ type: SAVE_LIST_SCROLL, payload }),
  discoverEndTrigger: () => ({ type: DISCOVER_END_TRIGGER }),
  saveDiscoverItem: payload => ({ type: SAVE_DISCOVER_ITEM, payload }),
  unsaveDiscoverItem: payload => ({ type: UNSAVE_DISCOVER_ITEM, payload }),
  removeDiscoverItem: payload => ({ type: REMOVE_DISCOVER_ITEM, payload })
}

const initialState = {
  loading: false,
  feed: [],
  items: {},
  options: {
    offset: 0
  }
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const discoverReducers = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_ITEMS_UPDATED: {
      const { items, feed, options } = action.payload
      return {
        loading: false,
        feed: [...state.feed, ...feed],
        items: Object.assign({}, state.items, items),
        options
      }
    }

    case DISCOVER_ITEM_SAVED: {
      const feed_item_id = action.payload
      return {
        ...state,
        items: {
          ...state.items,
          [feed_item_id]: { ...state.items[feed_item_id], saved: true }
        }
      }
    }

    case DISCOVER_ITEM_UNSAVED: {
      const feed_item_id = action.payload
      return {
        ...state,
        items: {
          ...state.items,
          [feed_item_id]: { ...state.items[feed_item_id], saved: false }
        }
      }
    }

    case DISCOVER_ITEM_REMOVED: {
      const feed_item_id = action.payload
      return {
        ...state,
        feed: state.feed.filter(item_id => item_id !== feed_item_id)
      }
    }

    case DISCOVER_LOADING: {
      return {
        ...state,
        loading: true
      }
    }

    default: {
      return state
    }
  }
}

/* SAGAS :: WORKERS/SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getOffset = state => state.discover.options.offset
const getItem = (state, id) => state.discover.items[id]

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const discoverSagas = [
  takeLatest(DISCOVER_OPENED, discoverOpened),
  takeLatest(DISCOVER_CLOSED, sayGoodbye),
  takeLeading(DISCOVER_END_TRIGGER, listEndTrigger),
  takeEvery(SAVE_DISCOVER_ITEM, saveDiscoverItem),
  takeEvery(UNSAVE_DISCOVER_ITEM, unsaveDiscoverItem),
  takeLatest(REMOVE_DISCOVER_ITEM, removeDiscoverItem)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* discoverOpened() {
  yield put({ type: DISCOVER_LOADING })
  yield put({ type: APP_SET_SECTION, payload: { subset: 'discover' } })
  yield call(getDiscoverItems)
  yield put({ type: 'RESET_SIDE_NAV' })
}

function* sayGoodbye() {
  yield console.log('Goodbye Discover')
}

function* saveDiscoverItem(action) {
  const { saveId, analytics } = action.payload
  const itemFromState = yield select(getItem, saveId)
  const url = itemFromState.item.resolved_url

  yield put({ type: DISCOVER_ITEM_SAVED, payload: saveId })
  yield put({ type: ITEM_ADD, payload: { url, analytics } })
}

function* unsaveDiscoverItem(action) {
  const { saveId, analytics } = action.payload
  const itemFromState = yield select(getItem, saveId)
  const item_id = itemFromState.item.item_id

  yield put({ type: DISCOVER_ITEM_UNSAVED, payload: saveId })
  const actions = [{ action: API_ACTION_DELETE, item_id, analytics }]
  yield call(sendItemActions, actions)
}

function* removeDiscoverItem(action) {
  try {
    const { item_id, feed_item_id } = action.payload
    yield put({
      type: MODAL_LAUNCH,
      payload: { modalType: MODAL_TYPES.CONFIRM_REMOVE_FEED_ITEM }
    })

    const { confirm } = yield race({
      confirm: take(MODAL_CONFIRM),
      cancel: take(MODAL_CANCEL)
    })

    if (confirm) {
      const { reason } = confirm.payload
      yield put({ type: DISCOVER_ITEM_REMOVED, payload: feed_item_id })
      yield call(reportItem, { reason, item_id, feed_item_id })
    }
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* listEndTrigger() {
  yield call(getDiscoverItems)
}

function* getDiscoverItems() {
  try {
    const offset = yield select(getOffset)
    const count = 30
    const data = yield call(getFeed, {
      offset,
      count,
      version: 4,
      includeRedirectUrl: 1
    })

    if (data && data.feed.length) {
      const feed = data.feed.map(item => item.feed_item_id)
      const items = arrayToObject(data.feed, 'feed_item_id')
      yield put({
        type: DISCOVER_ITEMS_UPDATED,
        payload: { feed, items, options: { offset: offset + count } }
      })
    }
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}
