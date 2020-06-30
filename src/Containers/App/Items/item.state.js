import * as Sentry from '@sentry/browser'
import { Object } from 'es6-shim'
import { put, takeLatest, takeEvery } from 'redux-saga/effects'

import { itemConfirm } from '../../../Containers/App/Items/items.read'

/* CONSOLIDATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { itemTagActions } from '../../../Containers/App/Items/items.tag'
import { itemTagSagas } from '../../../Containers/App/Items/items.tag'

import { itemAddActions } from '../../../Containers/App/Items/items.add'
import { itemAddSagas } from '../../../Containers/App/Items/items.add'

import { itemDeleteActions } from '../../../Containers/App/Items/items.delete'
import { itemDeleteSagas } from '../../../Containers/App/Items/items.delete'

import { itemFavoriteActions } from '../../../Containers/App/Items/items.favorite'
import { itemFavoriteSagas } from '../../../Containers/App/Items/items.favorite'

import { itemArchiveActions } from '../../../Containers/App/Items/items.archive'
import { itemArchiveSagas } from '../../../Containers/App/Items/items.archive'

import { itemShareActions } from '../../../Containers/App/Items/items.share'
import { itemShareSagas } from '../../../Containers/App/Items/items.share'

import { itemUseActions } from '../../../Containers/App/Items/items.use'
import { itemUseSagas } from '../../../Containers/App/Items/items.use'

import { itemRetrieveSagas } from '../../../Containers/App/Items/items.retrieve'

import { itemAnnotateActions } from '../../../Containers/App/Items/items.annotate'
import { itemAnnotateSagas } from '../../../Containers/App/Items/items.annotate'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { CONFIRM_ITEM } from '../../../actions'

import { UPDATE_ITEM } from '../../../actions'
import { UPDATE_ITEM_SUCCESS } from '../../../actions'
import { UPDATE_ITEM_FAIL } from '../../../actions'

import { ITEMS_DELETED } from '../../../actions'
import { ITEMS_RESTORE } from '../../../actions'
import { ITEMS_UPDATED } from '../../../actions'
import { ITEMS_UPDATE_FAIL } from '../../../actions'
import { ITEMS_UPDATE_SUCCESS } from '../../../actions'

import { ITEMS_PURGE } from '../../../actions'
import { ITEMS_REFRESH } from '../../../actions'

export const itemActions = {
  ...itemTagActions,
  ...itemAddActions,
  ...itemDeleteActions,
  ...itemFavoriteActions,
  ...itemArchiveActions,
  ...itemShareActions,
  ...itemUseActions,
  ...itemAnnotateActions,
  itemsPurge: payload => ({ type: ITEMS_PURGE, payload }),
  itemsRefresh: payload => ({ type: ITEMS_REFRESH, payload }),
  itemsRestoreFromDB: payload => ({ type: ITEMS_RESTORE, payload })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemReducers = (state = {}, action) => {
  switch (action.type) {
    case ITEMS_UPDATE_SUCCESS: {
      return Object.assign({}, state, action.payload.items)
    }

    case ITEMS_DELETED: {
      const { itemIds } = action.payload
      const newState = Object.keys(state).reduce((accumulator, currentId) => {
        if (itemIds.includes(currentId)) return accumulator
        return Object.assign({}, accumulator, { [currentId]: state[currentId] })
      }, {})
      return newState
    }

    case ITEMS_UPDATE_FAIL: {
      return state
    }

    case UPDATE_ITEM_SUCCESS: {
      return Object.assign({}, state, action.payload)
    }

    default: {
      return state
    }
  }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemSagas = [
  ...itemTagSagas,
  ...itemAddSagas,
  ...itemDeleteSagas,
  ...itemFavoriteSagas,
  ...itemArchiveSagas,
  ...itemShareSagas,
  ...itemUseSagas,
  ...itemRetrieveSagas,
  ...itemAnnotateSagas,
  takeEvery(UPDATE_ITEM, updateItem),
  takeEvery(ITEMS_UPDATED, itemsUpdated),
  takeLatest(CONFIRM_ITEM, itemConfirm)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* updateItem(action) {
  try {
    yield put({ type: UPDATE_ITEM_SUCCESS, payload: action.payload })
  } catch (error) {
    const item = action.payload
    yield put({ type: UPDATE_ITEM_FAIL, payload: item })

    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}

function* itemsUpdated(action) {
  try {
    yield put({ type: ITEMS_UPDATE_SUCCESS, payload: action.payload })
  } catch (error) {
    const { items = {} } = action.payload
    yield put({ type: ITEMS_UPDATE_FAIL, payload: { items } })

    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }
}
