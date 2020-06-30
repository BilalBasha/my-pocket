import React, { Component } from 'react'
import styled from '@emotion/styled'
import { buttonReset } from '../../../Elements/Buttons/button'
import { MenuContainer } from '../../../Elements/Menu/menu'
import { MenuItemButton } from '../../../Elements/Menu/menu.item'

import { ZINDEX } from '../../../../Common/constants'
import { withLocalize } from 'react-localize-redux'
import { Icon } from '../../../Elements/Icons/icon'

const IncludeWrapper = styled('div')`
  padding-left: 5px;
  display: inline-flex;
  align-items: center;
  align-content: center;
  position: relative;
  font-weight: 300;
  font-size: 0.9em;
  color: ${props => props.theme.list.header.color};
  cursor: pointer;
  ul {
    position: absolute;
    left: initial;
    top: 100%;
    right: 0;
    z-index: ${ZINDEX.popover};
  }
`

const IconBlank = styled('div')`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
`

export const ListHeaderAction = styled('button')`
  ${buttonReset};
  cursor: pointer;
  margin-left: 8px;
`

const sortSubsets = {
  search: {
    relevance: { premium: true },
    newest: { premium: false },
    oldest: { premium: false }
  }
}

class SortMenuClass extends Component {
  state = { hover: false }

  listHoverOn = () => {
    clearTimeout(this.timeout)
    this.setState({ hover: true })
  }

  listHoverOff = () => {
    this.timeout = setTimeout(this.closeMenu, 250)
  }

  closeMenu = () => {
    const state = this.state
    if (state.hover) this.setState({ hover: false })
  }

  setSortByNewest = () => {
    return this.props.setInclude({
      subset: this.props.subset,
      tag: this.props.tag,
      searchQuery: this.props.searchQuery,
      include: this.props.include,
      sort: 'newest'
    })
  }

  setSortByOldest = () => {
    return this.props.setInclude({
      subset: this.props.subset,
      tag: this.props.tag,
      searchQuery: this.props.searchQuery,
      include: this.props.include,
      sort: 'oldest'
    })
  }

  setSortByRelevance = () => {
    return this.props.setInclude({
      subset: this.props.subset,
      tag: this.props.tag,
      searchQuery: this.props.searchQuery,
      include: this.props.include,
      sort: 'relevance'
    })
  }

  sortAction = (item, event) => {
    event.preventDefault()
    const actions = {
      newest: this.setSortByNewest,
      oldest: this.setSortByOldest,
      relevance: this.setSortByRelevance
    }
    actions[item]()
  }

  render() {
    const { sort, subset, translate, isPremium } = this.props
    const items = sortSubsets['search']

    return subset === 'search' && sort ? (
      <IncludeWrapper
        onMouseEnter={this.listHoverOn}
        onMouseLeave={this.listHoverOff}>
        <Icon type="mini" name="Sort" size="16px" margin="0 0 0 3px" />
        {this.state.hover ? (
          <MenuContainer>
            {Object.keys(items).map(item => {
              const shouldShow = items[item].premium ? isPremium : true
              return shouldShow ? (
                <li key={item}>
                  <MenuItemButton onClick={this.sortAction.bind(this, item)}>
                    {sort === item ? (
                      <Icon
                        name="Check"
                        type="mini"
                        size="16px"
                        margin="0 8px 0 0"
                      />
                    ) : (
                      <IconBlank />
                    )}

                    {translate(`listHeader.sort.${item}`)}
                  </MenuItemButton>
                </li>
              ) : null
            })}
          </MenuContainer>
        ) : null}
      </IncludeWrapper>
    ) : null
  }
}

export const SortMenu = withLocalize(SortMenuClass)
