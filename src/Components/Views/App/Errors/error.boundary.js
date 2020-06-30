import * as Sentry from '@sentry/browser'
import React, { Component } from 'react'
import { ErrorWrapper, ErrorBlock, ErrorBranding } from './error.elements'
import { ErrorHeader, ErrorContent, CTAButton } from './error.elements'

import { Translate, withLocalize } from 'react-localize-redux'

export class SentryBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.configureScope(scope => {
      scope.setExtras(errorInfo)
    })
    process.env.NODE_ENV !== 'production'
      ? console.log(error)
      : Sentry.captureException(error)
  }

  render() {
    return this.state.error ? <ErrorComponent /> : this.props.children
  }
}

/** Error Fallback
 --------------------------------------------------------------- */

class ErrorComponentClass extends Component {
  render() {
    return (
      <ErrorWrapper>
        <ErrorBlock>
          <ErrorBranding />
          <ErrorHeader>
            <Translate id="appError.header">
              Oops! Somethings gone awry...
            </Translate>
          </ErrorHeader>
          <ErrorContent>
            <Translate id="appError.copy">
              Try refreshing your page and see if that fixes things. If you’re
              still seeing the issue, please contact our Support Team.
            </Translate>
          </ErrorContent>
          <CTAButton
            type="cta"
            target="_blank"
            href="https://getpocket.com/contact_support?subject=Pocket%20for%20Web%20Encountered%20an%20Error">
            <Translate id="appError.cta">Contact Support</Translate>
          </CTAButton>
        </ErrorBlock>
      </ErrorWrapper>
    )
  }
}

export const ErrorComponent = withLocalize(ErrorComponentClass)
