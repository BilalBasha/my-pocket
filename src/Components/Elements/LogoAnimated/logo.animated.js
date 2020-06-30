import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Icon } from '../../Elements/Icons/icon'

const LogoWrapper = styled('div')`
  display: inline-block;
  position: relative;
  padding-top: 50px;
  color: ${props => props.theme.brand.color};
`
const Triangle = styled('div')`
  position: absolute;
  ${props => props.addedStyles}
`
const Tr1 = css`
  transform: translate(7px, -53px);
  color: #EF4056;
`
const Tr2 = css`
  color: #FCB643;
  transform: translate(6px, -35px) rotate(-35deg);
`
const Square = styled('div')`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 1px;
  ${props => props.addedStyles}
`
const Sq1 = css`
  background-color: #1CB0A8;
  transform: translate(-12px, -31px);
`
const Sq2 = css`
  background-color: #5FCF97;
  transform: translate(20px, -18px) rotate(-15deg);
`
const Circle = styled('div')`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  ${props => props.addedStyles}
`
const Ci1 = css`
  background-color: #1EABF9;
  transform: translate(27px, -35px);
`
const Ci2 = css`
  background-color: #A240EF;
  transform: translate(-5px, -15px);
`
const svg_triangle = `M3.0986 1.30323C3.68831 0.808408 4.59253 1.13752 4.7262 1.89562L5.17103 4.41839C5.30471 5.1765 4.56758 5.79502 3.84421 5.53173L1.43701 4.65558C0.71363 4.3923 0.546536 3.44467 1.13624 2.94985L3.0986 1.30323Z`

export class LogoAnimated extends Component {
  render() {
    return (
      <LogoWrapper>
        <Triangle addedStyles={Tr1}>
          <svg width="7" height="6" viewBox="0 0 7 6"><path d={svg_triangle} /></svg>
        </Triangle>
        <Triangle addedStyles={Tr2}>
          <svg width="7" height="6" viewBox="0 0 7 6"><path d={svg_triangle} /></svg>
        </Triangle>
        <Square addedStyles={Sq1} />
        <Square addedStyles={Sq2} />
        <Circle addedStyles={Ci1} />
        <Circle addedStyles={Ci2} />
        <Icon
          name="Save"
          type="solid"
          size="22px"
        />
      </LogoWrapper>
    )
  }
}

