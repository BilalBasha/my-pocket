import styled from '@emotion/styled'
import { css } from '@emotion/core'
import facepaint from 'facepaint'
import { BREAKPOINTS } from '../../../Common/constants'

const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const NavClampReader = css`
  width: 100%;
`

const NavClampCollection = css`
  ${mq({ maxWidth: ['375px', '768px', '1152px', '1290px'] })};
`

export const NavClamp = styled('div')`
  width: 100%;
  ${props => (props.reader ? NavClampReader : NavClampCollection)};
  ${mq({ padding: ['0 20px 0 30px', '0 20px 0 30px', '0 40px'] })}
  height: 63px;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  box-sizing: border-box;
  display: grid;
`
