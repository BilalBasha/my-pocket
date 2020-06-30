import { request } from '../_request/api'

export function initialize() {
  const since = Date.now()
  const data = {
    account: 1,
    forceaccount: 1,
    premium: 1,
    forcepremium: 1,
    notificationstatus: 1,
    since
  }

  return request({
    path: '/get',
    data
  }).then(response => response)
}

export function authError() {
  return request({
    path: '/send',
    data: {
      actions: [
        {
          action: 'pv_wt',
          view: 'web',
          section: 'core',
          page: '/login',
          identifier: '3rd_party_cookie_error'
        }
      ]
    }
  })
}
