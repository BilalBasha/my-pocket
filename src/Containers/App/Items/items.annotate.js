import * as Sentry from '@sentry/browser'
import { call, takeEvery, select, put } from 'redux-saga/effects'
import { sendItemActions } from '../../../Containers/App/Items/item.utilities.js'
import uuidv4 from 'uuid/v4'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { ANNOTATE_ADD } from '../../../actions'
import { ANNOTATE_DELETE } from '../../../actions'
import { API_ACTION_ADD_ANNOTATION } from '../../../actions'
import { API_ACTION_DELETE_ANNOTATION } from '../../../actions'
import { ITEMS_UPDATE_SUCCESS } from '../../../actions'
import { ITEMS_UPDATE_FAIL } from '../../../actions'

export const itemAnnotateActions = {
  addAnnotation: payload => ({ type: ANNOTATE_ADD, payload }),
  deleteAnnotation: payload => ({ type: ANNOTATE_DELETE, payload })
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemAnnotateSagas = [
  takeEvery(ANNOTATE_ADD, addAnnotation),
  takeEvery(ANNOTATE_DELETE, deleteAnnotation)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getStateItems = state => state.items

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* addAnnotation(action) {
  try {
    const { item_id, quote, patch, analytics } = action.payload
    const itemState = yield select(getStateItems)
    const item = itemState[item_id]

    const newAnnotation = {
      item_id,
      annotation_id: uuidv4(),
      version: '2',
      quote,
      patch
    }

    const curAnnotations = item.annotations || []
    const annotations = [
      ...curAnnotations,
      newAnnotation
    ]

    const updatedItem = Object.assign({}, item, { annotations })
    const newState = {
      ...itemState,
      [item_id]: updatedItem
    }

    yield put({
      type: ITEMS_UPDATE_SUCCESS,
      payload: { items: newState }
    })

    // Update the server
    const actions = [{
      action: API_ACTION_ADD_ANNOTATION,
      item_id,
      annotation: newAnnotation,
      ...analytics
    }]

    const success = yield call(sendItemActions, actions)
    if (success) return

    // Failure to sync with server, fix state
    yield put({ type: ITEMS_UPDATE_FAIL, itemIds: [item_id] })
  } catch (error) {
    Sentry.captureException(error)
  }
}

export function* deleteAnnotation(action) {
  try {
    const { item_id, annotation_id, analytics } = action.payload
    const itemState = yield select(getStateItems)
    const item = itemState[item_id]
    const { annotations } = item
    const updatedAnnotations = annotations.filter(i => i.annotation_id !== annotation_id)

    const updatedItem = Object.assign({}, item, { annotations: updatedAnnotations })
    const newState = {
      ...itemState,
      [item_id]: updatedItem
    }

    yield put({
      type: ITEMS_UPDATE_SUCCESS,
      payload: { items: newState }
    })

    // Update the server
    const actions = [{
      action: API_ACTION_DELETE_ANNOTATION,
      item_id,
      annotation_id,
      ...analytics
    }]

    const success = yield call(sendItemActions, actions)
    if (success) return

    // Failure to sync with server, fix state
    yield put({ type: ITEMS_UPDATE_FAIL, itemIds: [item_id] })
  } catch (error) {
    Sentry.captureException(error)
  }
}
