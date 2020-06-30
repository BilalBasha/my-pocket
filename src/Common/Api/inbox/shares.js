import { request } from '../_request/api'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getShares() {
  return request({
    path: '/getPendingShares'
  })
}

export function addShare(payload) {
  const { share_id, item_id, item } = payload
  return request({
    path: '/send',
    data: {
      actions: [
        {
          action: 'share_added',
          share_id: parseInt(share_id, 10),
          item_id: item_id,
          item
        }
      ]
    }
  })
}

export function ignoreShare(payload) {
  const { share_id, item_id, item } = payload

  return request({
    path: '/send',
    data: {
      actions: [
        {
          action: 'share_ignored',
          share_id: parseInt(share_id, 10),
          item_id: item_id,
          item
        }
      ]
    }
  })
}

export function resendConfirmation(email) {
  return request({
    path: '/resendEmailConfirmation',
    data: { email }
  })
}
