import React, { Component } from 'react'
import { MenuItem } from './menu.item'
import styled from '@emotion/styled'
import { OverlayBase } from '../../Elements/Overlay/overlay'

export const MenuContainer = styled('ul')`
  ${OverlayBase};
  list-style-type: none;
  margin: 0;
  padding: 10px 0;
  width: ${props => (props.width ? props.width : 170)}px;
  ${props => props.addedStyles}
`

class Menu extends Component {
  buildMenuItems = () => {
    if (!this.props.menuItems) return

    return this.props.menuItems.map((menuItem, index) => {
      return (
        <MenuItem
          key={index}
          aria={menuItem.aria}
          copy={menuItem.copy}
          icon={menuItem.icon}
          action={menuItem.action}
          type={menuItem.type}
          size={menuItem.size}
        />
      )
    })
  }

  render() {
    return (
      <MenuContainer
        width={this.props.width}
        listMode={this.props.listMode}
        addedStyles={this.props.addedStyles}>
        {this.props.menuItems && this.buildMenuItems()}
        {this.props.children}
      </MenuContainer>
    )
  }
}

export { Menu }
