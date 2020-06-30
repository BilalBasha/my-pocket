import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { modalActions } from './modal.state'
import { ModalView } from '../../../Components/Views/App/Modal/modal.view'

export class ModalContainer extends React.Component {
  render() {
    const {
      modalActive,
      modalType,
      cancelModal,
      confirmModal,
      passed
    } = this.props
    return modalActive ? (
      <ModalView
        confirmModal={confirmModal}
        cancelModal={cancelModal}
        modalType={modalType}
        passed={passed}
      />
    ) : null
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...modalActions }, dispatch)
}

function mapStateToProps(state) {
  return {
    modalType: state.modal.modalType,
    modalActive: state.modal.modalActive,
    passed: state.modal.passed
  }
}

export const Modal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer)
