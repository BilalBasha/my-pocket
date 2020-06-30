import React, { Component } from 'react'
import styled from '@emotion/styled'
import { InboxMessage } from './inbox.message'
import { InboxEmpty } from './inbox.empty'
import { InboxUnconfirmed } from './inbox.unconfirmed'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { withLocalize } from 'react-localize-redux'

const simpleBarStyle = {
  minHeight: '150px',
  maxHeight: 'calc(100vh - 175px)',
  width: '375px',
  padding: '20px 25px 20px 15px',
  boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
  overflowX: 'hidden',
  border: '4px'
}

const InboxWrapper = styled('div')`
  .simplebar-content {
    background: ${({ theme }) => theme.inbox.background};
    color: ${({ theme }) => theme.inbox.color};
  }
  .simplebar-scrollbar:before {
    background: ${({ theme }) => theme.sidebar.scrollbar};
  }
  text-align: left;
  header {
    color: ${({ theme }) => theme.inbox.strong};
    font-weight: 500;
    line-height: 22px;
    font-size: 16px;
  }
  p {
    padding-top: 10px;
    color: ${({ theme }) => theme.inbox.color};
  }
`

class InboxListClass extends Component {
  render() {
    const {
      notifications,
      sharedAdd,
      sharedIgnore,
      resendConfirmation,
      unconfirmed_shares,
      email
    } = this.props

    const unconfirmedArray = unconfirmed_shares
      ? Object.keys(unconfirmed_shares)
      : []

    return (
      <React.Fragment>
        {notifications.length || unconfirmedArray.length ? (
          <InboxWrapper>
            <SimpleBar style={simpleBarStyle}>
              <header>Activity</header>
              {notifications.map(notification => (
                <InboxMessage
                  key={notification.share_id}
                  {...notification}
                  sharedAdd={sharedAdd}
                  sharedIgnore={sharedIgnore}
                />
              ))}
              {unconfirmedArray.map(unconfirmed => (
                <InboxUnconfirmed
                  key={unconfirmed_shares[unconfirmed].email}
                  email={unconfirmed_shares[unconfirmed].email}
                  resendConfirmation={resendConfirmation}
                />
              ))}
            </SimpleBar>
          </InboxWrapper>
        ) : (
          <InboxEmpty email={email} />
        )}
      </React.Fragment>
    )
  }
}

export const InboxList = withLocalize(InboxListClass)
