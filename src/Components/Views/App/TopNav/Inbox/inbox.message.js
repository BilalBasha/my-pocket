import React, { Component } from 'react'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { UserAvatar } from '../../../../Elements/Avatar/avatar'
import { domainForUrl } from '../../../../../Common/helpers'
import { ItemSave } from '../../../../Modules/Items/Common/Save/item.save'
import { buttonReset } from '../../../../Elements/Buttons/button'
import { withLocalize, Translate } from 'react-localize-redux'

const MessageWrapper = styled('div')`
  display: grid;
  grid-template-columns: 44px auto;
  padding: 24px 10px 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.inbox.border};
  &:last-child {
    border-bottom: none;
    padding-bottom: 26px;
  }
`

const UserMessage = styled('div')`
  line-height: 1.35;
  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.inbox.strong};
  }
  cite {
    padding: 5px 0;
    display: block;
  }
`

const MessageItem = styled('div')`
  grid-column: 2/-1;
  header {
    padding: 15px 0 5px;
  }
  footer {
    padding: 16px 0 10px;
    display: flex;
    justify-content: space-between;
  }
  button {
    ${buttonReset};
    cursor: pointer;
    color: ${({ theme }) => theme.inbox.link.color};
  }
`

class InboxMessageClass extends Component {
  sharedAdd = () => {
    const { share_id, item_id, item } = this.props
    this.props.sharedAdd({ share_id, item_id, item })
  }

  sharedIgnore = () => {
    const { share_id, item_id, item } = this.props
    this.props.sharedIgnore({ share_id, item_id, item })
  }

  render() {
    const {
      comment,
      time_shared,
      from_friend: { avatar_url, name },
      item: { resolved_title, resolved_url }
    } = this.props

    const time = dayjs.unix(time_shared).format('MMMM DD, YYYY h:mm a')
    const domain = domainForUrl(resolved_url)

    return (
      <MessageWrapper>
        <UserAvatar avatar={avatar_url} size="34" />
        <UserMessage>
          <strong>{name}</strong>{' '}
          <Translate id="inbox.sentBy">sent you a message</Translate>
          {comment ? `: ${comment}` : null}
          <cite>{time}</cite>
        </UserMessage>
        <MessageItem>
          <header>{resolved_title}</header>
          <cite>{domain}</cite>
          <footer>
            <ItemSave onSaveClick={this.sharedAdd} />
            <button onClick={this.sharedIgnore}>
              <Translate id="inbox.ignore">sent you a message</Translate>
            </button>
          </footer>
        </MessageItem>
      </MessageWrapper>
    )
  }
}
export const InboxMessage = withLocalize(InboxMessageClass)
