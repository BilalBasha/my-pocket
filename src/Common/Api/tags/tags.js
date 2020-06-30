import { request } from '../_request/api'

export function fetchStoredTags() {
  const since = Date.now()
  const data = {
    taglist: 1,
    forcetaglist: 1,
    since
  }

  return request({
    path: '/get',
    data
  }).then(response => response)
}

export function fetchStoredTagChanges(since) {
  const data = {
    taglist: 1,
    since
  }

  return request({
    path: '/get',
    data
  }).then(response => response)
}

export function renameStoredTag({ new_tag, old_tag }) {
  const data = {
    actions: [{ action: 'tag_rename', new_tag, old_tag }]
  }

  return request({
    path: '/send',
    data
  }).then(response => response)
}

export function deleteStoredTag(tag) {
  const data = {
    actions: [{ action: 'tag_delete', tag }]
  }

  return request({
    path: '/send',
    data
  }).then(response => response)
}
