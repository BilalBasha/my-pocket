import React from 'react'
import styled from '@emotion/styled'
import { Icon } from '../../../../Elements/Icons/icon'
import { Translate, withLocalize } from 'react-localize-redux'
import { buttonReset } from '../../../../Elements/Buttons/button'

const SaveWrapper = styled('button')`
  ${buttonReset};
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => (props.saved ? props.theme.brand.color : 'inherit')};
  &:hover {
    color: ${props =>
      props.saved ? props.theme.brand.hover : props.theme.body.link.hover};
  }
`

class ItemSaveClass extends React.Component {
  render() {
    const { saved, translate } = this.props
    return (
      <SaveWrapper
        onClick={this.props.onSaveClick}
        saved={saved}
        aria-label={
          saved
            ? translate('itemDiscover.save.saved.aria')
            : translate('itemDiscover.save.save.aria')
        }>
        {saved ? (
          <React.Fragment>
            <Icon type="solid" name="Save" size="24px" margin="0 8px 0 0" />
            <Translate id="itemDiscover.save.saved.copy">Saved</Translate>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Icon type="line" name="Save" size="24px" margin="0 8px 0 0" />
            <Translate id="itemDiscover.save.save.copy">Save</Translate>
          </React.Fragment>
        )}
      </SaveWrapper>
    )
  }
}

export const ItemSave = withLocalize(ItemSaveClass)
