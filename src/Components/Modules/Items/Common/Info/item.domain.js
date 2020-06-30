/* eslint  react/jsx-no-target-blank: 0*/
import React from 'react'
import styled from '@emotion/styled'
import { domainForUrl, urlWithPocketRedirect } from '../../../../../Common/helpers'

const DomainWrapper = styled('cite')`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  font-style: normal;
  max-width: 65%;
  a,
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${props => props.theme.item.info.color};
    text-decoration: none;
    &:hover {
      color: ${props =>
        props.noLink ? 'inherit' : props.theme.item.info.hover};
    }
  }
`

export class ItemDomain extends React.Component {
  render() {
    const {
      resolved_url,
      given_url,
      noLink,
      domain_metadata,
      onExternalLink
    } = this.props

    const domain = domain_metadata
      ? domain_metadata.name
      : domainForUrl(resolved_url)

    const url = given_url || resolved_url

    return domain ? (
      <DomainWrapper noLink={noLink}>
        {noLink ? (
          <span>{domain}</span>
        ) : (
          <a
            href={urlWithPocketRedirect(url)}
            style={{ cursor: 'pointer' }}
            target="_blank"
            onClick={onExternalLink}>
            {domain}
          </a>
        )}
      </DomainWrapper>
    ) : (
      <div />
    )
  }
}
