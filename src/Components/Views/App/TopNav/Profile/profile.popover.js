import React from 'react'
import styled from '@emotion/styled'
import ThemeSelector from '../../../../Modules/ThemeSelector/themeSelector'
import { ActionIcon } from '../../../../Elements/NavBar/navBar'
import { Translate, withLocalize } from 'react-localize-redux'
import { DivideVertical } from '../../../../Elements/Divider/divider'
import { PREMIUM_URL, PREMIUM_SETTINGS_URL, PREMIUM_ENTRY_POINTS } from '../../../../../Common/constants'

export const UserAvatar = styled('div')`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 18px;
  height: 24px;
  overflow: hidden;
  width: 24px;
  display: inline-block;
  margin-left: 0.5em;
  filter: brightness(94%) saturate(108%);
`

const ProfileWrapper = styled('div')`
  text-align: left;
  min-width: 190px;
  padding: 20px 20px 10px;
  a {
    display: inline-flex;
    align-content: center;
    align-items: center;
    text-decoration: none;
    color: ${props => props.theme.navBar.action.color};
    &:hover {
      ${props => props.theme.navBar.action.hover};
    }
  }
`

const ProfileAvatar = styled(UserAvatar)`
  border-radius: 60%;
  width: 40px;
  height: 40px;
  margin-right: 8;
`

const ProfileHeader = styled('div')`
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid ${props => props.theme.profile.popover.divider};
  padding-bottom: 17px;
`

const ProfileContentBlock = styled('div')`
  padding-left: 8px;
  a {
    font-size: 12px;
    color: ${props => props.theme.profile.popover.viewprofile.color};
    &:hover {
      color: ${props => props.theme.profile.popover.viewprofile.hover};
    }
  }
`

const ProfileName = styled('div')`
  margin: 3px 0;
  font-size: 15px;
  line-height: 18px;
  font-weight: 600;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.theme.profile.popover.name.color};
`

const ProfileLinks = styled('div')`
  font-size: 14px;
  padding: 10px 0;
  a,
  span {
    padding: 8px;
    text-align: left;
    display: block;
    cursor: pointer;
    color: ${props => props.theme.profile.popover.link.color};
    &:hover {
      color: ${props => props.theme.profile.popover.link.hover};
    }
  }
`

const ProfileOptions = styled('div')`
  font-size: 14px;
  border-top: 1px solid ${props => props.theme.profile.popover.divider};
`

const OptionWrapper = styled('div')`
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
`

class ProfileContentClass extends React.Component {
  render() {
    const {
      isPremium,
      avatarURL,
      fullName,
      uid,
      themeChange,
      activeTheme,
      enterListMode,
      enterGridMode,
      setSortByOldest,
      setSortByNewest,
      openWhatsNew,
      sort,
      listMode,
      translate,
      narrow
    } = this.props

    const premUrl = (isPremium)
      ? PREMIUM_SETTINGS_URL
      : `${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.PROFILE}`

    return (
      <ProfileWrapper>
        <ProfileHeader>
          <ProfileAvatar style={{ backgroundImage: `url('${avatarURL}')` }} />

          <ProfileContentBlock>
            <ProfileName>{fullName}</ProfileName>

            <a href={`https://getpocket.com/@${uid}`}>
              <Translate id="profileMenu.viewprofile">View Profile</Translate>
            </a>
          </ProfileContentBlock>
        </ProfileHeader>

        <ProfileLinks>
          <a href={premUrl}>
            <Translate id="profileMenu.premium">Premium</Translate>
          </a>
          <a href="https://help.getpocket.com/category/847-category">
            <Translate id="profileMenu.help">Help</Translate>
          </a>
          {narrow ? null : (
            <span onClick={openWhatsNew}>
              <Translate id="profileMenu.whatsnew">What’s New</Translate>
            </span>
          )}
          <a href="https://getpocket.com/options">
            <Translate id="profileMenu.options">Options</Translate>
          </a>
          <a href="https://getpocket.com/lo">
            <Translate id="profileMenu.logout">Logout</Translate>
          </a>
        </ProfileLinks>

        <ProfileOptions>
          <OptionWrapper>
            <ThemeSelector
              selectSize={44}
              buttonSize={32}
              clickAction={themeChange}
              activeTheme={activeTheme}
            />
          </OptionWrapper>
        </ProfileOptions>
        <ProfileOptions>
          <OptionWrapper>
            {sort === 'oldest' ? (
              <ActionIcon
                tooltip={translate('reader.displaySettings.sortNewest')}
                icon="SortOldest"
                action={setSortByNewest}
                type="line"
                size="24px"
              />
            ) : (
              <ActionIcon
                tooltip={translate('reader.displaySettings.sortOldest')}
                icon="SortNewest"
                action={setSortByOldest}
                type="line"
                size="24px"
              />
            )}
            <DivideVertical />
            {this.props.noMode ? null : listMode === 'list' ? (
              <ActionIcon
                tooltip={translate('reader.displaySettings.tileMode')}
                icon="Grid"
                action={enterGridMode}
                type="solid"
                size="24px"
              />
            ) : (
              <ActionIcon
                tooltip={translate('reader.displaySettings.listMode')}
                icon="List"
                action={enterListMode}
                type="line"
                size="24px"
              />
            )}
          </OptionWrapper>
        </ProfileOptions>
      </ProfileWrapper>
    )
  }
}
export const ProfileContent = withLocalize(ProfileContentClass)
