import React from 'react'
import styled from '@emotion/styled'
import { ZINDEX } from '../../../Common/constants'

const BarWrapper = styled('div')`
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${ZINDEX.progressBar};
  & > div {
    background-color: ${props => props.theme.progressBar.background};
    height: 2px;
    width: 100%;
    transition: transform 100ms linear;
  }
`

export class ProgressBar extends React.Component {
  render() {
    const { percentage = 0, noScroll = false } = this.props
    const barTranslate = noScroll ? 0 : percentage
    return (
      <BarWrapper>
        <div
          style={{
            transform: `translateX(${barTranslate - 100}%)`
          }}
        />
      </BarWrapper>
    )
  }
}
