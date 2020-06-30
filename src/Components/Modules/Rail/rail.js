import React, { Component } from 'react'
import styled from '@emotion/styled'

const RailWrapper = styled('div')`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  width: 350px;
  background-color: transparent;
  box-shadow: none;
  border-right: 1px solid transparent;
  transition: all 150ms ease-in-out;
  &:hover,
  &.visible {
    background-color: ${props => props.theme.annotations.gutter};
    box-shadow: none;
    border-right: 1px solid ${props => props.theme.annotations.border};
  }
`

export class Rail extends Component {
  render() {
    const { visible, clickAction } = this.props
    const visibleClass = visible ? 'visible' : ''

    return (
      <RailWrapper
        className={`rail-wrapper ${visibleClass}`}
        onClick={clickAction}>
        {this.props.children}
      </RailWrapper>
    )
  }
}
