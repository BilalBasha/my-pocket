import { takeLatest, put, select, call } from 'redux-saga/effects'
import { Themes } from '../../../Components/Elements/Themes/themes'
import { FONT_TYPES } from '../../../Common/constants'
import { APP_VERSION } from '../../../Common/constants'
import { getBool } from '../../../Common/helpers'
import { getSettings, setReleaseVersion } from '../../../Common/Api'
import { getReleaseNotes } from '../../../Containers/App/Localization/localization'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { APP_INITIALIZED } from '../../../actions'
import { UPDATED_THEME } from '../../../actions'
import { UPDATE_THEME } from '../../../actions'
import { UPDATE_FONT_SIZE } from '../../../actions'
import { UPDATE_FONT_TYPE } from '../../../actions'
import { UPDATE_CARD_TYPE } from '../../../actions'
import { UPDATE_IMAGE_TYPE } from '../../../actions'
import { ENTER_LIST_MODE } from '../../../actions'
import { ENTER_GRID_MODE } from '../../../actions'
import { ENTER_DEV_MODE } from '../../../actions'
import { EXIT_DEV_MODE } from '../../../actions'
import { TOGGLE_DEV_MODE } from '../../../actions'
import { UPDATE_COLUMN_WIDTH } from '../../../actions'
import { UPDATE_LINE_HEIGHT } from '../../../actions'
import { READER_VIEW_OPENED } from '../../../actions'
import { ANNOTATE_ADD } from '../../../actions'
import { RESET_ACTIVE_HIGHLIGHTS } from '../../../actions'
import { RESET_APP_VERSION } from '../../../actions'
import { OPEN_WHATS_NEW } from '../../../actions'
import { SORT_BY_OLDEST } from '../../../actions'
import { SORT_BY_NEWEST } from '../../../actions'

import { MODAL_TYPES } from '../../../Containers/App/Modal/modal.state'
import { MODAL_LAUNCH } from '../../../actions'
// import { MODAL_CONFIRM } from '../../../actions'
// import { MODAL_CANCEL } from '../../../actions'
import { SET_LOCAL_VERSION } from '../../../actions'
import { DEFAULT_FONT_SIZE } from '../../../Common/constants'
import { DEFAULT_COLUMN_WIDTH } from '../../../Common/constants'
import { DEFAULT_LINEHEIGHT } from '../../../Common/constants'

export const optionsActions = {
  themeChange: theme => ({ type: UPDATE_THEME, payload: { theme } }),
  fontSizeChange: size => ({ type: UPDATE_FONT_SIZE, payload: { size } }),
  fontTypeChange: type => ({ type: UPDATE_FONT_TYPE, payload: { type } }),
  columnWidthChange: columnWidth => ({
    type: UPDATE_COLUMN_WIDTH,
    payload: { columnWidth }
  }),
  cardTypeChange: type => ({ type: UPDATE_CARD_TYPE, payload: { type } }),
  imageTypeChange: type => ({ type: UPDATE_IMAGE_TYPE, payload: { type } }),
  enterListMode: () => ({ type: ENTER_LIST_MODE }),
  enterGridMode: () => ({ type: ENTER_GRID_MODE }),
  setSortByOldest: () => ({ type: SORT_BY_OLDEST }),
  setSortByNewest: () => ({ type: SORT_BY_NEWEST }),
  openWhatsNew: () => ({ type: OPEN_WHATS_NEW }),
  lineHeightChange: lineHeight => ({
    type: UPDATE_LINE_HEIGHT,
    payload: { lineHeight }
  })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const initialState = {
  cardType: 'standard',
  imageType: 'fixed',
  theme: 'light',
  lineHeight: DEFAULT_LINEHEIGHT,
  columnWidth: DEFAULT_COLUMN_WIDTH,
  fontSize: DEFAULT_FONT_SIZE,
  fontType: 'blanco',
  taggingDisplay: false,
  listMode: 'grid',
  devMode: false,
  sort: 'newest'
}

export const optionsReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATED_THEME: {
      return { ...state, theme: action.payload.theme }
    }
    case UPDATE_FONT_SIZE: {
      return { ...state, fontSize: action.payload.size }
    }
    case UPDATE_FONT_TYPE: {
      return { ...state, fontType: action.payload.type }
    }
    case UPDATE_COLUMN_WIDTH: {
      return { ...state, columnWidth: action.payload.columnWidth }
    }
    case UPDATE_LINE_HEIGHT: {
      return { ...state, lineHeight: action.payload.lineHeight }
    }
    case UPDATE_CARD_TYPE: {
      return { ...state, cardType: action.payload.type }
    }
    case UPDATE_IMAGE_TYPE: {
      return { ...state, imageType: action.payload.type }
    }

    case ENTER_LIST_MODE: {
      return { ...state, listMode: 'list' }
    }

    case ENTER_GRID_MODE: {
      return { ...state, listMode: 'grid' }
    }

    case ENTER_DEV_MODE: {
      return { ...state, devMode: true }
    }

    case SORT_BY_OLDEST: {
      return { ...state, sort: 'oldest' }
    }

    case SORT_BY_NEWEST: {
      return { ...state, sort: 'newest' }
    }

    case EXIT_DEV_MODE: {
      return { ...state, devMode: false }
    }

    case ANNOTATE_ADD: {
      return { ...state, activeHighlight: true }
    }

    case RESET_ACTIVE_HIGHLIGHTS: {
      return { ...state, activeHighlight: false }
    }

    case RESET_APP_VERSION: {
      return { ...state, version: null }
    }

    case SET_LOCAL_VERSION: {
      return { ...state, version: action.payload.version }
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getTheme = state => state.options.theme
const getDevMode = state => state.options.devMode
const getFont = state => state.options.fontType
const getPremium = state => state.app.isPremium
const getVersion = state => state.options.version

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const optionsSagas = [
  takeLatest(APP_INITIALIZED, adjustBackground),
  takeLatest(APP_INITIALIZED, checkWhatsNew),
  takeLatest(UPDATE_THEME, updateTheme),
  takeLatest(TOGGLE_DEV_MODE, toggleDevMode),
  takeLatest(READER_VIEW_OPENED, checkPremium),
  takeLatest(OPEN_WHATS_NEW, launchWhatsNew)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* updateTheme(action) {
  const { theme } = action.payload
  document.body.style.backgroundColor = Themes[theme].body.background
  yield put({ type: UPDATED_THEME, payload: action.payload })
}

function* adjustBackground() {
  const theme = yield select(getTheme)
  // Update background color to avoid flashing
  document.body.style.backgroundColor = Themes[theme].body.background
}

function* toggleDevMode() {
  if (process.env.REACT_APP_QA !== 'available') return

  const devMode = yield select(getDevMode)
  const type = devMode ? EXIT_DEV_MODE : ENTER_DEV_MODE
  yield put({ type })
}

function* checkPremium() {
  const isPremium = yield select(getPremium)
  const fontType = yield select(getFont)

  if (getBool(isPremium)) return

  if (FONT_TYPES[fontType].premium) {
    yield put({ type: UPDATE_FONT_TYPE, payload: { type: 'blanco' } })
  }
}

function* checkWhatsNew({ payload }) {
  const data = yield call(getSettings)
  const { lastWebReleaseNotes } = data || {}

  // TODO: Remove this on next app version
  const localVersion = yield select(getVersion)
  if (localVersion === 'production01') {
    yield setReleaseVersion(APP_VERSION)
    return
  }

  if (lastWebReleaseNotes && lastWebReleaseNotes === APP_VERSION) {
    return
  }

  const { size, height } = payload
  const validSizes = ['LARGE', 'MEDIUM']
  const validSize = validSizes.includes(size) && height > 700

  if (validSize) {
    yield call(launchWhatsNew)
    yield setReleaseVersion(APP_VERSION)
    yield put({ type: SET_LOCAL_VERSION, payload: { version: APP_VERSION } })
  }
  return
}

function* launchWhatsNew() {
  const version = APP_VERSION
  const notes = yield getReleaseNotes()
  const isPremium = yield select(getPremium)

  const passed = {
    version,
    notes,
    isPremium: getBool(isPremium)
  }

  if (notes) {
    yield put({
      type: MODAL_LAUNCH,
      payload: { modalType: MODAL_TYPES.WHATS_NEW_MODAL, passed }
    })
  }
}
