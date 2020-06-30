import { SidebarFull } from './sidebar.full'
import { SideBarOverlay } from './sidebar.overlay'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { itemActions } from '../../../../Containers/App/Items/item.state'
import { collectionActions } from '../../../../Containers/Collection/collection.state'
import { analyticsActions } from '../../../../Containers/App/Analytics/analytics.state'
import { withRouter } from 'react-router'
import { withSizes } from '../../../Modules/Sizes/sizes.hoc'
import { getBool } from '../../../../Common/helpers'

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class SidebarConnectorClass extends Component {
  render() {
    const {
      itemsRefresh,
      showSubset,
      showExcerpt,
      hideExcerpt,
      subset,
      sort,
      itemAdd,
      itemsArchive,
      itemsReAdd,
      itemsFavorite,
      itemsUnfavorite,
      itemsDelete,
      itemsPurge,
      status,
      devMode,
      toggleSideNav,
      isPremium,
      sideNavActive,
      mobileOnly,
      trackClick,
      HAS_SIDEBAR
    } = this.props

    const sideBarProps = {
      sort: sort,
      status: status,
      subset: subset,
      itemsRefresh: itemsRefresh,
      itemsPurge: itemsPurge,
      showSubset: showSubset,
      itemAdd: itemAdd,
      itemsArchive: itemsArchive,
      itemsReAdd: itemsReAdd,
      itemsFavorite: itemsFavorite,
      itemsUnfavorite: itemsUnfavorite,
      itemsDelete: itemsDelete,
      showExcerpt: showExcerpt,
      hideExcerpt: hideExcerpt,
      devMode: devMode,
      toggleSideNav: toggleSideNav,
      isPremium: isPremium,
      trackClick: trackClick
    }

    const isOverlay = !HAS_SIDEBAR
    return isOverlay || mobileOnly ? (
      <SideBarOverlay
        {...sideBarProps}
        sideNavActive={sideNavActive}
        mobileOnly={mobileOnly}
      />
    ) : (
      <SidebarFull {...sideBarProps} />
    )
  }
}

const SidebarConnector = withSizes(SidebarConnectorClass)

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...itemActions,
      ...collectionActions,
      ...analyticsActions
    },
    dispatch
  )
}

function mapStateToProps(state) {
  const devMode = localStorage.getItem('devMode')
  const { tag, status, sort, subset, sideNavActive } = state.collection.options

  return {
    status,
    sort,
    subset,
    tag,
    devMode,
    sideNavActive,
    isPremium: getBool(state.app.isPremium)
  }
}

export const Sidebar = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SidebarConnector)
)
