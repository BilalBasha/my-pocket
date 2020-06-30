import React from 'react'
import { Icon } from '../../../../Elements/Icons/icon'
import { LINE_HEIGHT_RANGE } from '../../../../../Common/constants'
import { withLocalize } from 'react-localize-redux'
import RangeStepper from './rangeStepper'
import { SizeChangeButton, IconWrapper, StepperWrapper } from '../../../../Elements/Stepper/stepperButtons'

function LineHeight({ current, clickAction, translate }) {
  const range = LINE_HEIGHT_RANGE

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
      <IconWrapper className="icon-wrapper" data-tooltip={`${LINE_HEIGHT_RANGE[current]}em`}>
        <Icon name="LetterSpacing" type="line" size="24px" />
      </IconWrapper>
      <SizeChangeButton
        active={minusActive()}
        onClick={clickDecrease}
        aria-label={translate('reader.displaySettings.minusLineHeight')}
        data-tooltip={translate('reader.displaySettings.minusLineHeight')}>
        <Icon name="Minus" type="mini" size="12px" />
      </SizeChangeButton>
      <RangeStepper current={current} range={LINE_HEIGHT_RANGE} onChange={clickAction} />
      <SizeChangeButton
        active={plusActive()}
        onClick={clickIncrease}
        aria-label={translate('reader.displaySettings.plusLineHeight')}
        data-tooltip={translate('reader.displaySettings.plusLineHeight')}>
        <Icon name="Plus" type="mini" size="12px" />
      </SizeChangeButton>
    </StepperWrapper>
  )
}

export default withLocalize(LineHeight)
