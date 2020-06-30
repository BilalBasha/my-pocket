import React from 'react'
import PropTypes from 'prop-types'
import { ItemWrapper } from './Common/item.wrapper.js'
import { ItemDiscover } from './item.discover'
import { ItemMyList } from './item.myList'

import { ANALYTICS_KEYS } from '../../../Common/constants'
const { VIEW, INDEX } = ANALYTICS_KEYS

export class Item extends React.Component {
  constructor(props) {
    super(props)
    this.itemRef = React.createRef()
  }

  externalLink = view => {
    const { itemIndex } = this.props
    const { item_id, resolved_url, given_url } = this.props

    const url = given_url || resolved_url

    this.props.externalLink({
      url,
      analytics: {
        item_id: item_id,
        [VIEW]: view,
        [INDEX]: itemIndex
      }
    })
  }

  toggleBulkEditSelection = () => {
    const {
      item_id,
      itemIndex,
      bulkEditSelected,
      addToBulkEdit,
      removeFromBulkEdit,
      favorite,
      status,
      type
    } = this.props

    if (type !== 'bulkedit') return

    return bulkEditSelected
      ? removeFromBulkEdit({ item_id, itemIndex })
      : addToBulkEdit({
          item_id,
          itemIndex,
          favorite,
          archive: status === '1'
        })
  }

  get itemType() {
    const { type } = this.props
    if (type === 'discover') return ItemDiscover
    return ItemMyList
  }

  get itemContentType() {
    const { has_video, has_image, is_article } = this.props
    if (has_video === '2') return 'opened_video'
    if (has_image === '2') return 'opened_image'
    if (is_article === '1') return 'opened_article'
    return 'opened_web'
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.shortcutSelected && this.props.shortcutSelected) {
      window.scrollTo(0, this.itemRef.current.offsetTop)
    }
  }

  render() {
    const ItemToRender = this.itemType
    return (
      <ItemWrapper
        ref={this.itemRef}
        itemHeight={this.props.height}
        listMode={this.props.listMode}
        bulkEditSelected={this.props.bulkEditSelected}
        shortcutSelected={this.props.shortcutSelected}
        onClick={this.toggleBulkEditSelection}>
        <ItemToRender
          itemContentType={this.itemContentType}
          collectionItemOpened={this.props.collectionItemOpened}
          bulkEditSelected={this.props.bulkEditSelected}
          itemIndex={this.props.itemIndex}
          listMode={this.props.listMode}
          titleLines={3}
          item_id={this.props.item_id}
          feed_item_id={this.props.feed_item_id}
          saved={this.props.saved}
          saveDiscoverItem={this.props.saveDiscoverItem}
          unsaveDiscoverItem={this.props.unsaveDiscoverItem}
          saveId={this.props.saveId}
          type={this.props.type}
          externalLink={this.externalLink}
          addToBulkEdit={this.props.addToBulkEdit}
          removeFromBulkEdit={this.props.removeFromBulkEdit}
          image={this.props.image}
          images={this.props.images}
          top_image_url={this.props.top_image_url}
          has_image={this.props.has_image}
          title={this.props.title}
          given_title={this.props.given_title}
          resolved_title={this.props.resolved_title}
          excerpt={this.props.excerpt}
          domain_metadata={this.props.domain_metadata}
          badge_group_id={this.props.badge_group_id}
          resolved_url={this.props.resolved_url}
          given_url={this.props.given_url}
          has_video={this.props.has_video}
          word_count={this.props.word_count}
          videos={this.props.videos}
          favorite={this.props.favorite}
          status={this.props.status}
          visible={this.props.visible}
          subset={this.props.subset}
          include={this.props.include}
          tag={this.props.tag}
          tags={this.props.tags}
          annotations={this.props.annotations || []}
          redirect_url={this.props.redirect_url}
        />
      </ItemWrapper>
    )
  }
}

Item.propTypes = {
  // Functions
  addToBulkEdit: PropTypes.func,
  collectionItemOpened: PropTypes.func,
  externalLink: PropTypes.func,
  removeFromBulkEdit: PropTypes.func,
  saveDiscoverItem: PropTypes.func,

  // Derived
  bulkEditSelected: PropTypes.bool,
  height: PropTypes.number,
  include: PropTypes.any,
  listMode: PropTypes.string,
  itemIndex: PropTypes.number,
  saved: PropTypes.bool,
  shortcutSelected: PropTypes.bool,
  subset: PropTypes.string,
  tag: PropTypes.string,
  type: PropTypes.string,
  visible: PropTypes.bool,

  // From Item
  annotations: PropTypes.array,
  badge_group_id: PropTypes.string,
  domain_metadata: PropTypes.object,
  excerpt: PropTypes.string,
  favorite: PropTypes.string,
  feed_item_id: PropTypes.string,
  given_title: PropTypes.string,
  given_url: PropTypes.string,
  has_image: PropTypes.string,
  has_video: PropTypes.string,
  image: PropTypes.object,
  images: PropTypes.object,
  is_article: PropTypes.string,
  item_id: PropTypes.string,
  resolved_title: PropTypes.string,
  resolved_url: PropTypes.string,
  saveId: PropTypes.string,
  status: PropTypes.string,
  tags: PropTypes.object,
  title: PropTypes.string,
  top_image_url: PropTypes.string,
  videos: PropTypes.object,
  word_count: PropTypes.string
}
