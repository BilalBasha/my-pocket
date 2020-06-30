import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { itemActions } from '../../../../Containers/App/Items/item.state'
import { appActions } from '../../../../Containers/App/app.state'
import { discoverActions } from '../../../../Containers/Discover/discover.state'
import { Item } from '../../../Modules/Items/item'

export class DiscoverItemView extends React.Component {
  //-----------------------------------------

  render() {
    if (!this.props.data) return
    const {
      data,
      sizes,
      feed_item_id,
      saveDiscoverItem,
      unsaveDiscoverItem,
      saved,
      externalLink,
      dimensions,
      itemIndex
    } = this.props

    return (
      <Item
        feed_item_id={feed_item_id}
        dimensions={dimensions}
        itemIndex={itemIndex}
        type="discover"
        sizes={sizes}
        saved={saved}
        saveId={feed_item_id}
        saveDiscoverItem={saveDiscoverItem}
        unsaveDiscoverItem={unsaveDiscoverItem}
        externalLink={externalLink}
        {...data}
      />
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...discoverActions, ...itemActions, ...appActions },
    dispatch
  )
}

function mapStateToProps(state, ownProps) {
  return {
    feed_item_id: ownProps.item_id,
    saved: state.discover.items[ownProps.item_id].saved,
    data: state.discover.items[ownProps.item_id].item
  }
}

export const DiscoverItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverItemView)
