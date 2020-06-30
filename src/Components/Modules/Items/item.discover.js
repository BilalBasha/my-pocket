/* eslint  react/jsx-no-target-blank: 0*/
import React from 'react'
import { ItemContent } from '../../Modules/Items/Common/item.wrapper.js'
import { ItemImage } from '../../Modules/Items/Common/Image/item.image'
import { ItemFooter } from '../../Modules/Items/Common/Footer/item.footer'
import { ItemSave } from '../../Modules/Items/Common/Save/item.save'
import { ItemMenu } from '../../Modules/Items/Common/Menu/item.menu.connector'
import { ItemTitle } from '../../Modules/Items/Common/Text/item.title'
import { ItemExcerpt } from '../../Modules/Items/Common/Text/item.excerpt'
import { ItemInfo } from '../../Modules/Items/Common/Info/item.info'
import { ANALYTICS_KEYS } from '../../../Common/constants'

const { VIEW, INDEX } = ANALYTICS_KEYS

export class ItemDiscover extends React.Component {
  onSaveClick = () => {
    if (this.props.saved) return this.unsaveDiscoverItem()
    this.saveDiscoverItem()
  }

  saveDiscoverItem = () => {
    this.props.saveDiscoverItem({
      saveId: this.props.saveId,
      analytics: {
        [VIEW]: 'feed',
        [INDEX]: this.props.itemIndex
      }
    })
  }

  unsaveDiscoverItem = () => {
    this.props.unsaveDiscoverItem({
      saveId: this.props.saveId,
      analytics: {
        [VIEW]: 'feed',
        [INDEX]: this.props.itemIndex
      }
    })
  }

  onExternalLink = event => {
    this.props.externalLink('feed')
  }

  render() {
    const { item_id, setClamp, titleLines, saveId, saved } = this.props

    const imageProps = {
      item_id: item_id,
      has_video: this.props.has_video,
      top_image_url: this.props.top_image_url,
      image: this.props.image,
      images: this.props.images,
      title: this.props.title,
      resolved_url: this.props.resolved_url,
      given_url: this.props.given_url,
      has_image: this.props.has_image,
      resolved_title: this.props.resolved_title,
      given_title: this.props.given_title,
      sizes: this.props.sizes,
      dimensions: this.props.dimensions
    }

    const detailProps = {
      title: this.props.title,
      feed_item_id: this.props.feed_item_id,
      given_title: this.props.given_title,
      resolved_title: this.props.resolved_title,
      excerpt: this.props.excerpt,
      domain_metadata: this.props.domain_metadata,
      item_id: item_id,
      badge_group_id: this.props.badge_group_id,
      resolved_url: this.props.resolved_url,
      given_url: this.props.given_url,
      has_video: this.props.has_video,
      word_count: this.props.word_count,
      videos: this.props.videos,
      favorite: this.props.favorite,
      status: this.props.status,
      sizes: this.props.sizes,
      visible: this.props.visible,
      dimensions: this.props.dimensions
    }

    const url = this.props.redirect_url

    return (
      <React.Fragment>
        <a
          href={url}
          style={{ cursor: 'pointer' }}
          target="_blank"
          onClick={this.onExternalLink}>
          <ItemImage {...imageProps} item_id={item_id} />
        </a>
        <ItemContent>
          <a
            href={url}
            style={{ cursor: 'pointer' }}
            target="_blank"
            onClick={this.onExternalLink}>
            <ItemTitle {...detailProps} setClamp={setClamp} />
          </a>
          <ItemInfo {...detailProps} onExternalLink={this.onExternalLink} />
          <ItemExcerpt {...detailProps} lines={titleLines} />
          <ItemFooter>
            <ItemSave saved={saved} onSaveClick={this.onSaveClick} />
            <ItemMenu {...detailProps} type="discover" saveId={saveId} />
          </ItemFooter>
        </ItemContent>
      </React.Fragment>
    )
  }
}
