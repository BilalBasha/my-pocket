import React from 'react'
import { SizeChangeButton, IconWrapper, StepperWrapper } from '../../../../Elements/Stepper/stepperButtons'
import { Icon } from '../../../../Elements/Icons/icon'
import { FONT_RANGE } from '../../../../../Common/constants'
import { withLocalize } from 'react-localize-redux'
import RangeStepper from './rangeStepper'

function FontSize({ current, clickAction, translate }) {
  const range = FONT_RANGE

  const clickDecrease = () => {
    if (minusActive()) clickAction(current - 1)
  }

  const clickIncrease = () => {
    if (plusActive()) clickAction(current + 1)
  }

  const plusActive = () => current < range.length - 1
  const minusActive = () => current > 0

  return (
    <StepperWrapper>
      <IconWrapper className="icon-wrapper" data-tooltip={`${FONT_RANGE[current]}em`}>
        <Icon name="TextSize" type="solid" size="24px" />
      </IconWrapper>
      <SizeChangeButton
        active={minusActive()}
        onClick={clickDecrease}
        aria-label={translate('reader.displaySettings.minusSize')}
        data-tooltip={translate('reader.displaySettings.minusSize')}>
        <Icon name="Minus" type="mini" size="12px" />
      </SizeChangeButton>
      <RangeStepper current={current} range={FONT_RANGE} onChange={clickAction} />
      <SizeChangeButton
        active={plusActive()}
        onClick={clickIncrease}
        aria-label={translate('reader.displaySettings.plusSize')}
        data-tooltip={translate('reader.displaySettings.plusSize')}>
        <Icon name="Plus" type="mini" size="12px" />
      </SizeChangeButton>
    </StepperWrapper>
  )
}

export default withLocalize(FontSize)
