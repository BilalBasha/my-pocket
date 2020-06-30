import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { buttonReset } from '../../../../Elements/Buttons/button'
import { Icon } from '../../../../Elements/Icons/icon'
import copy from 'clipboard-copy'
import { Translate, withLocalize } from 'react-localize-redux'

const ItemMenuPopover = styled('div')`
  box-sizing: border-box;
  padding: 10px 0;
  background: ${props => props.theme.item.menu.background};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  ${props => props.addedStyles};
`
const ItemMenuStyle = props => css`
  ${buttonReset};
  display: grid;
  grid-template-columns: 32px auto;
  grid-template-rows: 24px;
  padding: 5px 40px 5px 20px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: ${props.theme.item.menu.button.hover.background};
  }
`
const ItemMenuButton = styled('div')`
  ${ItemMenuStyle};
  color: ${props => props.theme.item.menu.button.color};
  &:hover {
    color: ${props => props.theme.item.menu.button.hover.color};
  }
`
const ItemMenuLabel = styled('div')`
  display: inline-block;
`

class DiscoverMenuClass extends Component {
  state = {
    copied: false
  }

  setCopied = () => {
    this.setState({ copied: true })
  }

  copyLink = () => {
    const { resolved_url } = this.props
    copy(resolved_url).then(this.setCopied)
  }

  removeDiscoverItem = () => {
    const { item_id, feed_item_id } = this.props
    this.props.removeDiscoverItem({ item_id, feed_item_id })
  }

  render() {
    const { translate } = this.props
    const iconSize = 24
    return (
      <ItemMenuPopover addedStyles={this.props.addedStyles}>
        <ItemMenuButton
          onClick={this.copyLink}
          aria-label={translate('itemDiscover.menu.copy')}>
          <Icon
            name="CopyLink"
            type="line"
            size={iconSize + 'px'}
            box={iconSize}
          />
          <ItemMenuLabel>
            {this.state.copied
              ? translate('itemDiscover.menu.copied')
              : translate('itemDiscover.menu.copy')}
          </ItemMenuLabel>
        </ItemMenuButton>

        <ItemMenuButton
          onClick={this.removeDiscoverItem}
          aria-label={translate('itemDiscover.menu.remove')}>
          <Icon
            name="Remove"
            type="line"
            size={iconSize + 'px'}
            box={iconSize}
          />
          <ItemMenuLabel>
            <Translate id="itemDiscover.menu.remove">Remove Item</Translate>
          </ItemMenuLabel>
        </ItemMenuButton>
      </ItemMenuPopover>
    )
  }
}

export const DiscoverMenu = withLocalize(DiscoverMenuClass)
