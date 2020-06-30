import React from 'react'
import { Modal } from '../../Modules/Modal/modal'
import { WhatsNew } from './whatsNew'

export class WhatsNewModal extends React.Component {
  onClose = () => this.props.cancelModal()

  render() {
    return (
      <Modal cancel={this.props.cancelModal}>
        <WhatsNew
          onClose={this.onClose}
          version={this.props.version}
          notes={this.props.notes}
          isPremium={this.props.isPremium}
        />
      </Modal>
    )
  }
}
