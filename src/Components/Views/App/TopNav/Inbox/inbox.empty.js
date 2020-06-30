import React, { Component } from 'react'
import styled from '@emotion/styled'
import 'simplebar/dist/simplebar.min.css'
import { withLocalize, Translate } from 'react-localize-redux'

const InboxEmptyWrapper = styled('div')`
  width: 375px;
  padding: 35px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  background: ${({ theme }) => theme.inbox.background};
  color: ${({ theme }) => theme.inbox.color};
  border-radius: 4px;
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
`
class InboxEmptyClass extends Component {
  render() {
    return (
      <InboxEmptyWrapper>
        <header>
          <Translate id="inbox.empty.header">Your Inbox is Empty</Translate>
        </header>
        <p>
          <Translate id="inbox.empty.recieve">
            When someone share items with you using Send to Friend, they will
            appear here.
          </Translate>
        </p>
        <p>
          <Translate id="inbox.empty.send">
            You can also use Send to Friend to share items directly to a
            friend’s Pocket. Look for Send to Friend in the Share menu.
          </Translate>
        </p>
      </InboxEmptyWrapper>
    )
  }
}

export const InboxEmpty = withLocalize(InboxEmptyClass)
