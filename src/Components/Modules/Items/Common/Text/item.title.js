import React from 'react'
import styled from '@emotion/styled'
import { withSizes } from '../../../../../Components/Modules/Sizes/sizes.hoc'

const TitleWrapper = styled('div')`
  padding: 0;
  overflow: hidden;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  display: -webkit-box;
  max-lines: ${props => props.titleClamp};
  block-overflow: ellipsis;
  -webkit-line-clamp: ${props => props.titleClamp};
  -webkit-box-orient: vertical;
`

class ItemTitleClass extends React.PureComponent {
  render() {
    const {
      title,
      given_title,
      resolved_title,
      resolved_url,
      given_url,
      TITLE_SIZE,
      TITLE_LINE,
      TITLE_MAX,
      TITLE_CLAMP
    } = this.props

    return (
      <TitleWrapper
        ref={node => (this.titleNode = node)}
        titleClamp={TITLE_CLAMP}
        style={{
          fontSize: TITLE_SIZE + 'px',
          lineHeight: TITLE_LINE + 'em',
          maxHeight: TITLE_MAX + 'em'
        }}>
        {title || resolved_title || given_title || resolved_url || given_url}
      </TitleWrapper>
    )
  }
}
export const ItemTitle = withSizes(ItemTitleClass)
