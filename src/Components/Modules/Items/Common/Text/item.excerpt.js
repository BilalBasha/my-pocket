import React from 'react'
import styled from '@emotion/styled'

const ExcerptWrapper = styled('div')`
  font-size: 14px;
  line-height: 1.75em;
  color: ${props => props.theme.item.excerpt.color};
  padding-top: 0.4em;
  ${props => {
    return props.lines
      ? {
          maxHeight: `${1.75 * props.lines + 0.65}em`,
          overflow: 'hidden'
        }
      : null
  }};
`

export class ItemExcerpt extends React.Component {
  get clampLines() {
    const { lines, listMode } = this.props
    if (!lines) return false

    const isList = listMode === 'list'
    const lineCount = isList ? [2, 2, 1, 1] : [4, 3, 2, 2]
    const clampDefault = isList ? 1 : 2

    return lineCount[Math.ceil(lines)] || clampDefault
  }

  render() {
    const { listMode } = this.props
    const isList = listMode === 'list'

    return isList ? null : (
      <ExcerptWrapper lines={this.clampLines}>
        {this.props.excerpt}
      </ExcerptWrapper>
    )
  }
}
