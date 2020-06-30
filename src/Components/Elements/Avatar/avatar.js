import React, { Component } from 'react'
import styled from '@emotion/styled'
import { getImageCacheUrl } from '../../../Common/helpers'

const UserAvatarWrapper = styled('div')`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow: hidden;
  display: inline-block;
  filter: brightness(94%) saturate(108%);
`

export class UserAvatar extends Component {
  get avatarURL() {
    const { size = 24 } = this.props
    return getImageCacheUrl(this.props.avatar, { height: size, width: size })
  }

  render() {
    const { size = 24, margin = 0 } = this.props
    const radius = Math.floor(size / 2)
    return (
      <UserAvatarWrapper
        style={{
          backgroundImage: `url('${this.avatarURL}')`,
          height: `${size}px`,
          width: `${size}px`,
          borderRadius: `${radius}px`,
          margin
        }}
      />
    )
  }
}
