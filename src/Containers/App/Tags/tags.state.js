import { call, put, take, takeLatest, race, select } from 'redux-saga/effects'
import { fetchStoredTags, fetchStoredTagChanges } from '../../../Common/Api/'
import { renameStoredTag, deleteStoredTag } from '../../../Common/Api/'
import * as Sentry from '@sentry/browser'
import { normalizeTag } from '../../../Common/helpers'
import { push } from 'connected-react-router'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { MODAL_TYPES } from '../../../Containers/App/Modal/modal.state'
import { MODAL_LAUNCH, MODAL_CONFIRM, MODAL_CANCEL } from '../../../actions'

import { STORED_TAGS_SUCCESS } from '../../../actions'
import { APP_AUTHORIZED } from '../../../actions'
import { UPDATE_STORED_TAGS } from '../../../actions'
import { STORED_TAGS_UPDATE } from '../../../actions'
import { EDIT_STORED_TAG } from '../../../actions'
import { DELETE_STORED_TAG } from '../../../actions'
import { UPDATE_STORED_TAG } from '../../../actions'
import { EDIT_STORED_TAG_SUCCESS } from '../../../actions'
import { CANCEL_STORED_TAG_EDIT } from '../../../actions'

import { DELETE_STORED_TAG_SUCCESS } from '../../../actions'
import { DELETE_STORED_TAG_FAILURE } from '../../../actions'

export const tagsActions = {
  editTag: payload => ({ type: EDIT_STORED_TAG, payload }),
  updateTag: payload => ({ type: UPDATE_STORED_TAG, payload }),
  cancelTagEdit: payload => ({ type: CANCEL_STORED_TAG_EDIT, payload }),
  deleteTag: payload => ({ type: DELETE_STORED_TAG, payload })
}

const defaultState = {
  'untagged-items': { fixed: true, name: 'untagged items' }
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const tagsReducers = (state = defaultState, action) => {
  switch (action.type) {
    case STORED_TAGS_SUCCESS:
    case STORED_TAGS_UPDATE: {
      const { storedTags } = action.payload
      return storedTags
    }

    case EDIT_STORED_TAG: {
      const { tagKey } = action.payload
      const tagState = state[tagKey]
      return { ...state, [tagKey]: { ...tagState, editable: true } }
    }

    case CANCEL_STORED_TAG_EDIT: {
      const { tagKey } = action.payload
      const tagState = state[tagKey]
      if (!tagState) return state
      return { ...state, [tagKey]: { ...tagState, editable: false } }
    }

    case EDIT_STORED_TAG_SUCCESS: {
      const { new_tag, old_tag } = action.payload
      const newSlug = normalizeTag(new_tag)
      const oldSlug = normalizeTag(old_tag)
      const { [oldSlug]: deletedValue, ...tags } = state // eslint-disable-line no-unused-vars
      return { ...tags, [newSlug]: { name: new_tag } }
    }

    case DELETE_STORED_TAG_SUCCESS: {
      const { tagKey } = action.payload
      const { [tagKey]: deletedValue, ...tags } = state // eslint-disable-line no-unused-vars
      return tags
    }

    default: {
      return state
    }
  }
}

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getStateTags = state => state.tags

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const tagsSagas = [
  takeLatest(APP_AUTHORIZED, requestTags),
  takeLatest(UPDATE_STORED_TAGS, updateStoredTags),
  takeLatest(UPDATE_STORED_TAG, renameStoredTagCall),
  takeLatest(DELETE_STORED_TAG, deleteStoredTagCall)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* requestTags() {
  try {
    const data = yield call(fetchStoredTags)
    const { tags = [] } = data || {}
    const storedTags = {}
    const tagsCollection = {}
    const offset = 0
    const list = []
    const loading = false
    const ready = false

    if (tags) {
      // Process tags
      for (let index = 0; index < tags.length; index++) {
        storedTags[normalizeTag(tags[index])] = {
          clean: true,
          name: tags[index]
        }

        tagsCollection[normalizeTag(tags[index])] = {
          include: 'all',
          all: { offset, list, loading, ready },
          read: { offset, list, loading, ready },
          unread: { offset, list, loading, ready },
          favorite: { offset, list, loading, ready }
        }
      }
      storedTags['untagged-items'] = {
        fixed: true,
        name: 'untagged items'
      }

      yield put({
        type: STORED_TAGS_SUCCESS,
        payload: { storedTags, tagsCollection }
      })
    }
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* updateStoredTags(action) {
  const { since } = action.payload
  const data = yield call(fetchStoredTagChanges, since)
  const { tags = [] } = data || {}
  const stateTags = yield select(getStateTags)
  const tagsCollection = {}
  const offset = 0
  const list = []
  const loading = false
  const ready = false

  if (tags) {
    const storedTags = Object.keys(stateTags).map(tag => stateTags[tag].name)
    const newTags = tags.filter(tag => storedTags.indexOf(tag) === -1)
    const removedTags = storedTags.filter(
      tag => tags.indexOf(tag) === -1 && tag !== 'untagged items'
    )

    for (let removedTag in removedTags) {
      delete stateTags[normalizeTag(removedTags[removedTag])]
    }

    for (let newTag in newTags) {
      stateTags[normalizeTag(newTags[newTag])] = {
        clean: true,
        name: newTags[newTag]
      }

      tagsCollection[normalizeTag(newTags[newTag])] = {
        include: 'all',
        all: { offset, list, loading, ready },
        read: { offset, list, loading, ready },
        unread: { offset, list, loading, ready },
        favorite: { offset, list, loading, ready }
      }
    }

    yield put({
      type: STORED_TAGS_UPDATE,
      payload: { storedTags: stateTags, tagsCollection, since: data.since }
    })
  }
}

function* renameStoredTagCall(action) {
  try {
    const { payload } = action
    const { new_tag, old_tag } = payload
    const data = yield call(renameStoredTag, { new_tag, old_tag })
    if (data.status === 1) yield put({ type: EDIT_STORED_TAG_SUCCESS, payload })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* deleteStoredTagCall(action) {
  const { tagKey, name } = action.payload
  const tags = yield select(getStateTags)

  yield put({
    type: MODAL_LAUNCH,
    payload: { modalType: MODAL_TYPES.CONFIRM_DELETE_TAG }
  })

  const { confirm } = yield race({
    confirm: take(MODAL_CONFIRM),
    cancel: take(MODAL_CANCEL)
  })

  if (confirm) {
    const tagArray = yield Object.keys(tags).sort((a, b) =>
      a.toUpperCase() > b.toUpperCase() ? 1 : -1
    )

    const nextTag = yield tagArray[tagArray.indexOf(tagKey) + 1]

    yield put({ type: DELETE_STORED_TAG_SUCCESS, payload: { tagKey } })
    yield put(push(`/tags/${nextTag}`))
    yield call(deleteFromServer, name)
  }
}

function* deleteFromServer(tag) {
  try {
    const data = yield call(deleteStoredTag, tag) //tag

    if (data.status === 1) return

    yield put({ type: DELETE_STORED_TAG_FAILURE, payload: { tag } })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}
