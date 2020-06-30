import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { itemActions } from '../../../../Containers/App/Items/item.state'
import { collectionActions } from '../../../../Containers/Collection/collection.state'
import { appActions } from '../../../../Containers/App/app.state'
import { Item } from '../../../Modules/Items/item'

class MyListItemConnector extends PureComponent {
  render() {
    const {
      sizes,
      externalLink,
      type,
      bulkEdit,
      addToBulkEdit,
      listMode,
      removeFromBulkEdit,
      height,
      itemIndex,
      collectionItemOpened,
      shortcutSelected,
      ...data
    } = this.props

    return (
      <Item
        height={height}
        itemIndex={itemIndex}
        listMode={listMode}
        addToBulkEdit={addToBulkEdit}
        removeFromBulkEdit={removeFromBulkEdit}
        bulkEditSelected={bulkEdit}
        type={type}
        sizes={sizes}
        externalLink={externalLink}
        collectionItemOpened={collectionItemOpened}
        shortcutSelected={shortcutSelected}
        {...data}
      />
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...collectionActions, ...itemActions, ...appActions },
    dispatch
  )
}

function mapStateToProps(initialState, initialOwnProps) {
  const itemId = initialOwnProps.item_id
  return function mapStateToProps(state) {
    const { mode } = state.collection.options
    const item = state.items[itemId]
    const bulkEdit = Object.keys(state.collection.bulkEdit).includes(itemId)
    const shortcutSelected = state.shortcuts.selected === itemId
    const type = mode === 'bulkEdit' ? 'bulkedit' : 'mylist'
    return {
      ...item,
      bulkEdit,
      shortcutSelected,
      type
    }
  }
}

export const MyListItem = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: true }
)(MyListItemConnector)
