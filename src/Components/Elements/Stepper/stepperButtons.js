import styled from '@emotion/styled'
import { buttonReset } from '../../Elements/Buttons/button'
import { TooltipBase } from '../../Elements/Tooltip/tooltip'

export const StepperWrapper = styled('div')`
  align-self: start;
  justify-self: start;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, auto);
  width: 100%;
  height: 63px;
  align-items: center;
  justify-content: center;
`

export const IconWrapper = styled('div')`
  ${TooltipBase};
  &.icon-wrapper[data-tooltip] {
    cursor: initial;
    padding: 0px 10px 0 0;
  }
`

export const SizeChangeButton = styled('button')`
  ${buttonReset};
  display: block;
  cursor: ${props => (props.active ? 'pointer' : 'initial')};
  color: ${props =>
    props.active
      ? props.theme.settings.stepper.buttoncolor
      : props.theme.settings.stepper.buttoncolorinactive};
  &:hover {
    background: ${props => props.active ? props.theme.settings.stepper.buttonbackgroundhover : 'transparent'};
    color: ${props =>
      props.active
        ? props.theme.settings.stepper.buttonhover
        : props.theme.settings.stepper.buttoncolorinactive};
  }
  border-radius: 50%;
  background-color: ${props => props.active ? props.theme.settings.stepper.buttonbackground: 'transparent'};
  padding: 4px 10px 8px;
  ${TooltipBase};
  &[data-tooltip] {
    z-index: unset;
  }
`