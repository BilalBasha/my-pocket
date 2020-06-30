/* eslint  react/jsx-no-target-blank: 0*/
import React from 'react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { Translate, withLocalize } from 'react-localize-redux'

const SiteNavWrapper = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
`

const NavItem = styled('li')`
  display: block;
  font-size: 14px;
  height: 100%;
  a {
    display: flex;
    position: relative;
    align-items: center;
    align-content: center;
    height: 100%;
    text-decoration: none;
    padding: 0 24px;
    color: ${props => props.theme.navBar.siteNav.color};
    &:hover {
      color: ${props => props.theme.navBar.siteNav.hover};
    }
    &.active {
      font-weight: 600;
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        background-image: ${props => props.theme.navBar.rainbowbar};
        border-radius: 3px 3px 0 0;
        width: 100%;
        height: 3px;
      }
    }
  }
`

class SiteNavClass extends React.Component {
  isHome = (isMatched, location) => {
    if (location.pathname === '/') return true
    const matchRegEx = /\b(\/|archive|favorites|highlights|articles|videos)\b/
    return location.pathname.match(matchRegEx)
  }

  render() {
    return (
      <SiteNavWrapper>
        <NavItem>
          <NavLink to="/" isActive={this.isHome}>
            <Translate id="siteNav.home">Home</Translate>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/discover">
            <Translate id="siteNav.discover">Discover</Translate>
          </NavLink>
        </NavItem>
        <NavItem>
          <a target="_blank" href="https://getpocket.com/explore">
            <Translate id="siteNav.explore">Explore</Translate>
          </a>
        </NavItem>
      </SiteNavWrapper>
    )
  }
}

export const SiteNav = withLocalize(SiteNavClass)
