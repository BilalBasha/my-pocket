import { call, takeEvery } from 'redux-saga/effects'
import { processItems } from '../../../Containers/App/Items/item.utilities.js'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { ITEMS_ARCHIVE } from '../../../actions'
import { ITEMS_READD } from '../../../actions'
import { API_ACTION_READD } from '../../../actions'
import { API_ACTION_ARCHIVE } from '../../../actions'

export const itemArchiveActions = {
  itemsArchive: payload => ({ type: ITEMS_ARCHIVE, payload }),
  itemsReAdd: payload => ({ type: ITEMS_READD, payload })
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const itemArchiveSagas = [
  takeEvery(ITEMS_ARCHIVE, itemsArchive),
  takeEvery(ITEMS_READD, itemsReAdd)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* itemsReAdd({ payload }) {
  yield call(processItems, {
    apiAction: API_ACTION_READD,
    reconcile: true,
    field: 'status',
    value: '0',
    ...payload
  })
}

export function* itemsArchive({ payload }) {
  yield call(processItems, {
    apiAction: API_ACTION_ARCHIVE,
    reconcile: true,
    field: 'status',
    value: '1',
    ...payload
  })
}
