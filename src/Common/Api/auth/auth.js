import { request } from '../_request/api'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export function getUser() {
  return request({
    path: '/getuser',
    data: {
      hash: '9dJDjsla49la' // some sort of magic hash for this endpoint
    }
  })
}
