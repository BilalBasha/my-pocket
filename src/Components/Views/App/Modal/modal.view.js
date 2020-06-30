import React from 'react'
// import { disableScroll, enableScroll } from 'Common/helpers.js'
import { Modal } from '../../../Modules/Modal/modal'
import { ConfirmDeleteItemModal } from '../../../Modules/Items/item.delete.modal'
import { ReportItemModal } from '../../../Modules/ReportItem/reportItem.modal'
import { ConfirmDeleteTagModal } from '../../../../Components/Views/App/Sidebar/Tags/Tag/tag.delete.modal'
import { ShareSheetModal } from '../../../Modules/ShareSheet/shareSheet.modal'
import { TagModal } from '../../../Modules/Tagging/tag.modal'
import { WhatsNewModal } from '../../../Modules/WhatsNew/whatsNew.modal'
import { MODAL_TYPES } from '../../../../Containers/App/Modal/modal.state'

const {
  CONFIRM_REMOVE_FEED_ITEM,
  CONFIRM_DELETE_ITEM,
  CONFIRM_DELETE_TAG,
  SHARE_MODAL,
  TAG_MODAL,
  WHATS_NEW_MODAL
} = MODAL_TYPES

const modalContent = {
  [CONFIRM_REMOVE_FEED_ITEM]: ReportItemModal,
  [CONFIRM_DELETE_TAG]: ConfirmDeleteTagModal,
  [CONFIRM_DELETE_ITEM]: ConfirmDeleteItemModal,
  [SHARE_MODAL]: ShareSheetModal,
  [TAG_MODAL]: TagModal,
  [WHATS_NEW_MODAL]: WhatsNewModal
}

export class ModalView extends React.Component {
  componentWillMount() {
    const { modalType, cancelModal } = this.props
    const ModalContainer = modalContent[modalType]
    if (!ModalContainer) cancelModal()
  }

  componentDidMount() {
    // disableScroll()
  }

  componentWillUnmount() {
    // enableScroll()
  }

  render() {
    const { confirmModal, cancelModal, modalType, passed } = this.props
    const ModalContainer = modalContent[modalType]

    return ModalContainer ? (
      <Modal>
        <ModalContainer
          confirmModal={confirmModal}
          cancelModal={cancelModal}
          modalType={modalType}
          {...passed}
        />
      </Modal>
    ) : null
  }
}
