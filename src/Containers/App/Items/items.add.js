import * as Sentry from '@sentry/browser'
import { put, call, takeEvery } from 'redux-saga/effects'
import { sendItemActions } from '../../../Containers/App/Items/item.utilities.js'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { ITEM_ADD } from '../../../actions'
import { API_ACTION_ADD } from '../../../actions'
import { API_ACTION_ADD_FAIL } from '../../../actions'
import { COLLECTION_REFRESH } from '../../../actions'
import { TOAST_ADD } from '../../../actions'

export const itemAddActions = {
  itemAdd: payload => ({ type: ITEM_ADD, payload })
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemAddSagas = [takeEvery(ITEM_ADD, itemAdd)]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemAdd(action) {
  try {
    const { url, analytics, subset, offset, since, sort } = action.payload

    // The URL did not validate.  Let's put up a warning toast and exit
    if (!url) {
      return yield put({
        type: TOAST_ADD,
        payload: { type: 'warn', apiAction: API_ACTION_ADD_FAIL }
      })
    }

    const actions = [{ action: API_ACTION_ADD, url, ...analytics }]
    const data = yield call(sendItemActions, actions)

    yield put({
      type: TOAST_ADD,
      payload: { type: 'success', apiAction: API_ACTION_ADD }
    })

    if (data && offset && since && subset)
      yield put({
        type: COLLECTION_REFRESH,
        payload: {
          subset,
          offset,
          since,
          sort
        }
      })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}
