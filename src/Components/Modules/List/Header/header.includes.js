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
    top: 100%;
    left: 0;
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

const includeSubsets = {
  favorites: {
    all: { premium: false },
    unread: { premium: false },
    read: { premium: false }
  },
  highlights: {
    all: { premium: false },
    unread: { premium: false },
    read: { premium: false },
    favorite: { premium: false }
  },
  tagged: {
    all: { premium: false },
    unread: { premium: false },
    read: { premium: false },
    favorite: { premium: false }
  },
  articles: {
    all: { premium: false },
    unread: { premium: false },
    read: { premium: false },
    favorite: { premium: false }
  },
  videos: {
    all: { premium: false },
    unread: { premium: false },
    read: { premium: false },
    favorite: { premium: false }
  },
  search: {
    all: { premium: true },
    unread: { premium: false },
    read: { premium: false }
  }
}

class IncludeMenuClass extends Component {
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

  setAll = () => {
    return this.props.setInclude({
      subset: this.props.subset,
      tag: this.props.tag,
      searchQuery: this.props.searchQuery,
      include: 'all'
    })
  }

  setUnread = () => {
    return this.props.setInclude({
      subset: this.props.subset,
      sort: this.props.sort,
      tag: this.props.tag,
      searchQuery: this.props.searchQuery,
      include: 'unread'
    })
  }

  setArchive = () => {
    return this.props.setInclude({
      subset: this.props.subset,
      sort: this.props.sort,
      tag: this.props.tag,
      searchQuery: this.props.searchQuery,
      include: 'read'
    })
  }

  setFavorite = () => {
    return this.props.setInclude({
      subset: this.props.subset,
      sort: this.props.sort,
      tag: this.props.tag,
      searchQuery: this.props.searchQuery,
      include: 'favorite'
    })
  }

  includeAction = (item, event) => {
    event.preventDefault()

    const actions = {
      all: this.setAll,
      unread: this.setUnread,
      read: this.setArchive,
      favorite: this.setFavorite
    }
    actions[item]()
  }

  render() {
    const { isPremium, subset, include, translate } = this.props
    const items = includeSubsets[subset]
    const includeTitles = {
      all: translate('listHeader.include.all'),
      unread: translate('listHeader.include.unread'),
      read: translate('listHeader.include.read'),
      favorite: translate('listHeader.include.favorite')
    }

    return include ? (
      <IncludeWrapper
        onMouseEnter={this.listHoverOn}
        onMouseLeave={this.listHoverOff}>
        {includeTitles[include]}
        <Icon type="mini" name="DownChevron" size="16px" margin="0 0 0 3px" />
        {this.state.hover ? (
          <MenuContainer>
            {Object.keys(items).map(item => {
              const shouldShow = items[item].premium ? isPremium : true
              return shouldShow ? (
                <li key={item}>
                  <MenuItemButton
                    onClick={this.includeAction.bind(this, item)}
                    aria-label={translate(`listHeader.menu.${item}.aria`)}>
                    {include === item ? (
                      <Icon
                        name="Check"
                        type="mini"
                        size="16px"
                        margin="0 8px 0 0"
                      />
                    ) : (
                      <IconBlank />
                    )}

                    {translate(`listHeader.menu.${item}.copy`)}
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

export const IncludeMenu = withLocalize(IncludeMenuClass)
