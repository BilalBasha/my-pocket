import * as Sentry from '@sentry/browser'
import { call, put, race, fork } from 'redux-saga/effects'
import { take, takeLatest, select } from 'redux-saga/effects'
import { getItems } from '../../../Common/Api/'
import { sendItemActions } from '../../../Containers/App/Items/item.utilities'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { API_ACTION_SHARE } from '../../../actions'
import { API_ACTION_SHARE_TO } from '../../../actions'
import { API_ACTION_RECOMMEND } from '../../../actions'
import { SHARE_ITEM } from '../../../actions'
import { SHARE_SOCIAL } from '../../../actions'
import { MODAL_LAUNCH } from '../../../actions'
import { MODAL_CONFIRM } from '../../../actions'
import { MODAL_CANCEL } from '../../../actions'
import { MODAL_UPDATE } from '../../../actions'
import { MODAL_TYPES } from '../../../Containers/App/Modal/modal.state'
import { TOAST_ADD } from '../../../actions'

export const itemShareActions = {
  shareItem: payload => ({ type: SHARE_ITEM, payload }),
  socialShare: payload => ({ type: SHARE_SOCIAL, payload })
}

/* SAGAS :: WORKERS/SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getItem = (state, item_id) => state.items[item_id]

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemShareSagas = [
  takeLatest(SHARE_ITEM, shareItem),
  takeLatest(SHARE_SOCIAL, shareItemToSocial)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* fetchRecentFriends({ item_id, ...rest }) {
  try {
    // TODO make this a separate API call with limited scope
    const friends = yield call(getItems, { shares: 'recent_friends', count: 1 })
    yield put({
      type: MODAL_UPDATE,
      payload: {
        passed: {
          item_id,
          ...rest,
          recent_friends: friends.recent_friends,
          auto_complete_emails: friends.auto_complete_emails.map(
            item => item.email
          )
        }
      }
    })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

export function* shareItem(action) {
  const { item_id, recommend } = action.payload
  const apiAction = recommend ? API_ACTION_RECOMMEND : API_ACTION_SHARE
  const itemDetails = yield select(getItem, item_id)
  const passed = {
    ...action.payload,
    ...itemDetails,
    item_id
  }

  if (!recommend) yield fork(fetchRecentFriends, passed)

  yield put({
    type: MODAL_LAUNCH,
    payload: { modalType: MODAL_TYPES.SHARE_MODAL, passed }
  })

  const { confirm } = yield race({
    confirm: take(MODAL_CONFIRM),
    cancel: take(MODAL_CANCEL)
  })

  if (confirm) {
    try {
      const actions = [{ action: apiAction, ...confirm.payload }]
      const sent = yield call(sendItemActions, actions)
      if (sent) {
        yield put({
          type: TOAST_ADD,
          payload: { type: 'success', apiAction }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

function* shareItemToSocial(action) {
  const { item_id, service, analytics } = action.payload

  const actions = [{
    action: `${API_ACTION_SHARE_TO}${service}`,
    item_id,
    ...analytics
  }]

  yield call(sendItemActions, actions)
}
