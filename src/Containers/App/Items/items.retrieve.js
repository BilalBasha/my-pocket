import * as Sentry from '@sentry/browser'
import { push } from 'connected-react-router'
import { call, put, takeLatest, race, delay, select } from 'redux-saga/effects'
import { Object } from 'es6-shim'
import { getItems } from '../../../Common/Api'
import { normalizeTag } from '../../../Common/helpers'
import { encodeListFilterForURL } from '../../../Common/helpers'
import { FIRST_LOAD_COUNT, LOAD_COUNT } from '../../../Common/constants'

/* ITEM :: CONSTANTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { APP_VALIDATE_PREMIUM } from '../../../actions'

import { ITEMS_GET_FAILED } from '../../../actions'
import { ITEMS_UPDATE_SUCCESS } from '../../../actions'

import { COLLECTION_REFRESH } from '../../../actions'
import { COLLECTION_REFRESHED } from '../../../actions'

import { GATHER_LIST_ITEMS } from '../../../actions'
import { GATHER_TAGGED_ITEMS } from '../../../actions'
import { GATHER_FILTER_ITEMS } from '../../../actions'
import { GATHER_SEARCH_ITEMS } from '../../../actions'

import { COLLECTION_LIST_UPDATE } from '../../../actions'
import { COLLECTION_LIST_NO_UPDATE } from '../../../actions'
import { COLLECTION_TAGGED_UPDATE } from '../../../actions'
import { COLLECTION_TAGGED_NO_UPDATE } from '../../../actions'
import { COLLECTION_FILTER_UPDATE } from '../../../actions'
import { COLLECTION_FILTER_NO_UPDATE } from '../../../actions'
import { COLLECTION_SEARCH_UPDATE } from '../../../actions'
import { COLLECTION_SEARCH_FAILED } from '../../../actions'

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemRetrieveSagas = [
  takeLatest(COLLECTION_REFRESH, refreshItems),
  takeLatest(GATHER_LIST_ITEMS, gatherListItems),
  takeLatest(GATHER_TAGGED_ITEMS, gatherTaggedItems),
  takeLatest(GATHER_FILTER_ITEMS, gatherFilterItems),
  takeLatest(GATHER_SEARCH_ITEMS, gatherSearchItems)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getPremium = state => state.app.isPremium

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const subsets = {
  unread: { state: 'unread' },
  archive: { state: 'read' },
  favorites: { state: 'all', favorite: 1 },
  articles: { state: 'all', contentType: 'article' },
  videos: { state: 'all', contentType: 'video' },
  highlights: { state: 'all', hasAnnotations: 1 }
}

const includes = {
  all: { state: 'all' },
  unread: { state: 'unread' },
  read: { state: 'read' },
  favorite: { state: 'all', favorite: 1 }
}

function* gatherListItems({ payload }) {
  const { subset, offset = 0, sort } = payload
  const options = { offset, sort, ...subsets[subset] }
  const update = yield call(getCollectionItems, options)
  if (update) {
    return yield put({ type: COLLECTION_LIST_UPDATE, update, payload })
  }
  yield put({ type: COLLECTION_LIST_NO_UPDATE, payload })
}

function* gatherTaggedItems({ payload }) {
  const { subset, offset, include, sort } = payload
  const tag = payload.tag === 'untagged items' ? '_untagged_' : payload.tag
  const options = { offset, sort, tag, ...subsets[subset], ...subsets[include] }
  const listFilter = encodeListFilterForURL(include)
  yield put(push(`/tags/${normalizeTag(tag)}/${listFilter}`))

  const update = yield call(getCollectionItems, options)
  if (update) {
    return yield put({ type: COLLECTION_TAGGED_UPDATE, update, payload })
  }

  yield put({ type: COLLECTION_TAGGED_NO_UPDATE, payload })
}

function* gatherFilterItems({ payload }) {
  const { subset, offset, include, sort } = payload
  const options = { offset, sort, ...subsets[subset], ...includes[include] }
  const listFilter = encodeListFilterForURL(include)
  yield put(push(`/${subset}/${listFilter}`))

  const update = yield call(getCollectionItems, options)
  if (update) {
    return yield put({ type: COLLECTION_FILTER_UPDATE, update, payload })
  }

  yield put({ type: COLLECTION_FILTER_NO_UPDATE, payload })
}

function* gatherSearchItems({ payload }) {
  try {
    const { subset, offset, search, include, sort = 'unread' } = payload
    const options = {
      offset,
      search,
      sort,
      ...subsets[subset],
      ...includes[include]
    }

    // eslint-disable-next-line
    const { update, canceled } = yield race({
      update: call(getCollectionItems, options),
      canceled: delay(15000)
    })

    if (update) {
      return yield put({ type: COLLECTION_SEARCH_UPDATE, update, payload })
    }

    return yield put({ type: COLLECTION_SEARCH_FAILED })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
    yield put({ type: ITEMS_GET_FAILED, message: error })
  }
}

function* getCollectionItems(options) {
  try {
    const { offset } = options
    const count = offset ? LOAD_COUNT : FIRST_LOAD_COUNT
    const forceaccount = 1
    const data = yield call(getItems, {
      ...options,
      offset,
      count,
      forceaccount
    })

    if (data) {
      // Process the response
      const { list, since, total, search_meta, account } = data // placements
      const listKeys = Object.keys(list)
      const listHasUpdates = listKeys.length

      // Adding check against premium here to avoid state action
      yield checkPremium(account)

      // Integrate any changes that have come from the server
      if (listHasUpdates) {
        // Update our item store
        yield put({ type: ITEMS_UPDATE_SUCCESS, payload: { items: list } })

        // Return data to be processed in collections
        return { list, since, count, total, search_meta }
      }

      // No changes
      return false
    }
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
    yield put({ type: ITEMS_GET_FAILED, message: error })
  }
}

function* refreshItems({ payload }) {
  try {
    const { since, include } = payload
    const forceaccount = 1
    const data = yield call(getItems, { since, forceaccount })

    if (data) {
      // Process the response
      const { list, since, total, search_meta, account } = data // placements
      const listKeys = Object.keys(list)
      const listHasUpdates = listKeys.length

      // Adding check against premium here to avoid state action
      yield checkPremium(account)

      // Integrate any changes that have come from the server
      if (listHasUpdates) {
        // Update our item store
        yield put({ type: ITEMS_UPDATE_SUCCESS, payload: { items: list } })
        // Return data to be processed in collections
        const update = { list, since, total, search_meta, include }
        return yield put({ type: COLLECTION_REFRESHED, update, payload })
      }
    }
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
    yield put({ type: ITEMS_GET_FAILED, message: error })
  }
}

function* checkPremium(account) {
  // Adding check against premium here to avoid state action
  const premium = yield select(getPremium)
  if (premium !== account.premium_status) {
    yield put({ type: APP_VALIDATE_PREMIUM, user: account })
  }
}
