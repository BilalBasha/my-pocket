import React from 'react'
import styled from '@emotion/styled'
import { FriendList } from './shareSheet.friendlist'
import Tagging from '../../Modules/Tagging/tagging'

const Panel = styled('div')`
  margin-bottom: 1em;
  padding: 1em 0;
  border-top: 4px solid ${props => props.theme.sharesheet.comment.border};
  border-bottom: 1px solid ${props => props.theme.sharesheet.comment.border};
  h4 {
    margin: 0 0 10px;
    font-size: 12px;
    font-weight: 400;
  }
`
const InputWrapper = styled('div')`
  padding: 0 1em 0.25em;
`
const ClampHeight = styled('div')`
  max-height: 200px;
  overflow-y: scroll;
`

export class SendToFriend extends React.Component {
  render() {
    return (
      <Panel>
        <InputWrapper>
          <h4>SEND TO</h4>
          <Tagging
            value={this.props.value}
            setValue={this.props.setValue}
            addTag={this.props.addEmail}
            removeTag={this.props.removeEmail}
            setTags={this.props.setEmails}
            tags={this.props.emails}
            typeahead={this.props.auto_complete_emails}
            email
          />
        </InputWrapper>
        <ClampHeight>
          {this.props.recent_friends ? (
            <FriendList
              friends={this.props.recent_friends}
              onToggle={this.props.onFriendUpdate}
              selectedFriends={this.props.selectedFriends}
            />
          ) : null}
        </ClampHeight>
      </Panel>
    )
  }
}
