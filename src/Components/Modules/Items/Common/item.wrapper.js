import styled from '@emotion/styled'
import { css } from '@emotion/core'

export const ItemContent = styled('div')`
  ${props => (props.noLink ? { userSelect: 'none' } : '')};
`

const ItemStyleGrid = props => css`
  min-width: 33.33%;
  display: flex;
  flex-direction: column;
`

const ItemStyleList = props => css`
  min-width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`

export const ItemWrapper = styled('article')`
  ${props => (props.listMode === 'list' ? ItemStyleList : ItemStyleGrid)};
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  box-sizing: border-box;
  height: ${props => props.itemHeight}px;
  background-color: ${props =>
    props.bulkEditSelected || props.shortcutSelected
      ? props.theme.item.bulk.selected
      : 'transparent'};
  border-radius: 4px;
  a {
    text-decoration: none;
    color: ${props => props.theme.item.link.color};
    &:hover {
      color: ${props => props.theme.item.link.hover.color};
    }
  }
`
