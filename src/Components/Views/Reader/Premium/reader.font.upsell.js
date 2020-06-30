/* eslint  react/jsx-no-target-blank: 0*/
import React, { Component } from 'react'
import styled from '@emotion/styled'
import { OverlayBase } from '../../../../Components/Elements/Overlay/overlay'
import { ZINDEX } from '../../../../Common/constants'
import { ButtonLink } from '../../../Elements/Buttons/button'
import { Icon } from '../../../Elements/Icons/icon'
import { BREAKPOINTS } from '../../../../Common/constants'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../../Common/constants'
import { Translate, withLocalize } from 'react-localize-redux'

import facepaint from 'facepaint'

const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const PremiumFontUpsellWrapper = styled('div')`
  ${OverlayBase};
  position: fixed;
  top: 103px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  z-index: ${ZINDEX.upsell};
  font-size: 14px;

  align-content: center;
  align-items: center;
  grid-template-columns: 48px auto;
  grid-row-gap: 2em;
  grid-column-gap: 0;
  ${mq({
    display: ['grid', 'flex'],
    width: ['90%', '595px'],
    justifyContent: ['initial', 'space-between']
  })};
  h5 {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 5px;
  }
  p {
    margin: 0;
  }
  .cta {
    grid-column: 1/-1;
    ${mq({
      textAlign: ['center', 'right']
    })};
    a {
      ${mq({
        width: ['100%', 'initial']
      })};
    }
  }
`

const IconBlock = styled('div')`
  color: ${props => props.theme.settings.premium.color};
  margin-right: 8px;
`

const PremiumFontUpsellCopy = styled('div')`
  padding-right: 25px;
`

class PremiumFontUpsellClass extends Component {
  render() {
    const { fontFamily, translate } = this.props
    return (
      <PremiumFontUpsellWrapper maxWidth={this.props.maxWidth}>
        <IconBlock>
          <Icon name="Premium" type="line" size="24px" margin="0 8px 0 0" />
        </IconBlock>
        <PremiumFontUpsellCopy>
          <h5>
            <Translate
              id="reader.premiumFontUpsell.header"
              data={{ fontFamily }}>
              You are previewing the premium font ${fontFamily}.
            </Translate>
          </h5>
          <p>
            <Translate id="reader.premiumFontUpsell.copy">
              Get access to all fonts and more by upgrading to Premium.
            </Translate>
          </p>
        </PremiumFontUpsellCopy>
        <div className="cta">
          <ButtonLink
            href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.FONT}`}
            aria-label={translate('reader.premiumFontUpsell.upgrade')}
            target="_blank"
            type="cta">
            <Translate id="reader.premiumFontUpsell.upgrade">Upgrade</Translate>
          </ButtonLink>
        </div>
      </PremiumFontUpsellWrapper>
    )
  }
}

export const PremiumFontUpsell = withLocalize(PremiumFontUpsellClass)
