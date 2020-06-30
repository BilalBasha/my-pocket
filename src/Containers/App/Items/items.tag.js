import * as Sentry from '@sentry/browser'
import { call, put, fork, take, select, race } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { sendItemActions } from '../../../Containers/App/Items/item.utilities.js'
import { getSuggestedTags } from '../../../Common/Api'
import { addIndexToAnalytics } from '../../../Containers/App/Analytics/analytics.state'
import { getBool } from '../../../Common/helpers'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { ITEMS_UPDATE_SUCCESS } from '../../../actions'
import { ITEMS_UPDATE_FAIL } from '../../../actions'
import { ITEMS_TAGGING } from '../../../actions'
import { COLLECTION_FOCUS } from '../../../actions'
import { UPDATE_STORED_TAGS } from '../../../actions'
import { API_ACTION_REPLACE_TAGS } from '../../../actions'
import { API_ACTION_ADD_TAGS } from '../../../actions'
import { API_ACTION_TAGS_CLEARED } from '../../../actions'
import { TOAST_ADD } from '../../../actions'
import { MODAL_LAUNCH } from '../../../actions'
import { MODAL_UPDATE } from '../../../actions'
import { MODAL_CONFIRM } from '../../../actions'
import { MODAL_CANCEL } from '../../../actions'
import { MODAL_TYPES } from '../../../Containers/App/Modal/modal.state'
export const itemTagActions = {
  itemsTagging: payload => ({ type: ITEMS_TAGGING, payload })
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemTagSagas = [takeEvery(ITEMS_TAGGING, itemsTagging)]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getStateItems = state => state.items
const getTags = state => state.tags
const getPremiumStatus = state => state.app.isPremium
const getFocusPayload = state => state.app.sectionPayload
const getSince = state => state.collection.options.since
const getLocation = state => state.router.location.pathname

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemsTagging(action) {
  try {
    const { items, analytics } = action.payload
    const itemIds = Object.keys(items)
    const singleItem = itemIds.length === 1 ? itemIds[0] : false

    let currentTags = []
    // Is there only one item?  If so lets get relevant data
    if (singleItem) {
      yield fork(fetchSuggestedTags, singleItem)
      const itemState = yield select(getStateItems)
      currentTags = itemState[singleItem].tags || {}
    }

    const apiAction = singleItem ? API_ACTION_REPLACE_TAGS : API_ACTION_ADD_TAGS
    const storedTags = yield select(getTags)
    const typeahead = Object.keys(storedTags).map(tag => storedTags[tag].name)
    const isPremium = yield select(getPremiumStatus)

    // Show the modal for tagging
    yield put({
      type: MODAL_LAUNCH,
      payload: {
        modalType: MODAL_TYPES.TAG_MODAL,
        passed: {
          currentTags: Object.keys(currentTags),
          isPremium: getBool(isPremium),
          typeahead
        }
      }
    })

    // Wait for the user to confirm or cancel
    const { confirm } = yield race({
      confirm: take(MODAL_CONFIRM),
      cancel: take(MODAL_CANCEL)
    })

    // If the user confirmed lets process the tags
    if (confirm) {
      const { tags } = confirm.payload
      const tagFunction = singleItem ? tagSingleItem : tagMultipleItems
      const tagsObject = tags.reduce((accumulator, current) => {
        return Object.assign({}, accumulator, { [current]: current })
      }, {})

      const stateItems = yield select(getStateItems)
      const updatedItems = yield call(tagFunction, {
        itemIds,
        tagsObject,
        stateItems
      })

      yield put({
        type: ITEMS_UPDATE_SUCCESS,
        payload: { items: updatedItems }
      })

      // Update the server
      const actions = itemIds.map(item_id => {
        const itemAnalytics = addIndexToAnalytics(
          items[item_id].itemIndex,
          analytics
        )
        return {
          action:
            singleItem && tags.length === 0
              ? API_ACTION_TAGS_CLEARED
              : apiAction,
          item_id: item_id,
          tags,
          ...itemAnalytics
        }
      })

      const success = yield call(sendItemActions, actions)

      yield put({
        type: TOAST_ADD,
        payload: { type: 'success', apiAction, length: tags.length }
      })

      // TODO: Need to update stored tags here
      // ? Tags are tricky and a bit circular.  Need to rethink the architecture
      // ? but I want to hold off till we solidify the future of categorization.
      if (success) {
        // Construct item update success
        const since = yield select(getSince)
        yield put({ type: UPDATE_STORED_TAGS, payload: { since } })

        const location = yield select(getLocation)
        const isReader = /^\/read\/?(.+)?/.test(location)
        if (isReader) return
        const focusObject = yield select(getFocusPayload)
        yield put({ type: COLLECTION_FOCUS, payload: focusObject })
      }

      // Failure to sync with server, fix state
      yield put({ type: ITEMS_UPDATE_FAIL, itemIds })
    }
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* fetchSuggestedTags(item_id) {
  try {
    const isPremium = yield select(getPremiumStatus)
    if (!getBool(isPremium)) return

    const data = yield call(getSuggestedTags, item_id)
    const suggestedTags = (data && data.suggested_tags)
      ? data.suggested_tags.map(item => item.tag)
      : []

    yield put({
      type: MODAL_UPDATE,
      payload: {
        passed: {
          suggestedTags
        }
      }
    })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

/* SAGAS :: UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function* tagSingleItem({ itemIds, tagsObject, stateItems }) {
  const item_id = itemIds[0]
  const item = stateItems[item_id]
  const item_changes = Object.assign({}, item, { tags: tagsObject })
  return yield Object.assign({}, stateItems, { [item_id]: { ...item_changes } })
}

function* tagMultipleItems({ itemIds, tagsObject, stateItems }) {
  const item_changes = itemIds.reduce((accumulator, currentId) => {
    const currentItem = stateItems[currentId]
    const currentTags = currentItem.tags || {}
    const tags = Object.assign({}, currentTags, tagsObject)
    const currentChanges = Object.assign({}, currentItem, { tags })
    return Object.assign({}, accumulator, {
      [currentId]: { ...currentChanges }
    })
  }, {})
  return yield Object.assign({}, stateItems, item_changes)
}
