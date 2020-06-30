import { combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { all } from 'redux-saga/effects'
import { createBrowserHistory } from 'history'
// import createHistory from 'history/createBrowserHistory';

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import sentryMiddleware from './Common/Middleware/sentry'
import storageMiddleware from './Common/Middleware/storage'
import { loadState } from './Common/Middleware/storage'
import { localizeReducer } from 'react-localize-redux'

/* IMPORT CONTAINER STATES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { appReducers } from './Containers/App/app.state'
import { appSagas } from './Containers/App/app.state'

import { optionsReducers } from './Containers/App/Options/options.state'
import { optionsSagas } from './Containers/App/Options/options.state'

import { readerReducers } from './Containers/Reader/reader.state'
import { readerSagas } from './Containers/Reader/reader.state'

import { collectionReducers } from './Containers/Collection/collection.state'
import { collectionSagas } from './Containers/Collection/collection.state'

import { discoverReducers } from './Containers/Discover/discover.state'
import { discoverSagas } from './Containers/Discover/discover.state'

import { itemSagas } from './Containers/App/Items/item.state'
import { itemReducers } from './Containers/App/Items/item.state'

import { tagsReducers } from './Containers/App/Tags/tags.state'
import { tagsSagas } from './Containers/App/Tags/tags.state'

import { inboxReducers } from './Containers/App/Inbox/inbox.state'
import { inboxSagas } from './Containers/App/Inbox/inbox.state'

import { modalReducers } from './Containers/App/Modal/modal.state'
import { toastReducers } from './Containers/App/Toasts/toasts.state'
import { toastSagas } from './Containers/App/Toasts/toasts.state'

import { analyticsSagas } from './Containers/App/Analytics/analytics.state'

// import { addKeyboardShortcuts } from './Containers/App/Shortcuts/shortcuts.state'
import { shortcutReducers } from './Containers/App/Shortcuts/shortcuts.state'
import { shortcutSagas } from './Containers/App/Shortcuts/shortcuts.state'

/* HISTORY
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const history = createBrowserHistory()


/* REDUCERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const rootReducer = history =>
  combineReducers({
    localize: localizeReducer,
    router: connectRouter(history),
    app: appReducers,
    items: itemReducers,
    reader: readerReducers,
    discover: discoverReducers,
    collection: collectionReducers,
    options: optionsReducers,
    tags: tagsReducers,
    modal: modalReducers,
    toasts: toastReducers,
    inbox: inboxReducers,
    shortcuts: shortcutReducers
  })

/* SAGAS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const sagaMiddleware = createSagaMiddleware()
function* rootSaga() {
  yield all([
    ...appSagas,
    ...optionsSagas,
    ...readerSagas,
    ...discoverSagas,
    ...collectionSagas,
    ...itemSagas,
    ...tagsSagas,
    ...analyticsSagas,
    ...toastSagas,
    ...inboxSagas,
    ...shortcutSagas
  ])
}

/* STORE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Pocket Draft' })
    : compose

const enhancers = applyMiddleware(
  sentryMiddleware,
  routerMiddleware(history),
  storageMiddleware,
  sagaMiddleware
)

/** PERSISTED STATE
--------------------------------------------------------------- */
const initialState = loadState()

export const store = createStore(
  rootReducer(history),
  initialState,
  composeEnhancers(enhancers)
)

sagaMiddleware.run(rootSaga)

// addKeyboardShortcuts(store)
