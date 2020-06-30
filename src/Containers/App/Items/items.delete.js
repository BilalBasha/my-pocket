import * as Sentry from '@sentry/browser'
import { call, put, select, take, race } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { Object } from 'es6-shim'
import { sendItemActions } from '../../../Containers/App/Items/item.utilities.js'
import { addIndexToAnalytics } from '../../../Containers/App/Analytics/analytics.state'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { ITEMS_DELETE } from '../../../actions'
import { ITEMS_DELETED } from '../../../actions'
import { ITEMS_UPDATE_FAIL } from '../../../actions'
import { API_ACTION_DELETE } from '../../../actions'
import { TOAST_ADD } from '../../../actions'

import { MODAL_LAUNCH } from '../../../actions'
import { MODAL_CONFIRM } from '../../../actions'
import { MODAL_CANCEL } from '../../../actions'
import { MODAL_TYPES } from '../../../Containers/App/Modal/modal.state'

export const itemDeleteActions = {
  itemsDelete: payload => ({ type: ITEMS_DELETE, payload })
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemDeleteSagas = [takeEvery(ITEMS_DELETE, itemsDelete)]

/* SAGAS :: SELECTORS/UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getStateItems = state => state.items

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export function* itemsDelete(action) {
  try {
    const { items, analytics, confirmAction } = action.payload
    const itemIds = Object.keys(items)
    const stateItems = yield select(getStateItems)
    const plural = itemIds.length > 1

    // Show the modal for tagging
    yield put({
      type: MODAL_LAUNCH,
      payload: {
        modalType: MODAL_TYPES.CONFIRM_DELETE_ITEM,
        passed: { plural }
      }
    })

    // Wait for the user to confirm or cancel
    const { confirm } = yield race({
      confirm: take(MODAL_CONFIRM),
      cancel: take(MODAL_CANCEL)
    })

    if (confirm) {
      if (confirmAction) confirmAction()

      yield put({ type: ITEMS_DELETED, payload: { itemIds } })

      // Update the server
      const actions = itemIds.map(item_id => {
        const itemAnalytics = addIndexToAnalytics(
          items[item_id].itemIndex,
          analytics
        )
        return {
          action: API_ACTION_DELETE,
          item_id: item_id,
          ...itemAnalytics
        }
      })

      yield put({
        type: TOAST_ADD,
        payload: { type: 'success', apiAction: API_ACTION_DELETE }
      })

      const success = yield call(sendItemActions, actions)

      if (success) return
    }
    // Failure to sync with server, fix state
    yield put({ type: ITEMS_UPDATE_FAIL, stateItems })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}
