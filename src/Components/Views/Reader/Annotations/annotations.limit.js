/* eslint  react/jsx-no-target-blank: 0*/
import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Translate, withLocalize } from 'react-localize-redux'
import { Illustration } from '../../../Elements/Illustrations/illustration'
import { ArrowLink } from '../../../Elements/ArrowLink/arrowlink'
import { MAX_ANNOTATIONS_DEFAULT } from '../../../../Common/constants'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../../Common/constants'
import handleViewport from 'react-in-viewport'

const UpsellElement = styled('div')`
  display: block;
`

const UpsellWrapper = styled('div')`
  font-family: 'Graphik Web';
  font-size: 16px;
  line-height: 22px;
  padding: 0 32px 40px;
`

const Paragraph = styled('p')`
  margin-bottom: 10px;
  color: ${props => props.theme.body.subcolor};
`

const NotifyOnScreenEnter = (props) => {
  const {
    forwardedRef,
    trackPremiumClick
  } = props

  return (
    <UpsellElement ref={forwardedRef}>
      <UpsellWrapper>
        <Paragraph>
          <Illustration name="Diamond" size="20px" margin="0 5px 0 0" />
          <Translate id="highlightLimit.header" data={{ MAX_ANNOTATIONS_DEFAULT }}>
            You’re limited to {MAX_ANNOTATIONS_DEFAULT} highlights per article.
          </Translate>{' '}
          <Translate id="highlightLimit.subheader">
            Pocket Premium members get unlimited highlights.
          </Translate>
        </Paragraph>
        <ArrowLink
          onClick={trackPremiumClick}
          href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.SIDE_ANNOTATIONS}`}
          target="_blank">
          <Translate id="highlightLimit.ctaNow">
            Upgrade now
          </Translate>
        </ArrowLink>
      </UpsellWrapper>
    </UpsellElement>
  )
}

const Upsell = handleViewport(NotifyOnScreenEnter)

class LimitNoticeClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shown: false
    }
  }

  sendTrackClick = (identifier) => {
    this.props.trackClick({
      view: 'web',
      section: '/premium',
      page: 'reader',
      identifier
    })
  }

  onEnterViewport = () => {
    if (!this.state.shown) {
      this.setState({ shown: true })
      this.sendTrackClick('view_ex_hlr_upsell')
    }
  }

  trackPremiumClick = () => {
    this.sendTrackClick('click_ex_hlr_upsell')
  }

  render() {
    return (
      <Upsell
        onEnterViewport={this.onEnterViewport}
        trackPremiumClick={this.trackPremiumClick} />
    )
  }
}

export const LimitNotice = withLocalize(LimitNoticeClass)
