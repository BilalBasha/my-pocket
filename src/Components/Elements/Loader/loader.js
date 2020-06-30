import React, { Component } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import posed, { PoseGroup } from 'react-pose'

const LoadInOut = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 0,
    transition: {
      y: { type: 'spring', stiffness: 400, damping: 35 },
      default: { duration: 1000 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 250 }
  }
})

const bounce = keyframes`
  0%, 70%, 100% {
    transform: translateY(0);
  } 35% {
    transform: translateY(-20px);
  }
`

const spinTriangle = keyframes`
  0%{
    transform: rotate(0deg);
  } 40% {
    transform: rotate(120deg);
  } 100% {
    transform: rotate(120deg);
  }

`

const spinSquare = keyframes`
  0%{
    transform: rotate(0deg);
  } 60% {
    transform: rotate(90deg);
  } 100% {
    transform: rotate(90deg);
  }

`

export const LoaderCentered = styled('div')`
  height: calc(100vh - 63px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`

export const LoadMore = styled('div')`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`

const LoadWrapper = styled('div')`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;

  svg {
    display: block;
    width: 12px;
    height: 12px;
    margin: 0 3px;
    fill: currentColor;
  }
  .spin {
    display: inline-block;
    animation: ${bounce} 1.6s infinite cubic-bezier(0.44, 0.15, 0.59, 0.89) both;
  }
  .circle {
    svg {
      fill: #ef4056;
    }
    animation-delay: -0.84s;
  }
  .triangle {
    svg {
      transform-origin: 7px 9px;
      width: 14px;
      height: 14px;
      fill: #fcb643;
      animation: ${spinTriangle} 1.6s infinite ease-in-out forwards;
    }
    animation-delay: -0.42s;
  }
  .square {
    svg {
      margin-bottom: 1px;
      width: 11px;
      height: 11px;
      animation: ${spinSquare} 1.6s infinite ease-in-out forwards;
      fill: #116a65;
    }
  }
`

const LoadBlock = styled('div')`
  padding-top: 20px;
`

export class Loader extends Component {
  render() {
    const { isVisible } = this.props

    return (
      <PoseGroup>
        {isVisible && [
          <LoadInOut key="loadInOut">
            <LoadWrapper>
              <LoadBlock>
                <div className="spin circle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
                    <circle cx="3" cy="3" r="3" />
                  </svg>
                </div>
                <div className="spin triangle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M24 22H0L12 2z" />
                  </svg>
                </div>
                <div className="spin square">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
                    <path d="M0 0h6v6H0z" />
                  </svg>
                </div>
              </LoadBlock>
            </LoadWrapper>
          </LoadInOut>
        ]}
      </PoseGroup>
    )
  }
}
