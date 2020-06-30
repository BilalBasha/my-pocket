import * as Sentry from '@sentry/browser'

const sentryMiddleware = store => next => action => {
  Sentry.addBreadcrumb({
    category: 'ACTION',
    message: action.type,
    level: 'info'
  })
  next(action)
}

export default sentryMiddleware
