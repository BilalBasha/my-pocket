// import { call, put, takeLatest } from 'redux-saga/effects'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { MODAL_LAUNCH } from '../../../actions'
import { MODAL_CANCEL } from '../../../actions'
import { MODAL_CONFIRM } from '../../../actions'
import { MODAL_UPDATE } from '../../../actions'

// TODO: Confirm we need to pass these as opposed to calling them direct
export const MODAL_TYPES = {
  TAG_MODAL: 'tagModal',
  SHARE_MODAL: 'shareSheetModal',
  CONFIRM_DELETE_TAG: 'confirmDeleteTag',
  CONFIRM_DELETE_ITEM: 'confirmDeleteItem',
  CONFIRM_REMOVE_FEED_ITEM: 'CONFIRM_REMOVE_FEED_ITEM',
  WHATS_NEW_MODAL: 'WHATS_NEW_MODAL'
}

export const modalActions = {
  launchModal: payload => ({ type: MODAL_LAUNCH, payload }),
  cancelModal: payload => ({ type: MODAL_CANCEL, payload }),
  confirmModal: payload => ({ type: MODAL_CONFIRM, payload })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const modalReducers = (
  state = { modalActive: false, modalType: false },
  action
) => {
  switch (action.type) {
    case MODAL_LAUNCH: {
      return { modalActive: true, ...action.payload }
    }

    case MODAL_UPDATE: {
      const { payload } = action
      return {
        ...state,
        ...payload,
        passed: { ...state.passed, ...payload.passed }
      }
    }

    case MODAL_CANCEL:
    case MODAL_CONFIRM: {
      return { modalActive: false, modalType: false }
    }

    default: {
      return state
    }
  }
}
