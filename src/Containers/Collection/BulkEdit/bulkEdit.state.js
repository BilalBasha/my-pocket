import * as Sentry from '@sentry/browser'
import { put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { EXIT_BULK_EDIT_MODE } from '../../../actions'
import { ADD_TO_BULK_EDIT } from '../../../actions'
import { BULK_EDIT_UPDATED } from '../../../actions'
import { REMOVE_FROM_BULK_EDIT } from '../../../actions'
import { CLEAR_BULK_EDIT } from '../../../actions'
import { MODE_CHANGE } from '../../../actions'
import { BULK_EDIT_UPDATE } from '../../../actions'

export const collectionBulkEditActions = {
  enterBulkEditMode: () => ({ type: MODE_CHANGE, payload: 'bulkEdit' }),
  exitBulkEditMode: () => ({ type: EXIT_BULK_EDIT_MODE, payload: {} }),
  addToBulkEdit: payload => ({ type: ADD_TO_BULK_EDIT, payload }),
  updateBulkEdit: payload => ({ type: BULK_EDIT_UPDATE, payload }),
  removeFromBulkEdit: payload => ({ type: REMOVE_FROM_BULK_EDIT, payload }),
  clearBulkEdit: () => ({ type: CLEAR_BULK_EDIT })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const defaultState = {}

export const collectionBulkEditReducers = (state = defaultState, action) => {
  switch (action.type) {
    case EXIT_BULK_EDIT_MODE:
    case CLEAR_BULK_EDIT: {
      return defaultState
    }

    case ADD_TO_BULK_EDIT: {
      const { item_id, itemIndex, favorite, archive } = action.payload
      const itemObject = {
        [item_id]: {
          itemIndex,
          favorite,
          archive
        }
      }
      return Object.assign({}, itemObject, state)
    }

    case BULK_EDIT_UPDATED: {
      const { bulkEdit } = action.payload
      return { ...state, ...bulkEdit }
    }

    case REMOVE_FROM_BULK_EDIT: {
      const { item_id } = action.payload
      const { [item_id]: deletedItem, ...draftBulkEdit } = state // eslint-disable-line no-unused-vars
      return draftBulkEdit
    }

    default: {
      return state
    }
  }
}

/** SAGAS :: SELECTORS
 --------------------------------------------------- */

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const collectionBulkEditSagas = [
  takeEvery(BULK_EDIT_UPDATE, bulkEditUpdate)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function* bulkEditUpdate(action) {
  try {
    const { items, type } = action.payload
    const bulkEdit = Object.keys(items).reduce((accumulator, current) => {
      return Object.assign({}, accumulator, {
        [current]: {
          ...items[current],
          favorite: type === 'favorite' ? '1' : '0'
        }
      })
    }, {})

    yield put({ type: BULK_EDIT_UPDATED, payload: { bulkEdit } })
  } catch (error) {
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}
