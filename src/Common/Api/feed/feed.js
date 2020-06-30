import { request } from '../_request/api'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getFeed(data) {
  return request({
    path: '/feed',
    data
  })
}

export function reportItem(payload) {
  const { item_id, feed_item_id, reason } = payload
  return request({
    path: '/send',
    data: {
      actions: [
        {
          action: 'report_feed_item',
          item_id,
          feed_item_id,
          reason,
          cxt_impression_id: feed_item_id
        }
      ]
    }
  })
}
