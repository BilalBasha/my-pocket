import React, { Component } from 'react'
import { Popover, Trigger, Content } from '../../../../Modules/Popover/popover'
import styled from '@emotion/styled'
import { ActionIcon } from '../../../../Elements/NavBar/navBar'
import { withLocalize } from 'react-localize-redux'
import { InboxList } from './inbox.list'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { inboxActions } from '../../../../../Containers/App/Inbox/inbox.state'

const InboxNavBlock = styled('div')`
  display: flex;
  align-items: center;
  align-content: center;
  cursor: pointer;
`

class InboxClass extends Component {
  render() {
    const {
      translate,
      notifications,
      email,
      sharedAdd,
      sharedIgnore,
      unconfirmed_shares,
      resendConfirmation
    } = this.props
    return (
      <React.Fragment>
        <Popover activateOnClick persist>
          <Trigger>
            <InboxNavBlock>
              <ActionIcon
                icon="SharedToMe"
                action={() => {}}
                tooltip={translate('topNav.tooltips.notifications')}
                type="line"
                size="24px"
              />
            </InboxNavBlock>
          </Trigger>
          <Content>
            <InboxList
              email={email}
              resendConfirmation={resendConfirmation}
              unconfirmed_shares={unconfirmed_shares}
              notifications={notifications}
              sharedAdd={sharedAdd}
              sharedIgnore={sharedIgnore}
            />
          </Content>
        </Popover>
      </React.Fragment>
    )
  }
}

const InboxLocalized = withLocalize(InboxClass)

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...inboxActions }, dispatch)
}

function mapStateToProps(state) {
  const { notifications, unconfirmed_shares } = state.inbox
  return { notifications, unconfirmed_shares }
}

export const Inbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxLocalized)
