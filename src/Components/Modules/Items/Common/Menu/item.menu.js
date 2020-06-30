import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { getBool } from '../../../../../Common/helpers'
import { ZINDEX, ANALYTICS_KEYS } from '../../../../../Common/constants'
import { ShareMenu } from '../../../../Modules/ShareMenu/shareMenu'
import { MyListMenu } from './menu.mylist'
import { DiscoverMenu } from './menu.discover'
import { Icon } from '../../../../Elements/Icons/icon'
import { buttonReset } from '../../../../Elements/Buttons/button'
import { withLocalize } from 'react-localize-redux'

const { UI, VIEW, LIST_MODE } = ANALYTICS_KEYS

const MenuWrapper = styled('div')`
  margin-right: -2px;
`

const PopoverPosition = props => css`
  position: absolute;
  bottom: 40px;
  ${props.listMode === 'list' ? { left: '20px' } : { right: '20px' }};
  z-index: ${ZINDEX.item.menu};
`
const ItemMenuTrigger = styled('button')`
  ${buttonReset};
  cursor: pointer;
  height: 24px;
  width: 24px;
  text-align: center;
  color: ${props => props.theme.item.menu.trigger.color};
`

class ItemMenuViewClass extends Component {
  constructor(props) {
    super(props)
    this.state = { hover: false, share: false }
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout)
  }

  itemHoverOn = () => {
    clearTimeout(this.timeout)
    this.setState({ hover: true })
  }

  itemHoverOff = () => {
    this.timeout = setTimeout(this.closeMenu, 250)
  }

  closeMenu = () => {
    const state = this.state
    if (state.hover) this.setState({ hover: false, share: false })
  }

  archive = () =>
    this.props.itemsArchive({
      tag: this.props.tag,
      subset: this.props.subset,
      include: this.props.include,
      items: { [this.props.item_id]: { itemIndex: this.props.itemIndex } },
      analytics: {
        [UI]: 'item_menu',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })

  favorite = () =>
    this.props.itemsFavorite({
      tag: this.props.tag,
      subset: this.props.subset,
      include: this.props.include,
      items: { [this.props.item_id]: { itemIndex: this.props.itemIndex } },
      analytics: {
        [UI]: 'item_menu',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })

  unfavorite = () =>
    this.props.itemsUnfavorite({
      tag: this.props.tag,
      subset: this.props.subset,
      include: this.props.include,
      items: { [this.props.item_id]: { itemIndex: this.props.itemIndex } },
      analytics: {
        [UI]: 'item_menu',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })

  reAdd = () =>
    this.props.itemsReAdd({
      tag: this.props.tag,
      subset: this.props.subset,
      include: this.props.include,
      items: { [this.props.item_id]: { itemIndex: this.props.itemIndex } },
      analytics: {
        [UI]: 'item_menu',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })

  delete = () =>
    this.props.itemsDelete({
      tag: this.props.tag,
      subset: this.props.subset,
      include: this.props.include,
      items: { [this.props.item_id]: { itemIndex: this.props.itemIndex } },
      analytics: {
        [UI]: 'item_menu',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })

  toggleTagging = () =>
    this.props.itemsTagging({
      items: { [this.props.item_id]: { itemIndex: this.props.itemIndex } },
      analytics: {
        [UI]: 'item_menu',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })

  toggleFavorite = () => {
    getBool(this.props.favorite) ? this.unfavorite() : this.favorite()
  }

  toggleShare = () => this.setState({ share: true })

  share = rec => {
    this.props.shareItem({
      item_id: this.props.item_id,
      recommend: rec,
      recent_friends: this.props.recent_friends,
      ...this.props.itemDetails
    })
  }

  shareSocial = service => {
    this.props.socialShare({
      item_id: this.props.item_id,
      analytics: {
        [UI]: 'item_menu',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      },
      service
    })
  }

  render() {
    const {
      type,
      resolved_url,
      item_id,
      feed_item_id,
      resolved_title,
      given_title,
      translate
    } = this.props

    const shareMenu = (
      <ShareMenu
        url={this.props.resolved_url}
        item_id={this.props.item_id}
        isPremium={this.props.isPremium}
        shareItem={this.share}
        socialShare={this.shareSocial}
        listMode={this.props.listMode}
        addedStyles={PopoverPosition}
      />
    )

    const mainMenu =
      type === 'discover' ? (
        <DiscoverMenu
          removeDiscoverItem={this.props.removeDiscoverItem}
          addedStyles={PopoverPosition}
          resolved_url={resolved_url}
          item_id={item_id}
          feed_item_id={feed_item_id}
        />
      ) : (
        <MyListMenu
          status={this.props.status}
          toggleTagging={this.toggleTagging}
          toggleFavorite={this.toggleFavorite}
          toggleShare={this.toggleShare}
          delete={this.delete}
          reAdd={this.reAdd}
          archive={this.archive}
          favorite={this.props.favorite}
          listMode={this.props.listMode}
          addedStyles={PopoverPosition}
        />
      )

    const { hover, share } = this.state
    const margin = this.props.listMode === 'list' ? '0 10px 0 0' : 0
    const title = resolved_title || given_title

    return (
      <MenuWrapper
        onMouseEnter={this.itemHoverOn}
        onMouseLeave={this.itemHoverOff}>
        {hover ? (share ? shareMenu : mainMenu) : null}

        <ItemMenuTrigger
          aria-label={
            translate('itemCollection.menu.menuName') + ' : ' + title
          }>
          <Icon name="IOSOverflow" type="mini" size="16px" margin={margin} />
        </ItemMenuTrigger>
      </MenuWrapper>
    )
  }
}

export const ItemMenuView = withLocalize(ItemMenuViewClass)
