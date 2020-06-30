/* eslint  react/jsx-no-target-blank: 0*/
import React from 'react'
import styled from '@emotion/styled'
import { FONT_DEFAULTS } from '../../../../Common/constants'
import { TagList } from '../../../Modules/TagsList/tags'
import { domainForUrl, urlWithPocketRedirect } from '../../../../Common/helpers'
import { getItemTime } from '../../../../Common/helpers'
import { Translate, withLocalize } from 'react-localize-redux'

/* COMPONENTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const HeaderWrapper = styled('header')`
  font-family: ${FONT_DEFAULTS['sans'].family};
  padding: 0 40px 1em;
  line-height: ${props => props.lineHeight};
`

const ArticleTitle = styled('h1')`
  font-size: 40px;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
  padding-bottom: 0.625em;
  margin: 0;
  color: ${props => props.theme.article.header};
`

const ArticleInfo = styled('div')`
  color: ${props => props.theme.article.subHeader};
  display: block;
  text-align: center;
  font-weight: 300;
  font-size: 18px;
  line-height: 1;
  padding-bottom: 1em;
`

const ByWrapper = styled('div')`
  display: inline-block;
`

const AuthorWrapper = styled('div')`
  position: relative;
  display: inline-block;
  &:after {
    position: relative;
    font-size: 0.5em;
    content: '•';
    margin-left: 0.7em;
    top: -0.3em;
  }
`

const DomainWrapper = styled('div')`
  position: relative;
  display: inline-block;
  margin-left: 0.4em;
`

const TimeWrapper = styled('div')`
  position: relative;
  display: inline-block;
  margin-left: 0.4em;
  &:before {
    position: relative;
    font-size: 0.5em;
    content: '•';
    margin-right: 0.7em;
    top: -0.3em;
  }
`
const PocketInfo = styled('div')`
  text-align: center;
  font-size: 18px;
`
const ViewOriginal = styled('a')`
  display: block;
  font-size: 18px;
  line-height: 1;
  padding-bottom: 0.75em;
  text-decoration: none;
  color: ${props => props.theme.body.link.color};
  &:hover {
    color: ${props => props.theme.body.link.hover};
    text-decoration: underline;
  }
`

const AuthorNoLink = styled('span')`
  font-weight: 400;
  color: ${props => props.theme.article.subHeader};
`

const TagsWrapper = styled('div')`
  padding: 0 0 20px;
`

/* UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function listAuthors(authors) {
  if (!authors) return
  return Object.keys(authors).map(authorKey => {
    const current = authors[authorKey]
    return <AuthorNoLink key={authorKey}>{current.name}</AuthorNoLink>
  })
}

/* EXPORTED COMPONENT
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class ItemHeaderClass extends React.Component {
  render() {
    const {
      authors,
      given_title,
      resolved_title,
      resolved_url,
      given_url,
      tags,
      has_video,
      word_count,
      videos
    } = this.props.item

    const timeEstimateProps = {
      word_count,
      has_video,
      videos
    }

    const authorList = listAuthors(authors)
    const domain = domainForUrl(resolved_url)
    const timeDisplay = getItemTime(timeEstimateProps, true)

    return (
      <HeaderWrapper lineHeight={this.props.lineHeight}>
        <ArticleTitle>{resolved_title || given_title}</ArticleTitle>

        <ArticleInfo>
          <ByWrapper>
            <Translate id="reader.header.by">By</Translate>
          </ByWrapper>{' '}
          {authorList ? <AuthorWrapper>{authorList}</AuthorWrapper> : null}
          {domain && <DomainWrapper>{domain}</DomainWrapper>}
          {timeDisplay && <TimeWrapper>{timeDisplay}</TimeWrapper>}
        </ArticleInfo>

        <PocketInfo>
          <ViewOriginal href={urlWithPocketRedirect(given_url)} target="_blank">
            <Translate id="reader.header.viewOriginal">View Original</Translate>
          </ViewOriginal>
          {tags && (
            <TagsWrapper>
              <TagList tags={tags} noWrap="true" />
            </TagsWrapper>
          )}
        </PocketInfo>
      </HeaderWrapper>
    )
  }
}

export const ItemHeader = withLocalize(ItemHeaderClass)
