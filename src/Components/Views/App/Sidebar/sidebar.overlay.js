/* eslint  react/jsx-no-target-blank: 0*/
import React from 'react'
import styled from '@emotion/styled'
import { buttonReset } from '../../../Elements/Buttons/button'
import { Icon } from '../../../Elements/Icons/icon'
import { NavLink } from 'react-router-dom'
import { SidebarTags } from './Tags/tags.container'
import { ZINDEX, SIDEBAR_OVERLAY_WIDTH } from '../../../../Common/constants'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../../Common/constants'
import { ButtonLink } from '../../../Elements/Buttons/button'
import { Illustration } from '../../../Elements/Illustrations/illustration'
import { Translate, withLocalize } from 'react-localize-redux'
import ScrollLock, { TouchScrollable } from 'react-scrolllock'

const SideBarContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
`

const SideBarWrapper = styled('div')`
  display: block;
  background-color: ${props => props.theme.sidebar.background};
  position: fixed;
  height: 100%;
  z-index: ${ZINDEX.sideBarOverlay};
  width: ${SIDEBAR_OVERLAY_WIDTH}px;
  border-right: 1px solid ${props => props.theme.sidebar.border};
  transition: all 500ms ease-in-out;
  ${props => (props.sideNavActive ? '' : 'transform: translateX(-200%)')};
`

const SideBarContent = styled('div')`
  height: 100%;
  display: block;
  overflow-y: auto;
  padding-bottom: 75px;
`

const SideBarHeader = styled('h4')`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-transform: uppercase;
  padding: 24px 20px 10px;
  margin: 0;
`

const SideBarMenu = styled('div')`
  list-style-type: none;
  margin: 0 20px;
  padding: 0;
  a {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    height: 65px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 500;
    line-height: 14px;
    text-decoration: none;
    border-radius: 4px;
    color: ${props => props.theme.sidebar.menu.button.primary.color};
    &:hover {
      color: ${props => props.theme.sidebar.menu.button.primary.hover};
    }
    &.active {
      color: ${props => props.theme.sidebar.menu.button.primary.hover};
      background-color: ${props =>
        props.theme.sidebar.menu.button.primary.background};
    }
    &:first-of-type {
      margin-top: 20px;
    }
  }
`
const SideBarMenuButton = styled('button')`
  ${buttonReset};
  cursor: pointer;
  height: 65px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  line-height: 14px;
  color: ${props => props.theme.sidebar.menu.button.primary.color};
  &:hover {
    color: ${props => props.theme.sidebar.menu.button.primary.hover};
  }
`

const IconWrapper = styled('span')`
  display: inline-block;
  margin-right: 8px;
`

const SideBarClose = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: ${({ hasButton }) => hasButton ? '13px 20px' : '20px 20px 19px'};
  border-bottom: 1px solid ${props => props.theme.sidebar.border};
  cursor: pointer;
`

const Spacer = styled('div')`
  width: 24px;
  height: 24px;
`

class SideBarOverlayClass extends React.Component {
  state = { tagsOpen: false }

  trackPremiumClick = (e) => {
    e.stopPropagation() // prevents sidebar from closing
    this.props.trackClick({
      view: 'web',
      section: '/premium',
      page: 'list',
      identifier: 'click_upsell_top_nav'
    })
  }

  openTags = () => this.setState({ tagsOpen: true })
  closeTags = () => this.setState({ tagsOpen: false })

  render() {
    const { translate, isPremium } = this.props
    return (
      <SideBarContainer>
        <SideBarWrapper sideNavActive={this.props.sideNavActive}>
          {this.state.tagsOpen ? (
            <React.Fragment>
              <SideBarClose
                onClick={this.closeTags}
                aria-label={translate('sideBar.tags.close')}>
                <Icon type="line" name="BackArrow" size="24px" /> Tags{' '}
                <Spacer />
              </SideBarClose>
              <SideBarContent>
                <SidebarTags isOverlay={true} /> <Spacer />
              </SideBarContent>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SideBarClose
                hasButton={!isPremium}
                onClick={this.props.toggleSideNav}
                aria-label={translate('sideBar.close')}>
                <Icon type="line" name="BackChevron" size="24px" />
                {isPremium ? null : (
                  <ButtonLink
                    href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.SIDE_TOP_NAV}`}
                    target="_blank"
                    onClick={this.trackPremiumClick}
                    type="upgrade">
                    <Illustration name="Diamond" size="20px" margin="0 8px 0 0" />
                    <Translate id="upsell.upgrade">Upgrade</Translate>
                  </ButtonLink>
                )}
              </SideBarClose>
              <ScrollLock isActive={this.props.sideNavActive} />
              <TouchScrollable>
                <SideBarContent>
                  <SideBarMenu>
                    <NavLink exact to="/" onClick={this.props.toggleSideNav}>
                      <IconWrapper>
                        <Icon name="Home" type="mini" size="16px" />
                      </IconWrapper>
                      <Translate id="sideBar.home.copy">My List</Translate>
                    </NavLink>
                    <NavLink to="/archive" onClick={this.props.toggleSideNav}>
                      <IconWrapper>
                        <Icon name="Archive" type="mini" size="16px" />
                      </IconWrapper>
                      <Translate id="sideBar.archive.copy">Archive</Translate>
                    </NavLink>
                  </SideBarMenu>
                  <SideBarHeader>
                    <Translate id="sideBar.filters">Filters</Translate>
                  </SideBarHeader>
                  <SideBarMenu>
                    <NavLink to="/favorites/all" onClick={this.props.toggleSideNav}>
                      <IconWrapper>
                        <Icon name="Favorite" type="mini" size="16px" />
                      </IconWrapper>
                      <Translate id="sideBar.favorites.copy">
                        Favorites
                      </Translate>
                    </NavLink>
                    <NavLink
                      to="/highlights/all"
                      onClick={this.props.toggleSideNav}>
                      <IconWrapper>
                        <Icon name="Highlights" type="mini" size="16px" />
                      </IconWrapper>
                      <Translate id="sideBar.highlights.copy">
                        Highlights
                      </Translate>
                    </NavLink>
                    <SideBarMenuButton
                      onClick={this.openTags}
                      aria-label={translate('sideBar.tags.aria')}>
                      <IconWrapper>
                        <Icon name="Tag" type="mini" size="16px" />
                      </IconWrapper>
                      <Translate id="sideBar.tags.copy">Tags</Translate>
                    </SideBarMenuButton>
                    <NavLink
                      to="/articles/all"
                      onClick={this.props.toggleSideNav}
                      aria-label={translate('sideBar.articles.aria')}>
                      <IconWrapper>
                        <Icon name="Article" type="mini" size="16px" />
                      </IconWrapper>
                      <Translate id="sideBar.articles.copy">Articles</Translate>
                    </NavLink>
                    <NavLink
                      to="/videos/all"
                      onClick={this.props.toggleSideNav}
                      aria-label={translate('sideBar.videos.aria')}>
                      <IconWrapper>
                        <Icon name="Videos" type="mini" size="16px" />
                      </IconWrapper>
                      <Translate id="sideBar.videos.copy">Videos</Translate>
                    </NavLink>
                  </SideBarMenu>
                  <SideBarHeader>
                    <Translate id="sideBar.recommendations">
                      Recommendations
                    </Translate>
                  </SideBarHeader>
                  <SideBarMenu>
                    <NavLink to="/discover" onClick={this.props.toggleSideNav}>
                      <IconWrapper>
                        <Icon name="Discover" type="mini" size="16px" />
                      </IconWrapper>
                      <Translate id="siteNav.discover">Discover</Translate>
                    </NavLink>
                    <a
                      target="_blank"
                      href="https://getpocket.com/explore"
                      onClick={this.props.toggleSideNav}>
                      <IconWrapper>
                        <Icon name="Reading" type="mini" size="16px" />
                      </IconWrapper>
                      <Translate id="siteNav.explore">Explore</Translate>
                    </a>
                  </SideBarMenu>
                </SideBarContent>
              </TouchScrollable>
            </React.Fragment>
          )}
        </SideBarWrapper>
      </SideBarContainer>
    )
  }
}

export const SideBarOverlay = withLocalize(SideBarOverlayClass)
