import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Icon } from '../../../../Elements/Icons/icon'
import { SIDEBAR_WIDTH } from '../../../../../Common/constants'

const FilterWrapper = styled('div')`
  margin-bottom: 10px;
  border-radius: 4px;
  display: block;
  border: 1px solid ${props => props.theme.form.border};
  padding: 0.3em 0.6em;
  width: 100%;
  position: relative;

  input {
    background-color: transparent;
    line-height: 24px;
    border-radius: 4px;
    padding: 0;
    font-size: 16px;
    color: ${props => props.theme.sidebar.tag.color};
    border: none;
    width: ${SIDEBAR_WIDTH - 43}px;
    &:focus {
      outline: none;
    }
  }
`

const IconWrapper = styled('span')`
  display: inline-block;
  margin-right: 4px;
  color: ${props => props.theme.sidebar.tag.color};
  svg {
    margin-top: -4px;
  }
`

export class TagFilter extends Component {
  render() {
    const { value, onFilterUpdate } = this.props
    return (
      <FilterWrapper>
        <IconWrapper>
          <Icon name="Search" type="solid" size="16px" />
        </IconWrapper>
        <input value={value} onChange={onFilterUpdate} />
      </FilterWrapper>
    )
  }
}
