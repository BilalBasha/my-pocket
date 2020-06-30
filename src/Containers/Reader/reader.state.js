import { put, takeLatest, takeLeading, select } from 'redux-saga/effects'
import { push, goBack } from 'connected-react-router'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { READER_VIEW_OPENED } from '../../actions'
import { READER_VIEW_CLOSED } from '../../actions'
import { READER_EXIT_METHOD } from '../../actions'
import { READER_VIEW_FOCUSED } from '../../actions'
import { ARTICLE_TOPICS_SUCCEEDED } from '../../actions'
import { ARTICLE_UNLOADED } from '../../actions'
import { READER_SET_ITEM } from '../../actions'
import { READER_VIEW_UPDATING } from '../../actions'
import { READER_VIEW_UPDATED } from '../../actions'
import { READER_GO_BACK } from '../../actions'
import { CONFIRM_ITEM } from '../../actions'
import { TOAST_ADD } from '../../actions'
import { TOAST_ITEM_NOT_IN_LIST } from '../../actions'
import { ITEM_UNAVAILABLE } from '../../actions'

export const readerActions = {
  readerViewOpened: payload => ({ type: READER_VIEW_OPENED, payload }),
  readerSetExitMethod: payload => ({ type: READER_EXIT_METHOD, payload }),
  readerViewClosed: payload => ({ type: READER_VIEW_CLOSED, payload }),
  readerViewFocused: payload => ({ type: READER_VIEW_FOCUSED, payload }),
  readerGoBack: () => ({ type: READER_GO_BACK })
}

const initialState = {
  updating: false,
  navChanges: 0,
  relatedTopics: []
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const readerReducers = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_TOPICS_SUCCEEDED: {
      return { ...state, relatedTopics: action.data }
    }
    case ARTICLE_UNLOADED: {
      return { ...initialState, navChanges: state.navChanges }
    }
    case READER_SET_ITEM: {
      const { item_id } = action.payload
      return { ...state, item_id }
    }

    case READER_VIEW_UPDATING: {
      return { ...state, updating: true }
    }
    case READER_VIEW_UPDATED: {
      return { ...state, updating: false }
    }
    case '@@router/LOCATION_CHANGE': {
      return { ...state, navChanges: state.navChanges + 1 }
    }
    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getNavChanges = state => state.reader.navChanges

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const readerSagas = [
  takeLatest(READER_VIEW_OPENED, readerOpened),
  takeLatest(READER_VIEW_CLOSED, sayGoodbye),
  takeLatest(ITEM_UNAVAILABLE, redirectedToList),
  takeLeading(READER_GO_BACK, readerGoBack)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* readerOpened(action) {
  const { item_id } = action.payload
  yield put({ type: READER_SET_ITEM, payload: { item_id } })
  yield put({ type: CONFIRM_ITEM, payload: { item_id } })
}

function* sayGoodbye() {
  yield put({ type: ARTICLE_UNLOADED })
}

function* redirectedToList() {
  yield put(push('/'))
  yield put({
    type: TOAST_ADD,
    payload: { type: 'warn', apiAction: TOAST_ITEM_NOT_IN_LIST }
  })
}

function* readerGoBack() {
  const navChanges = yield select(getNavChanges)
  const hasHistory = navChanges > 1
  return yield hasHistory ? put(goBack()) : put(push('/'))
}
