import { call, takeEvery } from 'redux-saga/effects'
import { processItems } from '../../../Containers/App/Items/item.utilities.js'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { ITEMS_FAVORITE } from '../../../actions'
import { ITEMS_UNFAVORITE } from '../../../actions'
import { API_ACTION_FAVORITE } from '../../../actions'
import { API_ACTION_UNFAVORITE } from '../../../actions'

export const itemFavoriteActions = {
  itemsFavorite: payload => ({ type: ITEMS_FAVORITE, payload }),
  itemsUnfavorite: payload => ({ type: ITEMS_UNFAVORITE, payload })
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemFavoriteSagas = [
  takeEvery(ITEMS_FAVORITE, itemsFavorite),
  takeEvery(ITEMS_UNFAVORITE, itemsUnfavorite)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemsFavorite({ payload }) {
  yield call(processItems, {
    apiAction: API_ACTION_FAVORITE,
    field: 'favorite',
    value: '1',
    reconcile: true,
    ...payload
  })
}

export function* itemsUnfavorite({ payload }) {
  yield call(processItems, {
    apiAction: API_ACTION_UNFAVORITE,
    field: 'favorite',
    value: '0',
    reconcile: true,
    ...payload
  })
}
