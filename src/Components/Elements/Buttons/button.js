import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { TooltipBase } from '../../Elements/Tooltip/tooltip'

export const buttonReset = css`
  input:focus,
  button:focus,
  select:focus {
    outline: 0;
  }
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  text-align: inherit;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  &:focus {
    outline: 0;
  }
`
export const buttonStyle = props => css`
  ${buttonReset};
  cursor: pointer;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  padding: 6px 18px;
  border-radius: 4px;
  white-space: nowrap;
  margin: ${props.margin ? props.margin : '0'};
  width: ${props.full ? '100%' : 'initial'};
`

export const Button = styled('button')`
  ${buttonStyle};
  ${TooltipBase};
  background-color: ${({ theme, type }) => theme.buttons[type].background};
  color: ${({ theme, type }) => theme.buttons[type].color};
  border: 1px solid ${({ theme, type }) => theme.buttons[type].border};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  &:hover {
    color: ${({ theme, type }) => theme.buttons[type].hover.color};
    background-color: ${({ theme, type }) =>
      theme.buttons[type].hover.background};
    border: 1px solid ${({ theme, type }) => theme.buttons[type].hover.border};
  }
`

export const ButtonLink = styled('a')`
  ${buttonStyle};
  text-decoration: none;
  background-color: ${({ theme, type }) => theme.buttons[type].background};
  color: ${({ theme, type }) => theme.buttons[type].color};
  border: 1px solid ${({ theme, type }) => theme.buttons[type].border};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  &:hover {
    color: ${({ theme, type }) => theme.buttons[type].hover.color};
    background-color: ${({ theme, type }) =>
      theme.buttons[type].hover.background};
    border: 1px solid ${({ theme, type }) => theme.buttons[type].hover.border};
  }
  &:active {
    color: ${({ theme, type }) => theme.buttons[type].active.color};
    background-color: ${({ theme, type }) =>
      theme.buttons[type].active.background};
    border: 1px solid ${({ theme, type }) => theme.buttons[type].active.border};
  }
`

export const FloatingButton = styled('button')`
  ${buttonReset};
  ${TooltipBase};
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  text-align: center;
  background-color: ${({ theme, type }) => theme.buttons[type].background};
  color: ${({ theme, type }) => theme.buttons[type].color};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  &:hover {
    color: ${({ theme, type }) => theme.buttons[type].hover.color};
    background-color: ${({ theme, type }) =>
      theme.buttons[type].hover.background};
  }
`
