import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Button } from '../../../../Elements/Buttons/button'
import { withLocalize, Translate } from 'react-localize-redux'

const ResendConfirmation = styled('div')`
  padding: 0 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.inbox.border};
  &:last-child {
    border-bottom: none;
  }
  text-align: center;
  header {
    color: ${({ theme }) => theme.inbox.strong};
    font-weight: 500;
    line-height: 22px;
    font-size: 16px;
  }
  p {
    line-height: 22px;
    font-size: 14px;
    padding-top: 18px;
    margin: 0;
    color: ${({ theme }) => theme.inbox.color};
  }
  footer {
    padding-top: 18px;
  }
`

class InboxUnconfirmedClass extends Component {
  sendConfirmation = () => {
    const { email } = this.props
    this.props.resendConfirmation({ email })
  }

  render() {
    const { email } = this.props

    return (
      <ResendConfirmation>
        <p>
          <Translate id="inbox.unconfirmed.message" data={{ email }}>
            A friend has shared something with you in Pocket. To view it, please
            confirm your email: ${email}
          </Translate>
        </p>
        <footer>
          <Button type="cta" full={true} onClick={this.sendConfirmation}>
            <Translate id="inbox.unconfirmed.resend">
              Resend Confirmation
            </Translate>
          </Button>
        </footer>
      </ResendConfirmation>
    )
  }
}
export const InboxUnconfirmed = withLocalize(InboxUnconfirmedClass)
