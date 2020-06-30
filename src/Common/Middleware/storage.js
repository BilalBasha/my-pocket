import * as Sentry from '@sentry/browser'

import { UPDATED_THEME } from '../../actions'
import { UPDATE_THEME } from '../../actions'
import { UPDATE_FONT_SIZE } from '../../actions'
import { UPDATE_COLUMN_WIDTH } from '../../actions'
import { UPDATE_LINE_HEIGHT } from '../../actions'
import { UPDATE_FONT_TYPE } from '../../actions'
import { UPDATE_CARD_TYPE } from '../../actions'
import { UPDATE_IMAGE_TYPE } from '../../actions'
import { ENTER_LIST_MODE } from '../../actions'
import { ENTER_GRID_MODE } from '../../actions'
import { COLLECTION_VIEW_OPENED } from '../../actions'
import { DISCOVER_OPENED } from '../../actions'
import { READER_VIEW_OPENED } from '../../actions'
import { ITEMS_FETCHED } from '../../actions'
import { SET_LOCAL_VERSION } from '../../actions'
import { RESET_APP_VERSION } from '../../actions'
import { ENTER_DEV_MODE } from '../../actions'
import { EXIT_DEV_MODE } from '../../actions'
import { SORT_BY_NEWEST } from '../../actions'
import { SORT_BY_OLDEST } from '../../actions'
import { initialState } from '../../Containers/App/Options/options.state'
import {
  FONT_RANGE,
  DEFAULT_FONT_SIZE,
  LINE_HEIGHT_RANGE,
  DEFAULT_LINEHEIGHT,
  DEFAULT_COLUMN_WIDTH
} from '../../Common/constants'

/** Local Storage
--------------------------------------------------------------- */

const localWhiteList = [
  UPDATED_THEME,
  UPDATE_THEME,
  UPDATE_FONT_SIZE,
  UPDATE_COLUMN_WIDTH,
  UPDATE_LINE_HEIGHT,
  UPDATE_FONT_TYPE,
  UPDATE_CARD_TYPE,
  UPDATE_IMAGE_TYPE,
  ENTER_LIST_MODE,
  ENTER_GRID_MODE,
  COLLECTION_VIEW_OPENED,
  DISCOVER_OPENED,
  READER_VIEW_OPENED,
  ITEMS_FETCHED,
  SET_LOCAL_VERSION,
  SORT_BY_NEWEST,
  SORT_BY_OLDEST,
  RESET_APP_VERSION,
  ENTER_DEV_MODE,
  EXIT_DEV_MODE
]

function saveLocalData(state) {
  try {
    const localData = {
      app: {
        pathName: state.app.pathName,
        total: state.app.total,
        fetchOptions: state.app.fetchOptions
      },
      options: state.options
    }
    const serializedState = JSON.stringify(localData)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

/** Restore State
--------------------------------------------------------------- */
export function loadState() {
  try {
    const appObject = {
      authorized: false,
      sectionPayload: { subset: 'unread' }
    }

    // Get local storage items
    const storedLocal = localStorage.getItem('state')
    if (storedLocal === null) return undefined
    const localState = JSON.parse(storedLocal)

    // ! Bridge for beta/stage. Remove this on production push
    const oldFontType = localState.options.fontType
    const oldFontTypes = ['sans', 'serif', 'Sans', 'Serif']
    const current = localState.options.fontType
    const fontType = oldFontTypes.includes(oldFontType)
      ? current === 'sans' || current === 'Sans'
        ? 'graphik'
        : 'blanco'
      : oldFontType

    const oldFontSize = localState.options.fontSize
    const fontSize =
      oldFontSize > FONT_RANGE.length ? DEFAULT_FONT_SIZE : oldFontSize

    const oldColumnWidth = localState.options.columnWidth
    const columnWidth = oldColumnWidth || DEFAULT_COLUMN_WIDTH
    const oldLineHeight = localState.options.lineHeight
    const lineHeight =
      oldLineHeight > LINE_HEIGHT_RANGE.length ? DEFAULT_LINEHEIGHT : oldLineHeight

    const persistedState = {
      ...localState,
      options: { ...initialState, ...localState.options, fontType, fontSize, columnWidth, lineHeight },
      app: { ...localState.app, ...appObject }
    }

    return persistedState
  } catch (err) {
    return undefined
  }
}

/** Middleware
--------------------------------------------------------------- */
const storageMiddleware = store => next => action => {
  const actionType = action.type
  next(action)

  // whitelist actions that will need local storage
  const localChange = localWhiteList.indexOf(actionType)
  if (localChange >= 0) saveLocalData(store.getState())
}

export default storageMiddleware
