/* eslint  react/jsx-no-target-blank: 0*/
import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Translate, withLocalize } from 'react-localize-redux'
import { Illustration } from '../../../Elements/Illustrations/illustration'
import { ArrowLink } from '../../../Elements/ArrowLink/arrowlink'
import { DivideHorizontal } from '../../../Elements/Divider/divider'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../../Common/constants'

const UpsellWrapper = styled('div')`
  font-family: 'Graphik Web';
  font-size: 14px;
  line-height: 130%;
  padding: 30px 18px 0;
`

const Heading = styled('h4')`
  font-weight: 500;
  margin: 0;
  color: ${props => props.theme.upsell.title};
`

const Paragraph = styled('p')`
  font-size: 14px;
  line-height: 130%;
  font-weight: 400;
  margin: 0 0 10px;
  color: ${props => props.theme.upsell.copy};
`

class SidebarUpsellClass extends Component {
  trackPremiumClick = (e) => {
    this.props.trackClick({
      view: 'web',
      section: '/premium',
      page: 'list',
      identifier: 'click_upsell_left_rail'
    })
  }

  render() {
    return (
      <React.Fragment>
        <DivideHorizontal margin="0 10px 0 18px" />
        <UpsellWrapper>
          <Heading>
            <Illustration name="Diamond" size="16px" margin="0 3px 0 0" />
            <Translate id="sideBar.upsell.title">
              Get the ultimate Pocket experience
            </Translate>{' '}
          </Heading>
          <Paragraph>
            <Translate id="sideBar.upsell.copy">
              Secure your saves and discover more features with Pocket Premium.
            </Translate>
          </Paragraph>
          <ArrowLink
            onClick={this.trackPremiumClick}
            margin="10px 0"
            href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.SIDEBAR}`}
            target="_blank">
            <Translate id="sideBar.upsell.cta">
              Upgrade
            </Translate>
          </ArrowLink>
        </UpsellWrapper>
      </React.Fragment>
    )
  }
}

export const SidebarUpsell = withLocalize(SidebarUpsellClass)
