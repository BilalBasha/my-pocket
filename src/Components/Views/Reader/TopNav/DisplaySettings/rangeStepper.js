import React from 'react'
import styled from '@emotion/styled'
import { withLocalize } from 'react-localize-redux'
import PropTypes from 'prop-types'

const RangeStepperWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, 18px);
  padding: 0 6px;
  button {
    background: none;
    border: none;
    padding: 0px;
    height: 20px;
    overflow: hidden;
    &:focus {
      outline: none;
    }
    &:before {
      content: '.';
      position: relative;
      font-size: 37px;
      top: -22px;
      color: ${props => props.theme.settings.stepper.stepinactive};
      cursor: pointer;
    }
    &:hover {
      position: relative;
      right: 1px;
      top: 1px;
      &:before {
        font-size: 74px;
        top: -57px;
        color: ${props => props.theme.settings.stepper.stephover};
      }
    }
    &[data-index-number='${props => props.current}'] {
      position: relative;
      right: 1px;
      top: 1px;
      &:before {
        font-size: 74px;
        top: -57px;
        color: ${props => props.theme.settings.stepper.stepactive};
      }
    }
  }
`

FontSize.propTypes = {
  range: PropTypes.array,
  current: PropTypes.number,
  onChange: PropTypes.func
}
function FontSize({ range = [], current = 0, onChange = () => {} }) {
  const onStepClick = ({ target }) => {
    const dataIndex = target.getAttribute('data-index-number')
    onChange(parseInt(dataIndex))
  }
  const onKeyPress = () => {
    // TODO: a11y
  }
  return (
    <RangeStepperWrapper current={current} lastIndex={range.length - 1}>
      {range.map((step, index) => (
        <button
          key={index}
          data-index-number={index}
          onClick={onStepClick}
          onKeyPress={onKeyPress}
        />
      ))}
    </RangeStepperWrapper>
  )
}

export default withLocalize(FontSize)
