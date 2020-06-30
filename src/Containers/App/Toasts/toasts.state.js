import { takeLatest, put, select } from 'redux-saga/effects'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { TOAST_ADD } from '../../../actions'
import { TOAST_ADDED } from '../../../actions'
import { TOAST_REMOVE } from '../../../actions'
import { TOAST_REMOVED } from '../../../actions'

export const toastActions = {
  removeToast: payload => ({ type: TOAST_REMOVED, payload })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const toastReducers = (state = {}, action) => {
  switch (action.type) {
    case TOAST_ADDED: {
      const { type, apiAction, length } = action.payload
      return {
        ...state,
        [Date.now()]: { type, apiAction, length, remove: false }
      }
    }

    case TOAST_REMOVE: {
      const { key } = action.payload
      const toast = state[key]
      return { ...state, [key]: { ...toast, remove: true } }
    }

    case TOAST_REMOVED: {
      const key = action.payload
      const { [key]: deletedKey, ...toasts } = state // eslint-disable-line no-unused-vars
      return toasts
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getToasts = state => state.toasts

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const toastSagas = [takeLatest(TOAST_ADD, updateToasts)]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* updateToasts(action) {
  const toasts = yield select(getToasts)
  const keys = Object.keys(toasts).sort((a, b) => b - a)
  const total = keys.length - 1

  if (total >= 2) {
    yield put({ type: TOAST_REMOVE, payload: { key: keys[total] } })
  }

  yield put({ type: TOAST_ADDED, payload: action.payload })
}
