import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { ShareMenu } from '../../../Modules/ShareMenu/shareMenu'
import { Menu } from '../../../Elements/Menu/menu'
import { ZINDEX } from '../../../../Common/constants'
import { ANALYTICS_KEYS } from '../../../../Common/constants'
import { FONT_DEFAULTS } from '../../../../Common/constants'
import { withLocalize } from 'react-localize-redux'
const { UI, VIEW } = ANALYTICS_KEYS

const Positioning = styled('div')`
  position: absolute;
  z-index: 2;
  padding: 10px;
  top: 0;
  left: 0;
  right: ${props => props.right}px;
  bottom: ${props => props.bottom}px;
  transform: translate(${props => props.left}px, ${props => props.top}px);
  margin-top: -30px;
  margin-left: -30px;
  opacity: 0;
  transition: opacity 200ms ease-in-out 350ms;
  &.visible,
  &:hover {
    opacity: 1;
    transition: opacity 150ms ease-in-out 0ms;
  }
`

const MenuWrapper = styled('div')`
  font-family: ${FONT_DEFAULTS['sans'].family};
`

const PopoverDown = props => css`
  position: absolute;
  right: 0;
  z-index: ${ZINDEX.item.menu};
  top: 0;
`

const PopoverDownRight = props => css`
  position: absolute;
  left: 0;
  z-index: ${ZINDEX.item.menu};
  top: 0;
`

const PopoverUp = props => css`
  position: absolute;
  right: 0;
  z-index: ${ZINDEX.item.menu};
  bottom: 0;
`

const PopoverUpRight = props => css`
  position: absolute;
  left: 0;
  z-index: ${ZINDEX.item.menu};
  bottom: 0;
`

export class PositionedAnnotationMenu extends Component {
  render() {
    const { top, left, visible } = this.props
    return (
      <Positioning top={top} left={left} className={visible ? 'visible' : ''}>
        <AnnotationMenu {...this.props} />
      </Positioning>
    )
  }
}

class AnnotationMenuClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      share: false,
      hover: false
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.isClickOutside)
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout)
    document.removeEventListener('mousedown', this.isClickOutside)
  }

  isClickOutside = e => {
    if (!this.contentNode.contains(e.target)) {
      this.closeMenu()
    }
  }

  itemHoverOn = () => {
    clearTimeout(this.timeout)
    this.setState({ hover: true })
  }

  itemHoverOff = () => {
    this.timeout = setTimeout(this.closeMenu, 600)
  }

  menuDirection = () => {
    const { y, right } = this.contentNode.getBoundingClientRect()
    const isHalfway =
      y >
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
        2

    if (right < 200) {
      // 200 is width of popup
      return isHalfway ? PopoverUpRight : PopoverDownRight
    }
    return isHalfway ? PopoverUp : PopoverDown
  }

  closeMenu = () => {
    const state = this.state
    if (state.hover) this.setState({ hover: false, share: false })
  }

  toggleShare() {
    this.setState({ share: true })
  }

  share = rec => {
    this.props.shareItem({
      item_id: this.props.item_id,
      recommend: rec,
      quote: this.props.annotation.quote,
      ...this.props.item
    })
  }

  shareSocial = service => {
    this.props.socialShare({
      item_id: this.props.item_id,
      analytics: {
        [VIEW]: 'reader',
        [UI]: 'annotation'
      },
      service
    })
  }

  get articleIcons() {
    const { translate } = this.props
    return [
      {
        icon: 'Delete',
        copy: translate('annotations.delete.copy'),
        aria: translate('annotations.delete.aria'),
        action: () =>
          this.props.deleteAnnotation({
            item_id: this.props.item_id,
            annotation_id: this.props.annotation_id,
            analytics: {
              [VIEW]: 'reader'
            }
          })
      },
      {
        icon: 'IOSShare',
        copy: translate('annotations.share.copy'),
        aria: translate('annotations.share.aria'),
        action: () => this.toggleShare()
      }
    ]
  }

  get defaultMenu() {
    return (
      <Menu
        menuItems={this.articleIcons}
        width={200}
        addedStyles={this.menuDirection()}
      />
    )
  }

  get shareMenu() {
    return (
      <ShareMenu
        url={this.props.item.resolved_url}
        item_id={this.props.item_id}
        isPremium={this.props.isPremium}
        shareItem={this.share}
        socialShare={this.shareSocial}
        addedStyles={this.menuDirection()}
        quote={this.props.annotation.quote}
      />
    )
  }

  render() {
    const onMouseOver = this.state.hover ? this.itemHoverOn : null
    return (
      <MenuWrapper
        onClick={this.itemHoverOn}
        onMouseOver={onMouseOver}
        onFocus={onMouseOver}
        onMouseLeave={this.itemHoverOff}
        onBlur={this.itemHoverOff}
        ref={node => (this.contentNode = node)}>
        {this.state.hover
          ? this.state.share
            ? this.shareMenu
            : this.defaultMenu
          : null}

        {this.props.children}
      </MenuWrapper>
    )
  }
}

export const AnnotationMenu = withLocalize(AnnotationMenuClass)
