import React from 'react'
import styled from '@emotion/styled'
import { getImageCacheUrl } from '../../../Common/helpers'
import { Icon } from '../../Elements/Icons/icon'

const Row = styled('div')`
  padding: 0 1em;
  display: grid;
  grid-template-columns: 24px auto;
  grid-column-gap: 15px;
  cursor: pointer;
  background-color: ${props => props.theme.menu.background};
  color: ${props => props.theme.menu.color};
  &:hover {
    background-color: ${props => props.theme.menu.hover.background};
    color: ${props => props.theme.menu.hover.color};
  }
`

const FriendThumbnail = styled('div')`
  margin-top: 15px;
  background-size: cover;
  background-image: url('${props => props.image}');
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
const FriendName = styled('div')`
  border-bottom: 1px solid ${props => props.theme.sharesheet.comment.border};
  display: grid;
  grid-template-columns: auto 24px;
`
const Name = styled('p')``

const IconWrapper = styled('div')`
  margin-top: 14px;
`

class FriendItem extends React.Component {
  onFriendClick = () => {
    this.props.onToggle(this.props.friend.email)
  }

  render() {
    const { friend, selectedFriends } = this.props

    const checkbox =
      selectedFriends.indexOf(friend.email) > -1 ? (
        <Icon name="CheckFilled" type="solid" size="24px" />
      ) : (
        <Icon name="CheckOpen" type="line" size="24px" />
      )

    return (
      <Row onClick={this.onFriendClick}>
        <FriendThumbnail image={getImageCacheUrl(friend.avatar_url)} />
        <FriendName>
          <Name>{friend.name}</Name>
          <IconWrapper>{checkbox}</IconWrapper>
        </FriendName>
      </Row>
    )
  }
}

export const FriendList = ({ friends, onToggle, selectedFriends }) => {
  return friends.map((friend, index) => {
    return (
      <FriendItem
        key={index}
        friend={friend}
        onToggle={onToggle}
        selectedFriends={selectedFriends}
      />
    )
  })
}
