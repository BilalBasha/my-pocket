import { request } from '../_request/api'

export function saveRecentSearch(search) {
  const data = {
    actions: [{ action: 'recent_search', search }]
  }

  return request({
    path: '/send',
    data
  }).then(response => response)
}
