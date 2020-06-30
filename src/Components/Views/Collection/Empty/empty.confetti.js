import React, { Component } from 'react'
import { Icon } from '../../../Elements/Icons/icon'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { Particles } from './empty.elements'
import { EMPTY_STATE_DELAY } from '../../../../Common/constants'

const fadeInOut = keyframes`
  0%{
    opacity: 0;
  } 35% {
    opacity: 1;
  } 100% {
    opacity: 0;
  }
`

const circle1 = keyframes`
  0%{
    transform: translate(0, 0);
  } 40% {
    transform: translate(-30px, -50px);
  } 100% {
    transform: translate(-35px, -30px);
  }
`

const circle2 = keyframes`
  0%{
    transform: translate(0, 0);
  } 55% {
    transform: translate(40px, -60px);
  } 100% {
    transform: translate(45px, -40px);
  }
`

const triangle1 = keyframes`
  0%{
    transform: translate(0, 0) rotate(0deg);
  } 32% {
    transform: translate(-10px, -80px) rotate(227deg);
  } 100% {
    transform: translate(-15px, -60px) rotate(360deg);
  }
`

const triangle2 = keyframes`
  0%{
    transform: translate(0, 0) rotate(0);
  } 41% {
    transform: translate(20px, -55px) rotate(123deg);
  } 100% {
    transform: translate(25px, -40px) rotate(226deg);
  }
`

const square1 = keyframes`
  0%{
    transform: translate(0, 0) rotate(0);
  } 54% {
    transform: translate(-60px, -80px)  rotate(180deg);
  } 100% {
    transform: translate(-65px, -60px) rotate(220deg);
  }
`

const square2 = keyframes`
  0%{
    transform: translate(0, 0)  rotate(0);
  } 43% {
    transform: translate(10px, -55px)  rotate(135deg);
  } 100% {
    transform: translate(10px, -40px)  rotate(200deg);
  }
`

const animationTime = '1.2s'
const delay = `${EMPTY_STATE_DELAY}ms`
const AnimationBlock = styled('div')`
  position: relative;
  transform-style: preserve-3d;
  color: ${({ theme }) => theme.list.empty.accent};
  .circle1 svg {
    animation-name: ${fadeInOut}, ${circle1};
    animation-duration: ${animationTime};
    animation-timing-function: cubic-bezier(0.44, 0.15, 0.59, 0.89);
    animation-delay: ${delay};
    animation-iteration-count: 1;
  }
  .circle2 svg {
    animation-name: ${fadeInOut}, ${circle2};
    animation-duration: ${animationTime};
    animation-timing-function: cubic-bezier(0.44, 0.15, 0.59, 0.89);
    animation-delay: ${delay};
    animation-iteration-count: 1;
  }
  .triangle1 svg {
    animation-name: ${fadeInOut}, ${triangle1};
    animation-duration: ${animationTime};
    animation-timing-function: cubic-bezier(0.44, 0.15, 0.59, 0.89);
    animation-delay: ${delay};
    animation-iteration-count: 1;
  }
  .triangle2 svg {
    animation-name: ${fadeInOut}, ${triangle2};
    animation-duration: ${animationTime};
    animation-timing-function: cubic-bezier(0.44, 0.15, 0.59, 0.89);
    animation-delay: ${delay};
    animation-iteration-count: 1;
  }
  .square1 svg {
    animation-name: ${fadeInOut}, ${square1};
    animation-duration: ${animationTime};
    animation-timing-function: cubic-bezier(0.44, 0.15, 0.59, 0.89);
    animation-delay: ${delay};
    animation-iteration-count: 1;
  }
  .square2 svg {
    animation-name: ${fadeInOut}, ${square2};
    animation-duration: ${animationTime};
    animation-timing-function: cubic-bezier(0.44, 0.15, 0.59, 0.89);
    animation-delay: ${delay};
    animation-iteration-count: 1;
  }
`

export class EmptyConfetti extends Component {
  render() {
    return (
      <AnimationBlock>
        <Particles />
        <Icon type="solid" name="Save" size="32px" />
      </AnimationBlock>
    )
  }
}
