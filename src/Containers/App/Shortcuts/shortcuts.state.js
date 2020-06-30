import * as Sentry from '@sentry/browser'
import { put, takeLeading, takeEvery, select, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { urlWithPocketRedirect } from '../../../Common/helpers'

/* ACTIONS: CONSTANTS
--------------------------------------------------------------- */
import { SHORTCUT_SET_SELECTED, UPDATE_FONT_SIZE } from '../../../actions'
import { SHORTCUT_SELECT_FAVORITE } from '../../../actions'
import { SHORTCUT_SELECT_NEXT } from '../../../actions'
import { SHORTCUT_SELECT_PREV } from '../../../actions'
import { SHORTCUT_CLEAR_SELECTED } from '../../../actions'
import { SHORTCUT_SELECT_OPEN } from '../../../actions'
import { SHORTCUT_SELECT_ARCHIVE } from '../../../actions'
import { SHORTCUT_SELECT_VISIT } from '../../../actions'
import { SHORTCUT_SELECT_TAG } from '../../../actions'
import { SHORTCUT_FONT_INCREASE } from '../../../actions'
import { SHORTCUT_FONT_DECREASE } from '../../../actions'
import { SHORTCUT_ESC } from '../../../actions'

import { ITEMS_ARCHIVE } from '../../../actions'
import { ITEMS_READD } from '../../../actions'
import { ITEMS_FAVORITE } from '../../../actions'
import { ITEMS_UNFAVORITE } from '../../../actions'
import { ITEMS_TAGGING } from '../../../actions'
import { MODAL_CANCEL } from '../../../actions'

import { FONT_RANGE } from '../../../Common/constants'
import { ANALYTICS_KEYS } from '../../../Common/constants'
const { UI, VIEW, LIST_MODE } = ANALYTICS_KEYS

/* REDUCERS :: STATE SHAPE
--------------------------------------------------------------- */
export const shortcutReducers = (state = { selected: false }, action) => {
  switch (action.type) {
    case SHORTCUT_SET_SELECTED: {
      const { payload } = action
      return Object.assign({}, state, payload)
    }

    case SHORTCUT_CLEAR_SELECTED: {
      return Object.assign({}, state, { selected: false })
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getActiveList = state => {
  const { subset, include, tag, type, search } = state.app.sectionPayload

  // Search
  if (search) return state.collection.search.list

  // Tagging
  if (tag) return state.collection.tags[tag][include].list

  return include
    ? state.collection[type][subset][include].list
    : state.collection[type][subset].list
}

const getActionPayload = state => state.app.sectionPayload
const getCurrentSelection = state => state.shortcuts.selected
const getItem = (state, item_id) => state.items[item_id]
const getListMode = state => state.options.listMode
const isReader = state => {
  return /^\/read\/?(.+)?/.test(state.router.location.pathname)
}
const getCurrentReader = state => state.reader.item_id
const fontSize = state => state.options.fontSize

/* SAGAS :: WATCHERS
--------------------------------------------------------------- */
export const shortcutSagas = [
  takeEvery(SHORTCUT_SELECT_NEXT, shortcutSelect),
  takeEvery(SHORTCUT_SELECT_PREV, shortcutSelect),
  takeLeading(SHORTCUT_SELECT_OPEN, shortcutOpen),
  takeEvery(SHORTCUT_SELECT_ARCHIVE, shortcutArchive),
  takeEvery(SHORTCUT_SELECT_FAVORITE, shortcutFavorite),
  takeEvery(SHORTCUT_SELECT_VISIT, shortcutVisit),
  takeEvery(SHORTCUT_SELECT_TAG, shortcutTag),
  takeEvery(SHORTCUT_FONT_INCREASE, shortcutFontIncrease),
  takeEvery(SHORTCUT_FONT_DECREASE, shortcutFontDecrease),
  takeEvery(SHORTCUT_ESC, shortcutEsc)
]

/* SAGAS :: RESPONDERS
--------------------------------------------------------------- */
function* shortcutSelect(action) {
  try {
    const section = yield select(getActiveList)
    const current = yield select(getCurrentSelection)
    const direction = action.type === SHORTCUT_SELECT_NEXT ? 1 : -1
    const position = current ? section.indexOf(current) + direction : 0

    yield put({
      type: SHORTCUT_SET_SELECTED,
      payload: { selected: section[position] }
    })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* shortcutOpen() {
  const current = yield select(getCurrentSelection)
  if (current) {
    const item = yield select(getItem, current)
    const { has_video, has_image, is_article } = item
    if (has_video === '2' || has_image === '2' || is_article === '1') {
      return yield put(push(`/read/${current}`))
    }
    return window.open(urlWithPocketRedirect(item.given_url), '_blank')
  }
}

function* shortcutVisit() {
  const reader = yield select(isReader)
  const current = reader
    ? yield select(getCurrentReader)
    : yield select(getCurrentSelection)
  if (current) {
    const item = yield select(getItem, current)
    return window.open(urlWithPocketRedirect(item.given_url), '_blank')
  }
}

function* shortcutArchive() {
  const reader = yield select(isReader)
  const current = reader
    ? yield select(getCurrentReader)
    : yield select(getCurrentSelection)

  if (current) {
    const item = yield select(getItem, current)
    const itemAction = item.status === '0' ? archive : reAdd

    yield call(itemAction, current)
  }
}

function* shortcutFavorite() {
  const current = yield select(getCurrentSelection)
  if (current) {
    const item = yield select(getItem, current)
    const itemAction = item.favorite === '0' ? favorite : unfavorite

    yield call(itemAction, current)
  }
}

function* shortcutTag() {
  const current = yield select(getCurrentSelection)
  if (current) {
    yield call(tagging, current)
  }
}

function* shortcutFontIncrease() {
  const reader = yield select(isReader)
  if (!reader) return

  const current = yield select(fontSize)
  const length = FONT_RANGE.length
  if (current < length - 1) {
    yield put({ type: UPDATE_FONT_SIZE, payload: { size: current + 1 } })
  }
}

function* shortcutFontDecrease() {
  const reader = yield select(isReader)
  if (!reader) return

  const current = yield select(fontSize)
  if (current > 0) {
    yield put({ type: UPDATE_FONT_SIZE, payload: { size: current - 1 } })
  }
}

/* ITEM MODIFICATION
--------------------------------------------------------------- */

function* buildPayload(current) {
  const sectionPayload = yield select(getActionPayload)
  const list = yield select(getActiveList)
  const itemIndex = list.indexOf(current)
  const item = yield select(getItem, current)
  const listMode = yield select(getListMode)
  return {
    ...sectionPayload,
    items: { [item.item_id]: { itemIndex } },
    analytics: {
      [UI]: 'shortcut_key',
      [VIEW]: 'list',
      [LIST_MODE]: listMode
    }
  }
}

function* archive(current) {
  const payload = yield buildPayload(current)
  yield put({ type: ITEMS_ARCHIVE, payload })
  yield put({ type: SHORTCUT_CLEAR_SELECTED })
}

function* reAdd(current) {
  const payload = yield buildPayload(current)
  yield put({ type: ITEMS_READD, payload })
  yield put({ type: SHORTCUT_CLEAR_SELECTED })
}

function* favorite(current) {
  const payload = yield buildPayload(current)
  yield put({ type: ITEMS_FAVORITE, payload })
}

function* unfavorite(current) {
  const payload = yield buildPayload(current)
  yield put({ type: ITEMS_UNFAVORITE, payload })
}

function* tagging(current) {
  const payload = yield buildPayload(current)
  yield put({ type: ITEMS_TAGGING, payload })
}

function* shortcutEsc() {
  yield put({ type: SHORTCUT_CLEAR_SELECTED })
  yield put({ type: MODAL_CANCEL })
}
