import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { ZINDEX } from '../../../Common/constants'
import { buttonReset } from '../../Elements/Buttons/button'
import { TooltipBase } from '../../Elements/Tooltip/tooltip'
import { Icon } from '../../Elements/Icons/icon'
export { NavClamp } from '../../Elements/NavBar/navBar.clamp'

export const NavBarTop = styled('div')`
  display: block;
  color: ${({ theme }) => theme.navBar.top.color};
  background-color: ${({ theme }) => theme.navBar.top.background};
  border-bottom: 1px solid ${({ theme }) => theme.navBar.bottom.border};
  font-size: 1em;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: ${ZINDEX.navBar};
`

export const NavBarBottom = styled('div')`
  display: block;
  border-top: 1px solid ${({ theme }) => theme.navBar.bottom.border};
  color: ${({ theme }) => theme.navBar.bottom.color};
  background-color: ${({ theme }) => theme.navBar.bottom.background};
  border-radius: 0;
  width: 100%;
  height: 62px;
  padding: 0;
  font-size: 1em;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  display: flex;
  justify-content: start;
  align-items: center;
  z-index: ${ZINDEX.navBar};
`

/** Input
 --------------------------------------------------------------- */
export const Input = styled('input')`
  width: 100%;
  height: 60px;
  border: none;
  background-color: transparent;
  font-weight: 300;
  padding: 0 8px;
`

export const InputWrapper = styled('div')`
  width: 100%;
  max-width: 100%;
  align-content: center;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`

export const NavBarInput = styled(InputWrapper)`
  position: relative;
  div {
    position: absolute;
    top: 0;
    left: 14px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ul {
    text-align: left;
    list-style-type: none;
    width: 100%;
    margin: 0;
    padding: 10px 0;
    background: ${props => props.theme.form.input.background};
    position: absolute;
    top: 40px;
    left: 0;
    border-radius: 0 0 4px 4px;
    li {
      padding: 0 14px;
      &:hover,
      &.active {
        background-color: ${props => props.theme.form.typeahead.hover};
        button {
          color: ${props => props.theme.form.hover};
        }
      }
      h5 {
        text-transform: uppercase;
        font-size: 12px;
        line-height: 14px;
        margin: 0;
        font-weight: 300;
        color: ${props => props.theme.form.input.placeholder};
        padding: 10px 0;
      }
      button {
        ${buttonReset};
        cursor: pointer;
        text-decoration: none;
        color: ${props => props.theme.form.color};
        display: block;
        width: 100%;
        padding: 12px 0;
        font-size: 16px;
        line-height: 22px;
        box-sizing: content-box;
        border-bottom: 1px solid ${props => props.theme.body.border};
      }
      &:last-of-type button {
        border-bottom: none;
      }
      &:first-of-type:hover {
        background-color: transparent;
      }
    }
  }
  input {
    width: 100%;
    line-height: 16px;
    padding: 12px;
    background: ${props => props.theme.form.input.background};
    color: ${props => props.theme.form.color};
    border-radius: 4px;
    border: 2px solid ${props => props.theme.form.input.border};
    &::placeholder {
      color: ${props => props.theme.form.input.placeholder};
    }
  }
`

export const InputStyle = css`
  all: unset;
  background: transparent;
  display: inline-block;
  font-size: 1em;
  font-weight: 300;
  padding: 0;
`

export const Placeholder = styled('div')`
  color: ${props => props.theme.form.placeholder};
  display: inline-block;
  font-size: 1em;
  font-weight: 300;
  padding: 0;
`

/** Actions
 --------------------------------------------------------------- */
const ActionIconWrapper = styled('button')`
  ${buttonReset};
  cursor: pointer;
  line-height: inherit;
  margin: ${props => (props.margin ? props.margin : '0 8px')};
  position: relative;
  display: inline-block;
  color: ${props =>
    props.favorite
      ? props.theme.navBar.action.favorite
      : props.theme.navBar.action.color};
  &:hover {
    color: ${({ theme }) => theme.navBar.action.hover.color};
  }
  ${TooltipBase};
`

export const ActionItem = styled('div')`
  position: relative;
  display: inline-block;
`

export const ActionList = styled('div')`
  height: 100%;
  width: ${props => (props.width ? props.width : 'auto')};
  padding: 0;
  font-size: 1.06em;
  color: ${props => props.theme.navBar.action.color};
  display: flex;
  align-content: center;
  align-items: center;
`

export class ActionIcon extends Component {
  render() {
    const {
      action,
      icon,
      tooltip,
      type = 'line',
      size = '1.4em',
      margin,
      disabled = false,
      favorite = false
    } = this.props

    return (
      <ActionIconWrapper
        aria-label={tooltip}
        disabled={disabled}
        margin={margin}
        onClick={action}
        data-tooltip={tooltip}
        favorite={favorite}>
        <Icon name={icon} type={type} size={size} />
        {this.props.children}
      </ActionIconWrapper>
    )
  }
}

export const BarActions = styled(ActionList)`
  justify-content: flex-end;
`
