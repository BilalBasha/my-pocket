import React from 'react'
import styled from '@emotion/styled'

const DivideDotWrapper = styled('span')`
  padding: 0 5px;
  font-size: 0.5em;
`

export const DivideVertical = styled('div')`
  width: 1px;
  height: 24px;
  margin: ${props => (props.margin ? props.margin : null)};
  background-color: ${({ theme }) => theme.divider.background};
`

export const DivideHorizontal = styled('div')`
  height: 1px;
  margin: ${props => (props.margin ? props.margin : null)};
  background-color: ${({ theme }) => theme.divider.background};
`

export const DivideDot = () => {
  return <DivideDotWrapper>•</DivideDotWrapper>
}
