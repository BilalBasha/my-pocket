import { TopNavView } from './nav.top'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { itemActions } from '../../../../Containers/App/Items/item.state'
import { collectionActions } from '../../../../Containers/Collection/collection.state'
import { optionsActions } from '../../../../Containers/App/Options/options.state'
import { analyticsActions } from '../../../../Containers/App/Analytics/analytics.state'
import { getBool } from '../../../../Common/helpers'

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class TopNavConnector extends Component {
  render() {
    const {
      profile_uid,
      profile_avatar,
      profile_first_name,
      profile_username,
      searchCollection,
      showSubset,
      subset,
      sort,
      query,
      itemAdd,
      itemsTagging,
      itemsArchive,
      itemsReAdd,
      itemsFavorite,
      itemsUnfavorite,
      itemsDelete,
      status,
      bulkEdit,
      mode,
      enterAddUrlMode,
      exitAddUrlMode,
      enterSearchMode,
      exitSearchMode,
      enterBulkEditMode,
      exitBulkEditMode,
      updateBulkEdit,
      removeFromBulkEdit,
      themeChange,
      activeTheme,
      sideNavActive,
      toggleSideNav,
      listMode,
      enterListMode,
      enterGridMode,
      setSortByOldest,
      setSortByNewest,
      openWhatsNew,
      clearBulkEdit,
      favorites,
      offset,
      since,
      isDiscover,
      include,
      isPremium,
      recentSearches,
      trackClick
    } = this.props

    return (
      <TopNavView
        isPremium={isPremium}
        recentSearches={recentSearches}
        include={include}
        isDiscover={isDiscover}
        offset={offset}
        since={since}
        listMode={listMode}
        enterListMode={enterListMode}
        enterGridMode={enterGridMode}
        openWhatsNew={openWhatsNew}
        mode={mode}
        enterAddUrlMode={enterAddUrlMode}
        exitAddUrlMode={exitAddUrlMode}
        enterSearchMode={enterSearchMode}
        exitSearchMode={exitSearchMode}
        enterBulkEditMode={enterBulkEditMode}
        exitBulkEditMode={exitBulkEditMode}
        sort={sort}
        query={query}
        status={status}
        subset={subset}
        profile_uid={profile_uid}
        profile_avatar={profile_avatar}
        profile_first_name={profile_first_name}
        profile_username={profile_username}
        searchCollection={searchCollection}
        showSubset={showSubset}
        itemAdd={itemAdd}
        itemsArchive={itemsArchive}
        itemsReAdd={itemsReAdd}
        itemsFavorite={itemsFavorite}
        itemsTagging={itemsTagging}
        itemsUnfavorite={itemsUnfavorite}
        itemsDelete={itemsDelete}
        bulkEdit={bulkEdit}
        themeChange={themeChange}
        activeTheme={activeTheme}
        removeFromBulkEdit={removeFromBulkEdit}
        updateBulkEdit={updateBulkEdit}
        sideNavActive={sideNavActive}
        toggleSideNav={toggleSideNav}
        clearBulkEdit={clearBulkEdit}
        favorites={favorites}
        setSortByOldest={setSortByOldest}
        setSortByNewest={setSortByNewest}
        trackClick={trackClick}
      />
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...itemActions,
      ...collectionActions,
      ...optionsActions,
      ...analyticsActions
    },
    dispatch
  )
}

function mapStateToProps(state) {
  const { status, mode, sideNavActive } = state.collection.options

  const { bulkEdit, favorites } = state.collection

  const profile_uid = localStorage.getItem('uid')
  const profile_avatar = localStorage.getItem('avatar')
  const profile_first_name = localStorage.getItem('first_name')
  const profile_username = localStorage.getItem('username')

  const activeTheme = state.options.theme
  const listMode = state.options.listMode
  const sort = state.options.sort

  const since = state.collection.options.since
  const subset = state.collection.options.subset
  const offset =
    subset && state.collection.lists[subset]
      ? state.collection.lists[subset].offset
      : undefined
  const isDiscover = state.router.location.pathname === '/discover'

  const { include, query } = state.collection.search
  const { recentSearches, isPremium } = state.app

  return {
    isPremium: getBool(isPremium),
    listMode,
    status,
    query,
    include,
    sort,
    profile_uid,
    profile_avatar,
    profile_first_name,
    profile_username,
    mode,
    bulkEdit,
    activeTheme,
    sideNavActive,
    favorites,
    since,
    subset,
    offset,
    isDiscover,
    recentSearches
  }
}

export const TopNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavConnector)
