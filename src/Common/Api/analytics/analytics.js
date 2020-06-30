import { request } from '../_request/api'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function sendAnalytics(actions) {
  if (process.env.REACT_APP_QA === 'available') {
    actions.forEach(batch => console.log(batch.action, batch))
  }

  return request({
    path: '/send',
    data: {
      actions
    }
  })
}
