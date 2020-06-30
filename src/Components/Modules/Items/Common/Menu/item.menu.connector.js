import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ItemMenuView } from './item.menu'
import { itemActions } from '../../../../../Containers/App/Items/item.state'
import { discoverActions } from '../../../../../Containers/Discover/discover.state'
import { collectionActions } from '../../../../../Containers/Collection/collection.state'
import { getBool } from '../../../../../Common/helpers'

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class ItemMenuConnector extends Component {
  render() {
    const {
      item_id,
      feed_item_id,
      resolved_url,
      resolved_title,
      given_title,
      favorite,
      status,
      archived,
      itemAdd,
      itemsArchive,
      itemsReAdd,
      itemsFavorite,
      itemsUnfavorite,
      itemsDelete,
      itemsTagging,
      shareItem,
      socialShare,
      recent_friends,
      hover,
      type,
      saveId,
      removeDiscoverItem,
      listMode,
      itemIndex,
      isPremium,
      subset,
      tag,
      include
    } = this.props

    return (
      <ItemMenuView
        resolved_title={resolved_title}
        given_title={given_title}
        listMode={listMode}
        itemIndex={itemIndex}
        status={status}
        hover={hover}
        item_id={item_id}
        feed_item_id={feed_item_id}
        resolved_url={resolved_url}
        favorite={favorite}
        archived={archived}
        itemAdd={itemAdd}
        itemsArchive={itemsArchive}
        itemsReAdd={itemsReAdd}
        itemsFavorite={itemsFavorite}
        itemsUnfavorite={itemsUnfavorite}
        itemsDelete={itemsDelete}
        itemsTagging={itemsTagging}
        shareItem={shareItem}
        socialShare={socialShare}
        recent_friends={recent_friends}
        type={type}
        saveId={saveId}
        removeDiscoverItem={removeDiscoverItem}
        isPremium={isPremium}
        include={include}
        subset={subset}
        tag={tag}
      />
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...itemActions, ...discoverActions, ...collectionActions },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    listMode: state.options.listMode,
    isPremium: getBool(state.app.isPremium)
  }
}

export const ItemMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemMenuConnector)
