import * as Sentry from '@sentry/browser'
import { call, put, race, delay } from 'redux-saga/effects'
import { Object } from 'es6-shim'
import { getItems, getArticleText } from '../../../Common/Api'

/* ITEM :: CONSTANTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { UPDATE_ITEM } from '../../../actions'
import { ITEM_UNAVAILABLE } from '../../../actions'
import { ITEM_CONTENT_FAIL } from '../../../actions'

/* SAGAS :: WORKERS/SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// const getItem = (state, item_id) => state.items[item_id]

/* SAGAS :: RESPONDERS
––––––––––––––––––––––––––––––––––––––––––––––––––------- */
function* itemGet(item_id) {
  const options = {
    state: 'all',
    annotations: 1,
    authors: 1,
    meta: 1,
    positions: 1,
    images: 1,
    videos: 1,
    tags: 1,
    item: item_id
  }

  try {
    return yield call(getItems, options)
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

export function* itemConfirm(action) {
  const { item_id } = action.payload

  // This misses the call from the server that has the scroll position
  // We will request from the server every time they read until we
  // implement a better offline mode.

  // Is the item in state already?
  // const itemFromState = yield select(getItem, item_id)
  // if (itemFromState) yield call(itemContentGet, itemFromState)

  // Is the item in the DB

  // Is the item even in the users list (on server)
  const itemsFromServer = yield call(itemGet, item_id)

  if (itemsFromServer.status === 1) {
    const itemFromServerObject = itemsFromServer.list[item_id]
    yield put({
      type: UPDATE_ITEM,
      payload: { [item_id]: itemFromServerObject }
    })
    return yield call(itemContentGet, itemFromServerObject)
  }

  yield put({ type: ITEM_UNAVAILABLE })
}

function* itemContentGet(item) {
  try {
    const { resolved_url, item_id } = item

    // Is the content in state already?
    if (item.item_content) return

    // Is the content in the DB

    // Let's get the content from the server
    const { serverContent, canceled } = yield race({
      serverContent: call(getArticleText, resolved_url),
      canceled: delay(15000)
    })

    // Handle timeout
    if (canceled) {
      //TODO: add toast on errors
      return yield put({
        type: ITEM_CONTENT_FAIL,
        message: 'Sources Timed Out'
      })
    }

    if (serverContent) {
      const item_content = _formatArticle(serverContent.article)
      const item_update = Object.assign({}, item, { item_content })

      yield put({
        type: UPDATE_ITEM,
        payload: { [item_id]: item_update }
      })
    }
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)

    yield put({ type: ITEM_CONTENT_FAIL, message: error })
  }
}

function _formatArticle(article) {
  if (typeof article === 'string' || article instanceof String) {
    return article
      .replace(
        /<!--VIDEO_(\d{1,3})-->/g,
        (m, part) => `<div id="RIL_VIDEO_${part}" class="RIL_VIDEO"></div>`
      )
      .replace(
        /<!--IMG_(\d{1,3})-->/g,
        (m, part) => `<div id="RIL_IMG_${part}" class="RIL_IMG"></div>`
      )
  }

  return '' // Returns empty string if article doesn't exist
}
