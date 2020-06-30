/* eslint  react/jsx-no-target-blank: 0*/
import React, { Component } from 'react'
import styled from '@emotion/styled'
import { ButtonLink } from '../../../Elements/Buttons/button'
import { ArrowLink } from '../../../Elements/ArrowLink/arrowlink'
import { Illustration } from '../../../Elements/Illustrations/illustration'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../../Common/constants'
import { COLUMN_WIDTH_RANGE, READER_PADDING } from '../../../../Common/constants'
import { Translate, withLocalize } from 'react-localize-redux'
import facepaint from 'facepaint'
import handleViewport from 'react-in-viewport'

const breakpoints = [650]
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

const CopyToIllustrationsMap = {
  library: "Library",
  search: "Search",
  focused: "Focused",
  type: "Type",
  features: "BigDiamond",
  highlights: "Highlight",
  tags: "Tags"
}

const Bordered = styled('div')`
  border-top: 2px solid ${props => props.theme.settings.premium.border};
`

const UpsellWrapper = styled('div')`
  max-width: ${props => props.width + (READER_PADDING * 2)}px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mq({ padding: ['30px 40px', '60px 40px'] })};
  font-family: 'Graphik Web';
`

const IllustrationWrapper = styled('div')`
  width: 70px;
  min-width: 70px;
`

const CopyWrapper = styled('div')`
  ${mq({ margin: ['0 0 0 30px', '0 30px'] })};
`

const ButtonWrapper = styled('div')`
  ${mq({ display: ['none', 'block'] })};
  a {
    min-width: 180px;
    display: inline-block;
    text-align: center;
    padding: 12px 18px;
  }
`

const Heading = styled('h5')`
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  margin: 0 0 5px;
  color: ${props => props.theme.upsell.title};
  ${mq({ display: ['none', 'block'] })};
`

const Paragraph = styled('p')`
  ${mq({
    display: ['none', 'block']
  })};
  font-size: 16px;
  line-height: 24px;
  margin: 0;
  color: ${props => props.theme.upsell.subCopy};
`

const ParagraphSmall = styled('p')`
  ${mq({
    display: ['block', 'none']
  })};
  font-size: 16px;
  line-height: 22px;
  margin: 0;
  color: ${props => props.theme.upsell.copy};
  a {
    white-space: nowrap
  }
`

const NotifyOnScreenEnter = (props) => {
  const {
    translate,
    itemToShow,
    forwardedRef,
    onButtonClick,
    columnWidth
  } = props

  let clickedTextFull = translate(`reader.premiumBottomUpsell.${itemToShow}.copy`)
  let clickedTextSmall = translate(`reader.premiumBottomUpsell.${itemToShow}.copySm`)

  return (
    <UpsellWrapper
      ref={forwardedRef}
      width={COLUMN_WIDTH_RANGE[columnWidth]}>
      <IllustrationWrapper>
        <Illustration name={CopyToIllustrationsMap[itemToShow]} size="100%" />
      </IllustrationWrapper>
      <CopyWrapper>
        <Heading>
          <Translate id={`reader.premiumBottomUpsell.${itemToShow}.title`} />
        </Heading>
        <Paragraph>
          <Translate id={`reader.premiumBottomUpsell.${itemToShow}.copy`} />
        </Paragraph>
        <ParagraphSmall>
          <Translate id={`reader.premiumBottomUpsell.${itemToShow}.copySm`} />
          {' '}
          <ArrowLink
            onClick={() => onButtonClick(clickedTextSmall)}
            href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.READER}`}
            target='_blank'>
            <Translate id='upsell.pocketPremium'>Pocket Premium</Translate>
          </ArrowLink>
        </ParagraphSmall>
      </CopyWrapper>

      <ButtonWrapper>
        <ButtonLink
          onClick={() => onButtonClick(clickedTextFull)}
          href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.READER}`}
          aria-label={translate('upsell.upgrade')}
          target="_blank"
          type="upgrade">
          <Translate id="upsell.upgrade">Upgrade</Translate>
        </ButtonLink>
      </ButtonWrapper>
    </UpsellWrapper>
  )
}

const Upsell = handleViewport(NotifyOnScreenEnter)

class ReaderBottomUpsellClass extends Component {
  constructor(props) {
    super(props)

    let tmpArray = Object.keys(CopyToIllustrationsMap)
    this.state = {
      itemToShow: tmpArray[Math.floor(Math.random() * tmpArray.length)],
      shown: false
    }
  }

  sendTrackClick = (identifier, clickedText) => {
    this.props.trackClick({
      view: 'web',
      section: '/premium',
      page: 'reader',
      page_params: clickedText,
      identifier
    })
  }

  onEnterViewport = () => {
    if (!this.state.shown) {
      this.setState({ shown: true })
      let clickedTextFull = this.props.translate(`reader.premiumBottomUpsell.${this.state.itemToShow}.copy`)
      let clickedTextSmall = this.props.translate(`reader.premiumBottomUpsell.${this.state.itemToShow}.copySm`)
      let clickedText = (window.innerWidth < breakpoints[0]) ? clickedTextSmall : clickedTextFull

      this.sendTrackClick('view_bottom_reader_upsell', clickedText)
    }
  }

  onButtonClick = (clickedText) => {
    this.sendTrackClick('click_bottom_reader_upsell', clickedText)
  }

  render() {
    const { translate, columnWidth } = this.props
    const { itemToShow } = this.state

    return (
      <Bordered>
        <Upsell
          columnWidth={columnWidth}
          translate={translate}
          itemToShow={itemToShow}
          onEnterViewport={this.onEnterViewport}
          onButtonClick={this.onButtonClick}
        />
      </Bordered>
    )
  }
}

export const ReaderBottomUpsell = withLocalize(ReaderBottomUpsellClass)
