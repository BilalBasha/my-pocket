import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Translate, withLocalize } from 'react-localize-redux'
import { OverlayBase } from '../../Elements/Overlay/overlay'
import { Icon } from '../../Elements/Icons/icon'
import { buttonReset } from '../../Elements/Buttons/button'
import { ShareMenu } from '../../Modules/ShareMenu/shareMenu'
import { ANALYTICS_KEYS } from '../../../Common/constants'
import { FONT_DEFAULTS } from '../../../Common/constants'
const { VIEW, UI } = ANALYTICS_KEYS

const PopupContainer = styled('div')`
  position: fixed;
  left: 0;
  top: 0;
  transform: translate(${props => props.left}px, ${props => props.top}px);
`

const Popup = styled('div')`
  ${OverlayBase}
  background-color: ${props => props.theme.selectionPopover.background};
  position: relative;
  top: -60px;
  transform: translateX(-50%);
  font-family: ${FONT_DEFAULTS['sans'].family};
  font-size: 16px;
  font-weight: 500;
  &:before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 0;
    height: 0;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid
      ${props =>
        props.hideArrow
          ? 'transparent'
          : props.theme.selectionPopover.background};
  }
`

const ButtonWrapper = styled('button')`
  ${buttonReset};
  font-family: ${FONT_DEFAULTS['sans'].family};
  padding: 13px 15px 15px;
  cursor: pointer;
  margin: 0;
  &:hover {
    color: ${props => props.theme.menu.hover.color};
  }
`

const IconWrapper = styled('span')`
  display: inline-block;
  margin-right: 6px;
`

class SelectionPopoverClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      share: false
    }
    this.containerRef = React.createRef()
  }

  onHighlight = () => {
    this.props.addAnnotation({
      item_id: this.props.item_id,
      quote: this.props.textSelection,
      patch: this.props.requestPatch(this.props.anchor),
      analytics: {
        [VIEW]: 'reader'
      }
    })
    this.props.disablePopup()
  }

  onShare = recommend => {
    this.props.shareItem({
      item_id: this.props.item_id,
      recommend,
      recent_friends: this.props.recent_friends,
      quote: this.props.textSelection,
      ...this.props.item
    })
    this.props.disablePopup()
  }

  onSocialShare = service => {
    this.props.socialShare({
      item_id: this.props.item_id,
      analytics: {
        [VIEW]: 'reader',
        [UI]: 'selection'
      },
      service
    })
  }

  toggleShare = () => {
    this.setState({ share: true })
  }

  isClickOutside = e => {
    if (e.button !== 0) return // only process left-click
    if (
      !this.containerRef.current ||
      !this.containerRef.current.contains(e.target)
    ) {
      this.props.disablePopup()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.isClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.isClickOutside)
  }

  get shareMenu() {
    return (
      <ShareMenu
        url={this.props.item.resolved_url}
        item_id={this.props.item_id}
        isPremium={this.props.isPremium}
        shareItem={this.onShare}
        socialShare={this.onSocialShare}
        quote={this.props.textSelection}
      />
    )
  }

  get defaultMenu() {
    const { translate } = this.props
    return (
      <React.Fragment>
        <ButtonWrapper
          onClick={this.onHighlight}
          aria-label={translate('shareExcerpt.highlight.aria')}>
          <IconWrapper>
            <Icon name="Highlights" type="mini" size="16px" />
          </IconWrapper>
          <Translate id="shareExcerpt.highlight.copy">Highlight</Translate>
        </ButtonWrapper>
        <ButtonWrapper
          onClick={this.toggleShare}
          aria-label={translate('shareExcerpt.shareExcerpt.aria')}>
          <IconWrapper>
            <Icon name="IOSShare" type="mini" size="16px" />
          </IconWrapper>
          <Translate id="shareExcerpt.shareExcerpt.copy">Share</Translate>
        </ButtonWrapper>
      </React.Fragment>
    )
  }

  render() {
    const { anchor } = this.props
    if (!anchor || anchor.rangeCount === 0) return null

    const position = anchor.getRangeAt(0).getBoundingClientRect()

    const { right, left, top } = position
    let center = (right - left) / 2 + left

    return (
      <PopupContainer
        left={Math.round(center)} // Whole numbers prevent half pixel rendering
        top={Math.round(top)}>
        <Popup ref={this.containerRef} hideArrow={this.state.share}>
          {!this.state.share ? this.defaultMenu : this.shareMenu}
        </Popup>
      </PopupContainer>
    )
  }
}

export const SelectionPopover = withLocalize(SelectionPopoverClass)

SelectionPopoverClass.propTypes = {
  item: PropTypes.object,
  textSelection: PropTypes.string,
  recent_friends: PropTypes.array,
  item_id: PropTypes.string,
  disablePopup: PropTypes.func,
  shareItem: PropTypes.func,
  socialShare: PropTypes.func,
  annotateItem: PropTypes.func
}
