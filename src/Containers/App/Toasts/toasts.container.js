import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToastList } from '../../../Components/Modules/Toast/toast'
import { toastActions } from '../../../Containers/App/Toasts/toasts.state'

export class ToastContainer extends React.Component {
  render() {
    const { toasts, removeToast, hasToasts } = this.props
    return hasToasts ? (
      <ToastList delay="3000" list={toasts} removeToast={removeToast} />
    ) : null
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...toastActions }, dispatch)
}

function mapStateToProps(state) {
  const toasts = state.toasts
  const hasToasts = toasts ? Object.keys(toasts).length : false

  return {
    hasToasts,
    toasts
  }
}

export const Toasts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastContainer)
