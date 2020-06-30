import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { buttonReset } from '../Buttons/button'
import { Icon } from '../../Elements/Icons/icon'

export const TagBase = props => css`
  border-radius: 4px;
  display: inline-flex;
  align-content: center;
  align-items: center;
  line-height: 24px;
  height: 24px;
  padding: 0 0.5em;
  position: relative;
  white-space: nowrap;
  font-weight: 400;
  font-size: 16px;
  user-select: none;
  margin: ${props.margin ? props.margin : 0};
`

const TagWrapper = styled('div')`
  ${TagBase};
  text-transform: lowercase;
  max-width: 100%;
  overflow: hidden;
  vertical-align: bottom;
  cursor: ${({ action }) => (action ? 'pointer' : 'initial')};
  background-color: ${({ theme, selected }) =>
    selected ? theme.tags.tag.selected.background : theme.tags.tag.background};
  color: ${({ theme, selected }) =>
    selected ? theme.tags.tag.selected.color : theme.tags.tag.color};
  border: ${({ theme, selected }) =>
    selected ? theme.tags.tag.selected.border : theme.tags.tag.border};
  &:hover {
    color: ${({ theme, selected }) =>
      selected
        ? theme.tags.tag.selected.hover.color
        : theme.tags.tag.hover.color};
    background-color: ${({ theme, selected }) =>
      selected
        ? theme.tags.tag.selected.hover.background
        : theme.tags.tag.hover.background};
    border: ${({ theme, selected }) =>
      selected
        ? theme.tags.tag.selected.hover.border
        : theme.tags.tag.hover.border};
  }
`

const Close = styled('button')`
  ${buttonReset};
  cursor: pointer;
  margin-left: 8px;
  margin-top: 2px;
  line-height: 0;
  height: 10px;
  &:hover {
    color: ${({ theme, selected }) =>
      selected
        ? theme.tags.tag.selected.hover.color
        : theme.tags.tag.hover.color};
  }
`

export class Tag extends React.Component {
  constructor(props) {
    super(props)

    this.removeClick = () => {
      const { removeClick, children } = props
      if (removeClick) removeClick(children)
    }

    this.selectClick = () => {
      const { selectClick, children } = props
      if (selectClick) selectClick(children)
    }
  }

  render() {
    const { children, removeClick, selected, action, margin } = this.props
    return (
      <TagWrapper
        margin={margin}
        onClick={this.selectClick}
        selected={selected}
        action={action}>
        {children}
        {removeClick ? (
          <Close selected={selected} onClick={this.removeClick}>
            <Icon name="CloseX" type="mini" size="10px" />
          </Close>
        ) : null}
      </TagWrapper>
    )
  }
}

export const SuggestedTag = styled('div')`
  ${TagBase};
  cursor: pointer;
  background-color: ${({ theme }) => theme.tags.suggested.background};
  color: ${({ theme }) => theme.tags.suggested.color};
  border: 1px solid ${({ theme }) => theme.tags.suggested.border};
  &:hover {
    color: ${({ theme }) => theme.tags.suggested.hover.color};
    background-color: ${({ theme }) => theme.tags.suggested.hover.background};
    border: 1px solid ${({ theme }) => theme.tags.suggested.hover.border};
  }
`

const BadgeWrapper = styled('div')`
  ${buttonReset};
  ${TagBase};
  padding: 0 5px;
  width: 24px;
  margin: ${props => (props.margin ? props.margin : null)};
  justify-content: center;
`

const FavoriteWrapper = styled(BadgeWrapper)`
  background-color: ${({ theme }) => theme.tags.favorite.background};
  color: ${({ theme }) => theme.tags.favorite.color};
`

const WebOnlyWrapper = styled(BadgeWrapper)`
  background-color: ${({ theme }) => theme.tags.webOnly.background};
  color: ${({ theme }) => theme.tags.webOnly.color};
`

export function Favorite({ margin }) {
  return (
    <FavoriteWrapper margin={margin}>
      <Icon name="FavoriteBadge" type="mini" size="14px" />
    </FavoriteWrapper>
  )
}

const HighlightWrapper = styled('div')`
  ${buttonReset};
  ${TagBase};
  margin: ${props => (props.margin ? props.margin : null)};
  background-color: ${({ theme }) => theme.tags.highlight.background};
  color: ${({ theme }) => theme.tags.highlight.icon};
  span {
    color: ${({ theme }) => theme.tags.highlight.color};
    padding-left: 4px;
  }
`
export function HighlightsTag({ count, margin }) {
  return (
    <HighlightWrapper margin={margin}>
      <Icon name="Highlights" type="mini" size="13px" />
      <span>{count}</span>
    </HighlightWrapper>
  )
}

export function WebOnly({ margin }) {
  return (
    <WebOnlyWrapper margin={margin}>
      <Icon name="WebView" type="solid" size="13px" />
    </WebOnlyWrapper>
  )
}

export const TrendingTag = styled('div')`
  ${buttonReset};
  ${TagBase};
  background-color: ${({ theme }) => theme.tags.trending.background};
  color: ${({ theme }) => theme.tags.trending.color};
`

export const BulkSelectTag = styled(TrendingTag)``

export const BestOfTag = styled('div')`
  ${buttonReset};
  ${TagBase};
  background-color: ${({ theme }) => theme.tags.bestOf.background};
  color: ${({ theme }) => theme.tags.bestOf.color};
`
