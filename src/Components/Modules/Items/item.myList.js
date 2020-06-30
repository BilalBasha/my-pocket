/* eslint  react/jsx-no-target-blank: 0*/
import React, { Component, PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import { ItemContent } from '../../Modules/Items/Common/item.wrapper.js'
import { ItemImage } from '../../Modules/Items/Common/Image/item.image'
import { ItemFooter } from '../../Modules/Items/Common/Footer/item.footer'
import { ItemMarks } from '../../Modules/Items/Common/Marks/item.marks'
import { ItemMenu } from '../../Modules/Items/Common/Menu/item.menu.connector'
import { ItemInfo } from '../../Modules/Items/Common/Info/item.info'
import { ItemTitle } from '../../Modules/Items/Common/Text/item.title'
import { ItemExcerpt } from '../../Modules/Items/Common/Text/item.excerpt'
import { urlWithPocketRedirect } from '../../../Common/helpers'
import { BulkSelect } from '../../Modules/Items/Common/Bulk/bulk.select'

import { ANALYTICS_KEYS } from '../../../Common/constants'
const { LIST_MODE, INDEX, VIEW } = ANALYTICS_KEYS

class ItemLink extends PureComponent {
  onClick = event => {
    const { onClick, type } = this.props
    if (type === 'bulkedit') return event.preventDefault()
    return onClick(event)
  }

  render() {
    const {
      itemContentType,
      to,
      resolved_url,
      given_url,
      children,
      title
    } = this.props

    const url = given_url || resolved_url

    return itemContentType === 'opened_web' ? (
      <a
        aria-label={title}
        href={urlWithPocketRedirect(url)}
        onClick={this.onClick}
        target="_blank">
        {children}
      </a>
    ) : (
      <NavLink to={to} onClick={this.onClick} aria-label={title}>
        {children}
      </NavLink>
    )
  }
}

export class ItemMyList extends Component {
  onExternalLink = event => {
    this.props.externalLink('list')
  }

  onItemOpened = () => {
    const { itemContentType, item_id, itemIndex, listMode } = this.props
    this.props.collectionItemOpened({
      action: itemContentType,
      item_id,
      [VIEW]: 'list',
      [LIST_MODE]: listMode,
      [INDEX]: itemIndex
    })
  }

  render() {
    const {
      item_id,
      setClamp,
      titleLines,
      listMode,
      itemIndex,
      type,
      bulkEditSelected
    } = this.props

    const imageProps = {
      listMode: listMode,
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
      sizes: this.props.sizes
    }

    const detailProps = {
      title: this.props.title,
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
      listMode: listMode,
      subset: this.props.subset,
      itemContentType: this.props.itemContentType,
      include: this.props.include,
      tag: this.props.tag,
      tags: this.props.tags,
      annotations: this.props.annotations
    }

    const linkProps = {
      title: this.props.resolved_title || this.props.given_title,
      type: this.props.type,
      itemContentType: this.props.itemContentType,
      to: `/read/${item_id}`,
      onClick: this.onItemOpened,
      resolved_url: this.props.resolved_url,
      given_url: this.props.given_url
    }

    const isBulkEdit = type === 'bulkedit'
    return (
      <React.Fragment>
        <ItemLink {...linkProps}>
          <ItemImage {...imageProps} item_id={item_id} />
        </ItemLink>
        <ItemContent>
          <ItemLink {...linkProps}>
            <ItemTitle {...detailProps} setClamp={setClamp} />
          </ItemLink>
          <ItemInfo
            {...detailProps}
            onExternalLink={this.onExternalLink}
            noLink={isBulkEdit}
          />
          <ItemExcerpt {...detailProps} lines={titleLines} />
          <ItemFooter listMode={listMode}>
            <ItemMarks {...detailProps} />
            {isBulkEdit ? (
              <BulkSelect
                item_id={item_id}
                bulkEditSelected={bulkEditSelected}
              />
            ) : (
              <ItemMenu {...detailProps} itemIndex={itemIndex} />
            )}
          </ItemFooter>
        </ItemContent>
      </React.Fragment>
    )
  }
}
