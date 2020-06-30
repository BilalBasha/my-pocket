import React, { Component } from 'react'
import styled from '@emotion/styled'
import { ZINDEX } from '../../../Common/constants'

const Backdrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  user-select: none;
  cursor: default;
  z-index: ${ZINDEX.shade};
`

const Shade = styled(Backdrop)`
  background-color: rgba(2, 2, 2, 0.2);
`

const ModalContent = styled('div')`
  position: relative;
  z-index: ${ZINDEX.modal};
`
export class Modal extends Component {
  handleShadeClicks = () => {
    const { cancel } = this.props
    if (!cancel) return
    cancel()
  }

  render() {
    console.log('modallllllllll');
    return (
      <Backdrop>
        <Shade onClick={this.handleShadeClicks} />
        <ModalContent>{this.props.children}</ModalContent>
      </Backdrop>
    )
  }
}
