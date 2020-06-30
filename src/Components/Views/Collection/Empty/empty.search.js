import React, { Component } from 'react'
import { Icon } from '../../../Elements/Icons/icon'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { Particles } from './empty.elements'

const fadeInOut = keyframes`
  0%{
    opacity: 0;
  } 40% {
    opacity: 1;
  } 80% {
    opacity: 1;
  } 100% {
    opacity: 0;
  }
`

const circle1 = keyframes`
  0%{
    transform: translate(-60px, -10px);
  } 100% {
    transform: translate(40px, -10px);
  }
`

const circle2 = keyframes`
  0%{
    transform: translate(-60px, 10px);
  } 100% {
    transform: translate(40px, 10px);
  }
`

const triangle1 = keyframes`
  0%{
    transform: translate(-60px, 0px);
  } 100% {
    transform: translate(40px, 0px);
  }
`

const triangle2 = keyframes`
  0%{
    transform: translate(-60px, -16px);
  } 100% {
    transform: translate(40px, -16px);
  }
`

const square1 = keyframes`
  0%{
    transform: translate(-60px, -12px);
  } 100% {
    transform: translate(40px, -12px);
  }
`

const square2 = keyframes`
  0%{
    transform: translate(-60px, -24px);
  } 100% {
    transform: translate(40px, -24px);
  }
`

const animationTime = 2000
const increment = animationTime / 6
const easing = 'linear, cubic-bezier(0.445, 0.05, 0.55, 0.95)'
const AnimationBlock = styled('div')`
  position: relative;
  transform-style: preserve-3d;

  .circle1 svg {
    animation-name: ${fadeInOut}, ${circle1};
    animation-duration: ${animationTime}ms;
    animation-timing-function: ${easing};
    animation-delay: ${0 * increment}ms;
    animation-iteration-count: 2;
  }
  .circle2 svg {
    animation-name: ${fadeInOut}, ${circle2};
    animation-duration: ${animationTime}ms;
    animation-timing-function: ${easing};
    animation-delay: ${1 * increment}ms;
    animation-iteration-count: 2;
  }
  .triangle1 svg {
    animation-name: ${fadeInOut}, ${triangle1};
    animation-duration: ${animationTime}ms;
    animation-timing-function: ${easing};
    animation-delay: ${2 * increment}ms;
    animation-iteration-count: 2;
  }
  .triangle2 svg {
    animation-name: ${fadeInOut}, ${triangle2};
    animation-duration: ${animationTime}ms;
    animation-timing-function: ${easing};
    animation-delay: ${5 * increment}ms;
    animation-iteration-count: 1;
  }
  .square1 svg {
    animation-name: ${fadeInOut}, ${square1};
    animation-duration: ${animationTime}ms;
    animation-timing-function: ${easing};
    animation-delay: ${4 * increment}ms;
    animation-iteration-count: 1;
  }
  .square2 svg {
    animation-name: ${fadeInOut}, ${square2};
    animation-duration: ${animationTime}ms;
    animation-timing-function: ${easing};
    animation-delay: ${3 * increment}ms;
    animation-iteration-count: 2;
  }
`

export class EmptySearch extends Component {
  render() {
    return (
      <AnimationBlock>
        <Particles />
        <Icon type="line" name="Search" size="32px" />
      </AnimationBlock>
    )
  }
}
