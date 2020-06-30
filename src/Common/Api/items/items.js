import { request } from '../_request/api'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getItems(data) {
  return request({
    path: '/get',
    data: {
      images: 1,
      videos: 1,
      tags: 1,
      rediscovery: 1,
      annotations: 1,
      authors: 1,
      itemTopics: 1,
      meta: 1,
      posts: 1,
      total: 1,
      state: 'all',
      ...data
    }
  })
}

export function fetchItems(data) {
  return request({
    path: '/fetch',
    data
  })
}
