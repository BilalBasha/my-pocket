import * as Sentry from '@sentry/browser'
import { call, put, select } from 'redux-saga/effects'
import { sendAnalytics } from '../../../Common/Api'
import { addIndexToAnalytics } from '../../../Containers/App/Analytics/analytics.state'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { ITEM_ACTION_FAILED } from '../../../actions'
import { ITEMS_UPDATE_SUCCESS } from '../../../actions'
import { ITEMS_UPDATE_FAIL } from '../../../actions'
import { TOAST_ADD } from '../../../actions'
import { COLLECTION_RECONCILE } from '../../../actions'
import { COLLECTION_FOCUS } from '../../../actions'

/* SAGAS :: SELECTORS/UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getStateItems = state => state.items
const getSort = state => state.options.sort
const getFocusPayload = state => state.app.sectionPayload

/* SAGAS :: UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* sendItemActions(actions) {
  try {
    yield call(sendAnalytics, [...actions])
    return true
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
    yield put({ type: ITEM_ACTION_FAILED, data: error })
  }
}

export function modifyItems(itemIds, state, field, value) {
  const item_changes = itemIds.reduce((accumulator, currentId) => {
    return Object.assign({}, accumulator, {
      [currentId]: { ...state[currentId], [field]: value }
    })
  }, {})

  return Object.assign({}, state, item_changes)
}

export function* processItems(payload) {
  try {
    const { items, analytics, apiAction, field, value, reconcile } = payload
    const itemIds = Object.keys(items)
    const stateItems = yield select(getStateItems)
    const itemsDraft = modifyItems(itemIds, stateItems, field, value)
    yield put({ type: ITEMS_UPDATE_SUCCESS, payload: { items: itemsDraft } })

    const sort = yield select(getSort)

    if (reconcile) {
      yield put({ type: COLLECTION_RECONCILE, payload: { ...payload, sort } })
    }

    // Update the server
    const actions = itemIds.map(item_id => {
      const itemAnalytics = addIndexToAnalytics(
        items[item_id].itemIndex,
        analytics
      )
      return { action: apiAction, item_id: item_id, ...itemAnalytics }
    })

    const success = yield call(sendItemActions, actions)
    if (success) {
      yield put({
        type: TOAST_ADD,
        payload: {
          type: 'success',
          apiAction,
          length: itemIds.length
        }
      })
      const focusObject = yield select(getFocusPayload)
      yield put({ type: COLLECTION_FOCUS, payload: focusObject })

      return
    }

    // Failure to sync with server, fix state
    yield put({ type: ITEMS_UPDATE_FAIL, itemIds })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}
