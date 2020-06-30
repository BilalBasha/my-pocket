import React from 'react'
import { ConfirmDelete } from '../../Modules/Modal/modal.confirm'
import { Translate, withLocalize } from 'react-localize-redux'

export class ConfirmDeleteItemModalClass extends React.Component {
  render() {
    return (
      <ConfirmDelete {...this.props} operateOn="">
        {this.props.plural ? (
          <React.Fragment>
            <h2>
              <Translate id="itemDelete.plural.header">Delete Items</Translate>
            </h2>
            <p>
              <Translate id="itemDelete.plural.warning">
                Are you sure you want to delete these items? This cannot be
                undone.
              </Translate>
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>
              <Translate id="itemDelete.single.header">Delete Item</Translate>
            </h2>
            <p>
              <Translate id="itemDelete.single.warning">
                Are you sure you want to delete this item? This cannot be
                undone.
              </Translate>
            </p>
          </React.Fragment>
        )}
      </ConfirmDelete>
    )
  }
}

export const ConfirmDeleteItemModal = withLocalize(ConfirmDeleteItemModalClass)
