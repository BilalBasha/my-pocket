import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { buttonReset } from '../../../Elements/Buttons/button'
import { Icon } from '../../../Elements/Icons/icon'
import { SidebarTags } from './Tags/tags.container'
import { SIDEBAR_WIDTH, ZINDEX } from '../../../../Common/constants'
import { NavLink } from 'react-router-dom'
import { Translate, withLocalize } from 'react-localize-redux'
import { SidebarFooter } from '../../../../Components/Views/App/Sidebar/sidebar.footer'
import { SidebarUpsell } from '../../../../Components/Views/App/Sidebar/sidebar.upsell'

const SideBarContainer = styled('div')`
  position: relative;
  .simplebar-track {
    left: 0;
    right: initial;
  }
  .simplebar-scrollbar:before {
    background: ${props => props.theme.sidebar.scrollbar};
  }
`

const SideBarWrapper = styled('div')`
  display: block;
  width: ${SIDEBAR_WIDTH}px;
  position: fixed;
  height: 100%;
  z-index: ${ZINDEX.sideBar};
  overflow: hidden;
`

const SideBarContent = styled('div')`
  padding: 40px 0;
`

const SidebarFlex = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const SideBarHeaderStyle = props => css`
  font-size: 16px;
  font-weight: 500;
  line-height: 12px;
  padding: 0 20px 14px;
  margin: 0;
  color: ${props.theme.sidebar.header};
`

const SideBarHeader = styled('h4')`
  ${SideBarHeaderStyle};
`

const SideBarMenu = styled('div')`
  list-style-type: none;
  margin: 0 0 30px;
  padding: 0 10px 0 0;

  a,
  button {
    display: flex;
    align-items: center;
    align-content: center;
    width: 100%;
    padding: 0 20px 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    height: 40px;
    border-radius: 4px;
    text-decoration: none;
    color: ${props => props.theme.sidebar.menu.button.primary.color};
    &:hover,
    &:active {
      color: ${props => props.theme.sidebar.menu.button.primary.hover};
    }
    &.active {
      color: ${props => props.theme.sidebar.menu.button.primary.hover};
      background-color: ${props =>
        props.theme.sidebar.menu.button.primary.background};
    }
  }
`

const SideBarMenuButton = styled('button')`
  ${buttonReset};
  cursor: pointer;
`

const IconWrapper = styled('span')`
  display: inline-block;
  margin-right: 8px;
`

const SideBarClose = styled('div')`
  ${SideBarHeaderStyle};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  cursor: pointer;
  padding: 6px 0 24px;
  color: ${props => props.theme.sidebar.menu.button.primary.color};
  a {
    color: ${props => props.theme.sidebar.menu.button.primary.color};
    &:hover,
    &:active {
      color: ${props => props.theme.sidebar.menu.button.primary.hover};
    }
  }
`

class SidebarFullClass extends React.Component {
  state = { tagsShown: false }

  componentDidUpdate(prevProps) {
    if (this.props.subset === 'tagged' && prevProps.subset !== 'tagged') {
      this.setState({ tagsShown: true })
    }
  }

  toggleTagsShown = () => {
    this.setState(state => {
      return { tagsShown: !state.tagsShown }
    })
  }

  render() {
    const { tag, translate, isPremium, trackClick } = this.props
    return (
      <SideBarContainer role="navigation">
        <SideBarWrapper>
          {this.state.tagsShown ? (
            <React.Fragment>
              <SideBarContent>
                <SideBarClose
                  onClick={this.toggleTagsShown}
                  aria-label={translate('sideBar.tags.close')}>
                  <Icon type="line" name="BackChevron" size="24px" />
                  <Translate id="sideBar.tagsHeader">Tags</Translate>
                </SideBarClose>
                <SidebarTags toggleTagsShown={this.toggleTagsShown} tag={tag} />
              </SideBarContent>
            </React.Fragment>
          ) : (
            <SidebarFlex>
              <SideBarContent>
                <SideBarMenu>
                  <NavLink exact to="/">
                    <IconWrapper>
                      <Icon name="Home" type="mini" size="16px" />
                    </IconWrapper>
                    <Translate id="sideBar.home.copy">My List</Translate>
                  </NavLink>
                  <NavLink to="/archive">
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
                  <NavLink to="/favorites/all">
                    <IconWrapper>
                      <Icon name="Favorite" type="mini" size="16px" />
                    </IconWrapper>
                    <Translate id="sideBar.favorites.copy">Favorites</Translate>
                  </NavLink>
                  <NavLink to="/highlights/all">
                    <IconWrapper>
                      <Icon name="Highlights" type="mini" size="16px" />
                    </IconWrapper>
                    <Translate id="sideBar.highlights.copy">
                      Highlights
                    </Translate>
                  </NavLink>
                  <SideBarMenuButton
                    onClick={this.toggleTagsShown}
                    aria-label={translate('sideBar.tags.aria')}>
                    <IconWrapper>
                      <Icon name="Tag" type="mini" size="16px" />
                    </IconWrapper>
                    <Translate id="sideBar.tags.copy">Tags</Translate>
                  </SideBarMenuButton>
                  <NavLink
                    to="/articles/all"
                    aria-label={translate('sideBar.articles.aria')}>
                    <IconWrapper>
                      <Icon name="Article" type="mini" size="16px" />
                    </IconWrapper>
                    <Translate id="sideBar.articles.copy">Articles</Translate>
                  </NavLink>
                  <NavLink
                    to="/videos/all"
                    aria-label={translate('sideBar.videos.aria')}>
                    <IconWrapper>
                      <Icon name="Videos" type="mini" size="16px" />
                    </IconWrapper>
                    <Translate id="sideBar.videos.copy">Videos</Translate>
                  </NavLink>
                </SideBarMenu>
                {isPremium ? null : <SidebarUpsell trackClick={trackClick} />}
              </SideBarContent>
              <SidebarFooter />
            </SidebarFlex>
          )}
        </SideBarWrapper>
      </SideBarContainer>
    )
  }
}
export const SidebarFull = withLocalize(SidebarFullClass)
