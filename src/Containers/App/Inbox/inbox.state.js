import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { getShares, ignoreShare, addShare } from '../../../Common/Api/'
import { resendConfirmation } from '../../../Common/Api'
import * as Sentry from '@sentry/browser'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { APP_INITIALIZED } from '../../../actions'
import { COLLECTION_FOCUS } from '../../../actions'
import { INBOX_OPENED } from '../../../actions'
import { SHARED_UPDATED } from '../../../actions'
import { SHARED_ADD } from '../../../actions'
import { SHARED_IGNORE } from '../../../actions'
import { SHARED_ACTION_SUCCESS } from '../../../actions'
import { RESEND_CONFIRMATION } from '../../../actions'

export const inboxActions = {
  inboxOpened: payload => ({ type: INBOX_OPENED, payload }),
  sharedAdd: payload => ({ type: SHARED_ADD, payload }),
  sharedIgnore: payload => ({ type: SHARED_IGNORE, payload }),
  resendConfirmation: payload => ({ type: RESEND_CONFIRMATION, payload })
}

const initialState = {
  unconfirmed: true,
  notifications: []
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const inboxReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHARED_UPDATED: {
      const {
        data: { notifications, unconfirmed_shares }
      } = action.payload
      return { ...state, notifications, unconfirmed_shares }
    }

    case SHARED_ACTION_SUCCESS: {
      const { share_id } = action.payload
      const draft = state.notifications.filter(
        item => item.share_id !== share_id
      )
      return { ...state, notifications: draft }
    }
    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getFocusPayload = state => state.app.sectionPayload

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const inboxSagas = [
  takeLatest(INBOX_OPENED, inboxOpened),
  takeLatest(APP_INITIALIZED, inboxOpened),
  takeEvery(SHARED_ADD, sharedAdd),
  takeEvery(SHARED_IGNORE, sharedIgnore),
  takeEvery(RESEND_CONFIRMATION, sendConfirmation)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* inboxOpened() {
  try {
    const data = yield call(getShares)
    if (data && data.status === 1) {
      yield put({ type: SHARED_UPDATED, payload: { data } })
    }
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* sendConfirmation(action) {
  const { email } = action.payload
  yield call(resendConfirmation, email)
}

function* sharedIgnore({ payload }) {
  const response = yield call(ignoreShare, payload)
  if (response && response.status === 1) {
    // Remove from state
    yield put({ type: SHARED_ACTION_SUCCESS, payload })
  }
}

function* sharedAdd({ payload }) {
  const response = yield call(addShare, payload)
  if (response && response.status === 1) {
    // Remove from inbox state
    yield put({ type: SHARED_ACTION_SUCCESS, payload })

    // Construct item update success
    const focusObject = yield select(getFocusPayload)
    yield put({ type: COLLECTION_FOCUS, payload: focusObject })
  }
}
