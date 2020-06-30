/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { MODE_CHANGE } from '../../../actions'
import { SAVE_LIST_SCROLL } from '../../../actions'
import { TOGGLE_SIDE_NAV } from '../../../actions'
import { RESET_SIDE_NAV } from '../../../actions'
import { EXIT_SEARCH_MODE } from '../../../actions'
import { EXIT_BULK_EDIT_MODE } from '../../../actions'
import { SEARCH_UPDATE_RESET } from '../../../actions'
import { STORED_TAGS_UPDATE } from '../../../actions'
import { COLLECTION_VIEW_OPENED } from '../../../actions'
import { COLLECTION_VIEW_ACTIVE } from '../../../actions'
import { COLLECTION_SEARCH } from '../../../actions'
import { COLLECTION_LIST_UPDATE } from '../../../actions'
import { COLLECTION_TAGGED_UPDATE } from '../../../actions'
import { COLLECTION_FILTER_UPDATE } from '../../../actions'
import { COLLECTION_SEARCH_UPDATE } from '../../../actions'
import { COLLECTION_FILTER_OPENED } from '../../../actions'
import { COLLECTION_LIST_OPENED } from '../../../actions'
import { COLLECTION_TAGGED_OPENED } from '../../../actions'
import { COLLECTION_TAGGED_UPDATED } from '../../../actions'

export const collectionOptionsActions = {
  enterAddUrlMode: () => ({ type: MODE_CHANGE, payload: 'addUrl' }),
  exitAddUrlMode: () => ({ type: MODE_CHANGE, payload: 'standard' }),
  saveListScroll: payload => ({ type: SAVE_LIST_SCROLL, payload }),
  toggleSideNav: () => ({ type: TOGGLE_SIDE_NAV, payload: {} })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const defaultState = {
  mode: 'standard',
  subset: 'unread',
  tag: '',
  scrollTop: 0,
  sideNavActive: false
}

export const collectionOptionsReducers = (state = defaultState, action) => {
  switch (action.type) {
    case COLLECTION_VIEW_OPENED:
    case COLLECTION_FILTER_OPENED:
    case COLLECTION_LIST_OPENED:
    case COLLECTION_TAGGED_OPENED:
    case COLLECTION_VIEW_ACTIVE: {
      const { subset, tag = '' } = action.payload
      return { ...state, subset, tag }
    }

    case COLLECTION_LIST_UPDATE:
    case COLLECTION_TAGGED_UPDATE:
    case COLLECTION_FILTER_UPDATE:
    case COLLECTION_SEARCH_UPDATE: {
      const { since } = action.update
      return { ...state, since }
    }

    case STORED_TAGS_UPDATE: {
      const { since } = action.payload
      return { ...state, since }
    }

    case COLLECTION_TAGGED_UPDATED: {
      const { tag } = action.payload
      return { ...state, tag }
    }

    case COLLECTION_SEARCH: {
      return { ...state, subset: 'search', mode: 'search' }
    }
    case SAVE_LIST_SCROLL: {
      return { ...state, scrollTop: action.payload }
    }

    case MODE_CHANGE: {
      return { ...state, mode: action.payload }
    }

    case EXIT_SEARCH_MODE:
    case EXIT_BULK_EDIT_MODE:
    case SEARCH_UPDATE_RESET: {
      return { ...state, mode: 'standard' }
    }

    case TOGGLE_SIDE_NAV: {
      const sideNavState = state.sideNavActive
      return { ...state, sideNavActive: !sideNavState }
    }

    case RESET_SIDE_NAV: {
      return { ...state, sideNavActive: false }
    }

    default: {
      return state
    }
  }
}
