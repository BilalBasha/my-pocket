import React from 'react'
import { getImageCacheUrl } from '../../../../../Common/helpers'
import { Popover, Trigger, Content } from '../../../../Modules/Popover/popover'
import { ProfileContent, UserAvatar } from './profile.popover'
import { buttonReset } from '../../../../Elements/Buttons/button'
import { Icon } from '../../../../Elements/Icons/icon'
import styled from '@emotion/styled'
import { TooltipBase } from '../../../../Elements/Tooltip/tooltip'

const ProfileNavBlock = styled('button')`
  ${buttonReset};
  display: flex;
  align-items: center;
  align-content: center;
  cursor: pointer;
  ${TooltipBase};
`

export class Profile extends React.Component {
  get avatarURL() {
    return getImageCacheUrl(this.props.profile_avatar, {
      height: 80,
      width: 80
    })
  }

  get name() {
    const { profile_first_name, profile_username } = this.props
    return profile_first_name || profile_username || null
  }

  render() {
    const {
      isPremium,
      enterListMode,
      enterGridMode,
      openWhatsNew,
      sort,
      listMode,
      setSortByOldest,
      setSortByNewest,
      narrow,
      tooltip
    } = this.props

    return (
      <React.Fragment>
        <Popover activateOnClick>
          <Trigger>
            <ProfileNavBlock aria-label={tooltip} data-tooltip={tooltip}>
              <UserAvatar style={{ position: 'absolute' }}>
                <Icon name="Profile" type="line" size="18px" />
              </UserAvatar>
              <UserAvatar
                style={{ backgroundImage: `url('${this.avatarURL}')` }}
              />
            </ProfileNavBlock>
          </Trigger>
          <Content>
            <ProfileContent
              narrow={narrow}
              listMode={listMode}
              noMode={this.props.noMode}
              activeTheme={this.props.activeTheme}
              themeChange={this.props.themeChange}
              uid={this.props.profile_uid}
              avatarURL={this.avatarURL}
              fullName={this.name}
              isPremium={isPremium}
              enterListMode={enterListMode}
              enterGridMode={enterGridMode}
              openWhatsNew={openWhatsNew}
              setSortByOldest={setSortByOldest}
              setSortByNewest={setSortByNewest}
              sort={sort}
            />
          </Content>
        </Popover>
      </React.Fragment>
    )
  }
}
