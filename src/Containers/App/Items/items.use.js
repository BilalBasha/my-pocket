import * as Sentry from '@sentry/browser'
import { call, takeLatest, delay } from 'redux-saga/effects'
import { sendItemActions } from '../../../Containers/App/Items/item.utilities'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { SAVE_ITEM_POSITION } from '../../../actions'
import { API_ACTION_SCROLLED } from '../../../actions'

export const itemUseActions = {
  saveItemPosition: payload => ({ type: SAVE_ITEM_POSITION, payload })
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemUseSagas = [takeLatest(SAVE_ITEM_POSITION, saveItemPosition)]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* saveItemPosition(action) {
  try {
    const actions = [{ action: API_ACTION_SCROLLED, ...action.payload }]

    yield delay(500)
    yield call(sendItemActions, actions)
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}
