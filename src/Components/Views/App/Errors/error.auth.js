import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux'
import { ErrorWrapper, ErrorBlock, ErrorBranding } from './error.elements'
import { ErrorHeader, ErrorContent, CTAButton } from './error.elements'

class ErrorAuthClass extends Component {
  contactSupport = () => {}

  render() {
    return (
      <ErrorWrapper>
        <ErrorBlock>
          <ErrorBranding />
          <ErrorHeader>
            <Translate id="auth.error.header">
              Oops! Somethings gone awry...
            </Translate>
          </ErrorHeader>
          <ErrorContent>
            <Translate id="auth.error.copy">
              Try refreshing your page and see if that fixes things. If you’re
              still seeing the issue, please contact our Support Team.
            </Translate>
          </ErrorContent>
          <CTAButton
            type="cta"
            target="_blank"
            rel="noopener"
            href="https://help.getpocket.com/article/1151-adjusting-your-cookie-settings-for-pocket">
            <Translate id="auth.error.cta">Learn More</Translate>
          </CTAButton>
        </ErrorBlock>
      </ErrorWrapper>
    )
  }
}
export const ErrorAuth = withLocalize(ErrorAuthClass)
