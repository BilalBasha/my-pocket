import { request } from '../_request/api'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getSuggestedTags(item_id) {
  return request({
    path: '/getSuggestedTags',
    data: {
      version: 2,
      item_id
    }
  })
}
