import * as Sentry from '@sentry/browser'

import { put, call, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { getUser, sendAnalytics, initialize, authError } from '../../Common/Api'

/* ACTIONS: CONSTANTS
--------------------------------------------------------------- */
import { APP_INITIALIZED } from '../../actions'
import { APP_AUTHORIZED } from '../../actions'
import { APP_UNAUTHORIZED } from '../../actions'
import { APP_VALIDATE_USER } from '../../actions'
import { APP_SET_STORAGE } from '../../actions'
import { APP_TOGGLE_PREMIUM } from '../../actions'
import { RESET_ACTIVE_HIGHLIGHTS } from '../../actions'
import { RESET_APP_VERSION } from '../../actions'
import { APP_SET_PREMIUM } from '../../actions'
import { APP_SET_SECTION } from '../../actions'
import { APP_VALIDATE_PREMIUM } from '../../actions'
import { READER_VIEW_FOCUSED } from '../../actions'
import { ITEMS_FETCHED } from '../../actions'
import { EXTERNAL_LINK } from '../../actions'

import { RECENT_SEARCH_SUCCESS } from '../../actions'

import { Object } from 'es6-shim'
import { getBool } from '../../Common/helpers'

/** ACTIONS
 --------------------------------------------------------------- */
export const appActions = {
  appInitialized: payload => ({ type: APP_INITIALIZED, payload }),
  externalLink: payload => ({ type: EXTERNAL_LINK, payload }),
  togglePremium: () => ({ type: APP_TOGGLE_PREMIUM }),
  resetActiveHighlights: () => ({ type: RESET_ACTIVE_HIGHLIGHTS }),
  resetAppVersion: () => ({ type: RESET_APP_VERSION })
}

/* REDUCERS :: STATE SHAPE
--------------------------------------------------------------- */
export const appReducers = (
  state = {
    authorized: false,
    unauthorized: false,
    sectionPayload: {
      subset: 'unread'
    }
  },
  action
) => {
  switch (action.type) {
    case APP_AUTHORIZED: {
      return Object.assign({}, state, {
        authorized: true,
        isPremium: action.payload
      })
    }

    case APP_UNAUTHORIZED: {
      return Object.assign({}, state, {
        authorized: false,
        unauthorized: true
      })
    }

    case APP_SET_STORAGE: {
      return Object.assign({}, state, {
        storeData: action.payload
      })
    }

    case ITEMS_FETCHED: {
      return Object.assign(state, action.payload)
    }

    case APP_SET_PREMIUM: {
      const { isPremium } = action.payload
      return Object.assign({}, state, { isPremium })
    }

    case APP_SET_SECTION: {
      const { payload } = action
      return Object.assign({}, state, { sectionPayload: payload })
    }

    case RECENT_SEARCH_SUCCESS: {
      const { recent_searches } = action.data
      if (recent_searches) {
        return Object.assign({}, state, { recentSearches: recent_searches })
      }
      return state
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */
const getPremium = state => state.app.isPremium

/* SAGAS :: WATCHERS
--------------------------------------------------------------- */
export const appSagas = [
  takeLatest(APP_INITIALIZED, initializeApp),
  takeLatest(APP_VALIDATE_USER, validateUser),
  takeEvery(APP_TOGGLE_PREMIUM, togglePremium),
  takeEvery(EXTERNAL_LINK, externalLink),
  takeLatest(READER_VIEW_FOCUSED, fetchPremiumStatus),
  takeLatest(APP_VALIDATE_PREMIUM, validatePremiumStatus)
]

/* SAGAS :: RESPONDERS
--------------------------------------------------------------- */
function* initializeApp() {
  // This makes a consolidated call for:
  // - User Data
  // - Recent Searches (premium)

  try {
    const data = yield call(initialize)

    // If no data is returned we are being denied access to the server (most likely)
    // because of third-party cookie blocking
    if (!data) {
      yield call(authError)
      return yield put({ type: APP_UNAUTHORIZED })
    }

    const { account, recent_searches } = data

    // User
    if (account) {
      yield call(validateUser, account)
    }

    // Recent Searches
    if (recent_searches) {
      yield put({ type: RECENT_SEARCH_SUCCESS, data })
    }
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* togglePremium() {
  const isPremium = yield select(getPremium)
  yield put({ type: APP_SET_PREMIUM, payload: { isPremium: !isPremium } })
}

function* fetchUserDetails() {
  try {
    const { user } = yield getUser()
    if (user) yield call(validateUser, user)
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* validateUser(data) {
  if (data.auth_unavailable) return yield put({ type: APP_UNAUTHORIZED })

  const {
    user_id,
    premium_status,
    profile: { uid }
  } = data

  const stored_user_id = localStorage.getItem('user_id')

  if (stored_user_id === user_id) {
    yield call(storeUserData, data)

    // Set Sentry scope for the session
    Sentry.configureScope(scope => {
      scope.setUser({ id: uid })
    })

    return yield put({ type: APP_AUTHORIZED, payload: premium_status })
  }

  // Store user data and login
  yield call(storeUserData, data)
  yield sendToLogin()
}

function* sendToLogin() {
  const loginAttempts = localStorage.getItem('login_attempts')
  if (getBool(loginAttempts)) return yield put({ type: APP_UNAUTHORIZED })

  localStorage.setItem('login_attempts', true)
  yield call(fetchUserDetails)
}

function* fetchPremiumStatus() {
  try {
    const data = yield getUser()
    if (data) yield call(validatePremiumStatus, data)
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* validatePremiumStatus(data) {
  if (data.auth_unavailable) return yield put({ type: APP_UNAUTHORIZED })

  const {
    user: { user_id, premium_status },
    user
  } = data

  const stored_user_id = localStorage.getItem('user_id')
  const stored_premium_status = localStorage.getItem('premium_status')

  if (stored_user_id !== user_id) {
    storeUserData(user)
    return yield sendToLogin()
  }

  if (stored_premium_status !== premium_status) {
    return yield put({
      type: APP_SET_PREMIUM,
      payload: { isPremium: premium_status }
    })
  }
}

function storeUserData(data) {
  const {
    user_id,
    username,
    first_name,
    last_name,
    premium_status,
    profile: { avatar_url, uid }
  } = data

  localStorage.setItem('login_attempts', false)
  localStorage.setItem('uid', uid)
  localStorage.setItem('user_id', user_id)
  localStorage.setItem('username', username)
  localStorage.setItem('first_name', first_name)
  localStorage.setItem('last_name', last_name)
  localStorage.setItem('avatar', avatar_url)
  localStorage.setItem('premium_status', premium_status)
}

function* externalLink({ payload }) {
  const { analytics } = payload
  yield sendAnalytics([{ action: 'opened_web', ...analytics }])
}
