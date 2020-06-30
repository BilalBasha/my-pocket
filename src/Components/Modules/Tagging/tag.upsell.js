/* eslint  react/jsx-no-target-blank: 0*/
import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Translate, withLocalize } from 'react-localize-redux'
import { Illustration } from '../../Elements/Illustrations/illustration'
import { ArrowLink } from '../../Elements/ArrowLink/arrowlink'
import { DivideHorizontal } from '../../Elements/Divider/divider'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../Common/constants'

const UpsellWrapper = styled('div')`
  font-family: 'Graphik Web';
  font-size: 16px;
  font-weight: 500;
  line-height: 130%;
  padding: 25px 0 26px;
`

const Paragraph = styled('p')`
  line-height: 130%;
  font-weight: 400;
  margin: 0px;
  color: ${props => props.theme.upsell.title};
  svg {
    width: 19px;
    height: 17.5px;
    margin-right: 5px;
  }
`

class TagUpsell extends Component {
  componentDidMount() {
    this.sendTrackClick('view_suggested_tag_upsell')
  }

  sendTrackClick = (identifier) => {
    let page = (window.location.pathname.indexOf('/read/') !== -1)
      ? 'reader'
      : 'list'

    this.props.trackClick({
      view: 'web',
      section: '/premium',
      identifier,
      page
    })
  }

  trackPremiumClick = () => {
    this.sendTrackClick('click_suggested_tag_upsell')
  }

  render() {
    return (
      <React.Fragment>
        <DivideHorizontal margin='17px 0 0 0' />
        <UpsellWrapper>
          <Paragraph>
            <Illustration name='Diamond' />
            <Translate id='tagging.upsell.message'>
              Tag stories faster than ever—get tag suggestions with.
            </Translate>
          </Paragraph>
          <ArrowLink
            onClick={this.trackPremiumClick}
            margin='10px 0'
            href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.SUGGESTED_TAGS}`}
            target='_blank'>
            <Translate id='tagging.upsell.cta'>Pocket Premium</Translate>
          </ArrowLink>
        </UpsellWrapper>
      </React.Fragment>
    )
  }
}

export default withLocalize(TagUpsell)
