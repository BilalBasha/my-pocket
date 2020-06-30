import 'react-app-polyfill/ie11'
import 'intersection-observer'
import { init } from '@sentry/browser'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './Containers/App/app.container'
// import { unregister } from 'Common/serviceWorker'
import { LocalizeProvider } from 'react-localize-redux'

if (process.env.NODE_ENV !== 'production' && process.env.AXE === 'true') {
  var axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

// init({
//   dsn: 'https://274e7daf4aa0430399aa3a16aa5dbd78@sentry.io/1302782',
//   maxBreadcrumbs: 20,
//   release: process.env.REACT_APP_VERSION,
//   sampleRate: 0.8,
//   environment: process.env.NODE_ENV,
//   whitelistUrls: ['app.getpocket.com/static/js'],
//   beforeBreadcrumb(breadcrumb) {
//     if (breadcrumb.category === 'ui.click') return null
//     return breadcrumb
//   }
// })

ReactDOM.render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <App />
    </LocalizeProvider>
  </Provider>,
  document.getElementById('root')
)

// unregister()
