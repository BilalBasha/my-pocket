import React from 'react'
import styled from '@emotion/styled'
import { ItemTime } from './item.time'
import { ItemDomain } from '../Info/item.domain'

const DetailsWrapper = styled('div')`
  font-size: 0; /* Fight the extra inline padding */
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  display: flex;
  width: 100%;
  padding: 6px 0 0;
  justify-content: flex-start;
  align-items: center;
  color: ${props => props.theme.item.info.color};
`

export class ItemInfo extends React.Component {
  render() {
    const {
      has_video,
      word_count,
      videos,
      resolved_url,
      given_url,
      noLink,
      domain_metadata,
      onExternalLink
    } = this.props

    const timeEstimateProps = {
      word_count,
      has_video,
      videos
    }

    return (
      <DetailsWrapper>
        <ItemDomain
          onExternalLink={onExternalLink}
          domain_metadata={domain_metadata}
          resolved_url={resolved_url}
          given_url={given_url}
          noLink={noLink}
        />
        <ItemTime {...timeEstimateProps} />
      </DetailsWrapper>
    )
  }
}
