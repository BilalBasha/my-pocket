import React from 'react'
import { ConfirmDelete } from '../../../../../Modules/Modal/modal.confirm'
import { Translate, withLocalize } from 'react-localize-redux'

class ConfirmDeleteTagModalClass extends React.Component {
  render() {
    return (
      <ConfirmDelete {...this.props} operateOn="Tag">
        <h2>
          <Translate id="tagDelete.header">Are you sure?</Translate>
        </h2>
        <p>
          <Translate id="tagDelete.warning">
            Once you delete a tag, you can't undo it!
          </Translate>
        </p>
      </ConfirmDelete>
    )
  }
}

export const ConfirmDeleteTagModal = withLocalize(ConfirmDeleteTagModalClass)
