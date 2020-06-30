import React from 'react'
import { Icon } from '../../../../Elements/Icons/icon'
import { COLUMN_WIDTH_RANGE } from '../../../../../Common/constants'
import { withLocalize } from 'react-localize-redux'
import RangeStepper from './rangeStepper'
import { SizeChangeButton, IconWrapper, StepperWrapper } from '../../../../Elements/Stepper/stepperButtons'

function ColumnWidths({ current, clickAction, translate }) {
  const range = COLUMN_WIDTH_RANGE

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
      <IconWrapper className="icon-wrapper" data-tooltip={`${COLUMN_WIDTH_RANGE[current]}px`}>
        <Icon name="ColumnWidths" type="line" size="24px" />
      </IconWrapper>
      <SizeChangeButton
        active={minusActive()}
        onClick={clickDecrease}
        data-tooltip={translate('reader.displaySettings.minusColumnWidth')}>
        <Icon name="Minus" type="mini" size="12px" />
      </SizeChangeButton>
      <RangeStepper current={current} range={COLUMN_WIDTH_RANGE} onChange={clickAction} />
      <SizeChangeButton
        active={plusActive()}
        onClick={clickIncrease}
        data-tooltip={translate('reader.displaySettings.plusColumnWidth')}>
        <Icon name="Plus" type="mini" size="12px" />
      </SizeChangeButton>
    </StepperWrapper>
  )
}

export default withLocalize(ColumnWidths)
