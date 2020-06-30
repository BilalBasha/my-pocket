import styled from '@emotion/styled'

export const ListWrapper = styled('div')`
  padding-left: 10px;
`

export const ListBlock = styled('div')`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: ${props =>
    props.columns === 1 ? '1fr' : '1fr 1fr 1fr'};
  grid-template-rows: repeat(auto-fit, ${props => props.item_height}px);
  justify-content: flex-start;
  position: relative;
  &.scrolling {
    pointer-events: none;
  }
`

export const Ruler = styled('div')`
  position: absolute;
  height: 100vh;
  width: 1px;
  opacity: 0;
  pointer-events: none;
`
