import React, { Component } from 'react'
import { BarActions } from '../../../Elements/NavBar/navBar'
import { NavBarInput } from '../../../Elements/NavBar/navBar'
import { ActionList, ActionIcon } from '../../../Elements/NavBar/navBar'
import { NavClamp } from '../../../Elements/NavBar/navBar.clamp'
import styled from '@emotion/styled'
import { Button } from '../../../Elements/Buttons/button'
import { Brand } from '../../../Elements/NavBar/navBar.brand'
import { KEYS } from '../../../../Common/constants'

import facepaint from 'facepaint'
import { BREAKPOINTS, SIDEBAR_WIDTH } from '../../../../Common/constants'
import { Translate, withLocalize } from 'react-localize-redux'

const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const NavClampFull = styled(NavClamp)`
  ${mq({
    gridTemplateColumns: [
      '30px auto 243px',
      '30px auto 243px',
      `${SIDEBAR_WIDTH + 10}px auto 243px`
    ]
  })};
`

const NavClampMin = styled(NavClamp)`
  grid-template-columns: auto 32px;
`

class NavSearchClass extends Component {
  state = { value: this.props.query || '', selectedIndex: -1 }

  onChange = event => {
    event.preventDefault()
    this.setState({ value: event.target.value })
  }

  onKeyDown = event => {
    switch (event.keyCode) {
      // Handle intent to exit
      case KEYS.DOWN: {
        if (!this.props.isPremium) return
        return this.indexBack()
      }
      case KEYS.UP: {
        if (!this.props.isPremium) return
        return this.indexForward()
      }
      default:
        return
    }
  }

  indexBack = () => {
    const { recentSearches } = this.props
    if (this.state.selectedIndex < recentSearches.length - 1) {
      this.setState(state => ({ selectedIndex: state.selectedIndex + 1 }))
    }
  }

  indexForward = () => {
    if (this.state.selectedIndex >= 0) {
      this.setState(state => ({ selectedIndex: state.selectedIndex - 1 }))
    }
  }

  onKeyUp = event => {
    switch (event.keyCode) {
      // Handle intent to exit
      case KEYS.ESCAPE: {
        const index = this.state.selectedIndex
        if (index > -1) {
          return this.setState({
            selectedIndex: -1,
            value: ''
          })
        }
        return this.handleExit()
      }
      case KEYS.ENTER: {
        if (this.state.value) return this.handleSearch()

        const index = this.state.selectedIndex
        if (index > -1) {
          return this.setState({
            selectedIndex: -1,
            value: this.props.recentSearches[index].search
          })
        }
        return
      }
      default:
        return
    }
  }

  handleSearch = () => {
    const { value } = this.state
    const { include } = this.props
    this.props.searchCollection({ value, include, subset: 'search' })
  }

  handleExit = () => {
    this.props.exitSearchMode()
  }

  handleClick = index => {
    const value = this.props.recentSearches[index].search
    this.setState({ selectedIndex: -1, value })

    const { include } = this.props
    this.props.searchCollection({ value, include, subset: 'search' })
  }

  get recentSearches() {
    const { recentSearches } = this.props
    return (
      <ul>
        <li>
          <h5>Recent Searches</h5>
        </li>
        {recentSearches.map((recent, index) => {
          const className = index === this.state.selectedIndex ? 'active' : null
          return (
            <li
              className={className}
              key={`${recent.search}_${recent.sort_id}`}>
              <button onClick={this.handleClick.bind(this, index)}>
                {recent.search}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  /* Render
  ------------------------------------------------------- */
  render() {
    const { hasSidebar, translate, isPremium } = this.props
    const NavLayout = hasSidebar ? NavClampFull : NavClampMin
    const showRecent = isPremium && !this.state.value.length

    return (
      <NavLayout>
        {hasSidebar ? (
          <ActionList>
            <Brand hasSidebar={hasSidebar} />
          </ActionList>
        ) : null}
        <NavBarInput>
          <input
            placeholder={` ${translate('search.placeholder')}`}
            autoFocus={true} //eslint-disable-line
            value={this.state.value}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
          />
          {showRecent ? this.recentSearches : null}
        </NavBarInput>

        <BarActions>
          {hasSidebar ? (
            <React.Fragment>
              <Button
                onClick={this.handleExit}
                type="neutral"
                margin="0 8px 0 0">
                <Translate id="search.cancel">Cancel</Translate>
              </Button>
              <Button onClick={this.handleSearch} type="cta">
                <Translate id="search.search">Search</Translate>
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ActionIcon
                icon="CloseX"
                action={this.handleExit}
                tooltip="exit"
                type="line"
                size="24px"
                margin="0 0 0 8px"
              />
            </React.Fragment>
          )}
        </BarActions>
      </NavLayout>
    )
  }
}
export const NavSearch = withLocalize(NavSearchClass)
