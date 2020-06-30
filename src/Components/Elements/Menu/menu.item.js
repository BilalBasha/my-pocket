import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { buttonReset } from '../Buttons/button'
import { Icon } from '../Icons/icon'
import { TooltipBase } from '../../Elements/Tooltip/tooltip'

const menuItemCss = props => css`
  ${buttonReset};
  cursor: pointer;
  display: block;
  width: 100%;
  padding: 4px 20px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  background-color: ${props.theme.menu.background};
  color: ${props.theme.menu.color};
  &:hover {
    background-color: ${props.theme.menu.hover.background};
    color: ${props.theme.menu.hover.color};
  }
`

export const MenuItemButton = styled('button')`
  ${menuItemCss};
  ${TooltipBase};
`

export const MenuItemBlock = styled('div')`
  ${menuItemCss};
  ${TooltipBase};
`

export const IconWrapper = styled('span')`
  display: inline-block;
  margin-right: 8px;
`

export const MenuItem = ({
  action,
  copy,
  aria,
  icon,
  type = 'line',
  size = '24px'
}) => {
  return (
    <li>
      <MenuItemButton onClick={action} aria-label={aria || copy}>
        {icon ? (
          <IconWrapper>
            <Icon name={icon} type={type} size={size} />
          </IconWrapper>
        ) : null}
        {copy}
      </MenuItemButton>
    </li>
  )
}
