import React, { Component } from 'react'
import { openBrowserWindow } from '../../../Common/helpers'
import { buttonReset } from '../../Elements/Buttons/button'
import { TooltipBase } from '../../Elements/Tooltip/tooltip'
import styled from '@emotion/styled'

const BufferButton = styled('button')`
  ${buttonReset};
  width: 100%;
  cursor: pointer;
  ${TooltipBase};
`

export class BufferShareButton extends Component {
  openWindow = (url, quote, callback) => {
    const opts = {
      name: 'buffer',
      height: 550,
      width: 750
    }
    const text = quote ? `&text=${quote}` : ''
    const link = `https://bufferapp.com/add?url=${encodeURIComponent(
      url
    )}${text}`
    openBrowserWindow(link, opts, callback)
  }

  onClick = e => {
    e.preventDefault()
    const { url, text, onShareWindowClose } = this.props
    this.openWindow(url, text, onShareWindowClose)
  }

  render() {
    return (
      <BufferButton aria-label="Buffer" onClick={this.onClick}>
        {this.props.children}
      </BufferButton>
    )
  }
}
