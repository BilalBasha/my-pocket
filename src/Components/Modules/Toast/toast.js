import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Icon } from '../../Elements/Icons/icon'
import { ZINDEX } from '../../../Common/constants'
import { Translate, withLocalize } from 'react-localize-redux'

import { API_ACTION_ADD } from '../../../actions'
import { API_ACTION_ADD_FAIL } from '../../../actions'
import { API_ACTION_ARCHIVE } from '../../../actions'
import { API_ACTION_READD } from '../../../actions'
import { API_ACTION_DELETE } from '../../../actions'
import { API_ACTION_REPLACE_TAGS } from '../../../actions'
import { API_ACTION_ADD_TAGS } from '../../../actions'
import { API_ACTION_RECOMMEND } from '../../../actions'
import { API_ACTION_SHARE } from '../../../actions'
import { TOAST_ITEM_NOT_IN_LIST } from '../../../actions'

export const ToastContainer = styled('div')`
  position: fixed;
  bottom: 30px;
  left: 45px;
  right: 0;
  width: 100%;
  z-index: ${ZINDEX.toast};
`

const ToastWrapper = styled('div')`
  text-align: left;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  transform: translateZ(0.01);
`

const ToastBlock = styled('div')`
  display: inline-grid;
  grid-template-columns: auto 16px;
  gap: 16px;
  align-content: center;
  align-items: center;
  font-weight: 500;
  line-height: 22px;
  font-size: 16px;
  text-align: left;
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0 0 0;
  min-width: 275px;
  border-radius: 4px;
  background-color: ${({ theme, type }) => theme.toast[type].background};
  color: ${({ theme, type }) => theme.toast[type].color};
  transition: all 400ms ease;
  opacity: 0;
  z-index: ${ZINDEX.toast};
`

const AnimateIn = {
  opacity: 1
}

const AnimateOut = {
  opacity: 0,
  transform: 'translateY(50%)'
}

const CloseWrapper = styled('div')`
  cursor: pointer;
  justify-self: end;
`

class ToastListClass extends Component {
  getToastMessage(action, count) {
    switch (action) {
      case API_ACTION_ADD: {
        return <Translate id="toasts.addUrl">Saved to Pocket</Translate>
      }

      case API_ACTION_ADD_FAIL: {
        return <Translate id="toasts.addUrlFailed">Unable to Save</Translate>
      }

      case API_ACTION_ARCHIVE: {
        return <Translate id="toasts.archive">Archived</Translate>
      }

      case API_ACTION_READD: {
        return <Translate id="toasts.reAdd">Added to List</Translate>
      }

      case API_ACTION_DELETE: {
        return <Translate id="toasts.delete">Deleted</Translate>
      }

      case API_ACTION_REPLACE_TAGS:
      case API_ACTION_ADD_TAGS: {
        if (count > 1) {
          return <Translate id="toasts.tagAdded">Tag updated</Translate>
        }
        return <Translate id="toasts.tagsAdded">Tags updated</Translate>
      }

      case API_ACTION_SHARE: {
        return <Translate id="toasts.sent">Sent</Translate>
      }

      case API_ACTION_RECOMMEND: {
        return <Translate id="toasts.recommended">Sent</Translate>
      }

      case TOAST_ITEM_NOT_IN_LIST: {
        return (
          <Translate id="toasts.notInList">
            This item cannot be found in your list
          </Translate>
        )
      }

      default:
        break
    }
  }

  buildToast = (list, key) => {
    const message = this.getToastMessage(list[key].apiAction, list[key].length)
    const { removeToast, delay } = this.props
    return message ? (
      <Toast
        type={list[key].type}
        toastKey={key}
        key={key}
        delay={delay}
        removeToast={removeToast}
        remove={list[key].remove}>
        {message}
      </Toast>
    ) : null
  }

  render() {
    const { list } = this.props

    return (
      <ToastContainer>
        {Object.keys(list)
          .reverse()
          .map(key => this.buildToast(list, key))}
      </ToastContainer>
    )
  }
}

export const ToastList = withLocalize(ToastListClass)

class Toast extends Component {
  constructor(props) {
    super(props)
    this.state = { mounted: true, toastStyle: {} }
  }

  unMountStyle = () => {
    this.setState({ toastStyle: AnimateOut, mounted: false })
  }

  mountStyle = () => {
    this.setState({ toastStyle: AnimateIn })
  }

  transitionEnd = () => {
    if (!this.state.mounted) this.remove()
  }

  remove = () => {
    this.props.removeToast(this.props.toastKey)
  }

  componentDidMount() {
    const { delay = 5000 } = this.props
    this.mountTimeout = setTimeout(this.mountStyle, 20)
    this.unMountTimeout = setTimeout(this.unMountStyle, delay)
  }

  componentWillUnmount() {
    if (this.mountTimeout) clearTimeout(this.mountTimeout)
    if (this.unMountTimeout) clearTimeout(this.unMountTimeout)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.remove !== this.props.remove && nextProps.remove) {
      this.remove()
    }
  }

  render() {
    return (
      <ToastWrapper>
        <ToastBlock
          type={this.props.type}
          style={this.state.toastStyle}
          onTransitionEnd={this.transitionEnd}>
          <div>{this.props.children}</div>

          <CloseWrapper onClick={this.unMountStyle}>
            <Icon name="CloseX" type="mini" size="12px" />
          </CloseWrapper>
        </ToastBlock>
      </ToastWrapper>
    )
  }
}
