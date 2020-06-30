import React from 'react'
import styled from '@emotion/styled'
import { OverlayBase } from '../../Elements/Overlay/overlay'
import { Button } from '../../Elements/Buttons/button'
import { Translate, withLocalize } from 'react-localize-redux'

const ConfirmDeleteWrapper = styled('div')`
  ${OverlayBase};
  padding: 20px;
  h2 {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: ${({ theme }) => theme.modal.header.color};
  }
  p {
    margin: 10px 0 30px;
    color: ${({ theme }) => theme.modal.content.color};
  }
`

const ConfirmActions = styled('div')`
  display: flex;
  justify-content: flex-end;
`

class ConfirmDeleteClass extends React.Component {
  render() {
    const { confirmModal, cancelModal, operateOn, translate } = this.props
    return (
      <ConfirmDeleteWrapper>
        {this.props.children}
        <ConfirmActions>
          <Button
            type="neutral"
            onClick={cancelModal}
            data-tooltip={translate('modalConfirm.cancel')}
            aria-label={translate('modalConfirm.cancel')}>
            <Translate id="modalConfirm.cancel">Cancel</Translate>
          </Button>
          <Button
            type="warn"
            onClick={confirmModal}
            margin="0 0 0 15px"
            data-tooltip={translate('modalConfirm.delete', { type: operateOn })}
            aria-label={translate('modalConfirm.delete', { type: operateOn })}>
            <Translate id="modalConfirm.delete" data={{ type: operateOn }}>
              Delete {operateOn}
            </Translate>
          </Button>
        </ConfirmActions>
      </ConfirmDeleteWrapper>
    )
  }
}

export const ConfirmDelete = withLocalize(ConfirmDeleteClass)
