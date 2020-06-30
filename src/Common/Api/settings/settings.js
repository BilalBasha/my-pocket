import { request } from '../_request/api'

export function getSettings() {
  const data = {}
  return request({
    path: '/getWebAppSettings',
    data
  }).then(response => response)
}

export function setReleaseVersion(value) {
  return request({
    path: '/setWebAppSettings',
    data: {
      property: 98,
      value
    }
  })
}
