import React, { Component } from 'react'
import { NavBarTop } from '../../../Elements/NavBar/navBar'
import { NavFull } from './nav.full'
import { NavMin } from './nav.min'
import { NavSearch } from './nav.search'
import { NavBulkEdit } from './nav.bulkEdit'
import { NavAddUrl } from './nav.addUrl'
import { withSizes } from '../../../Modules/Sizes/sizes.hoc'

export class TopNavClass extends Component {
  get navSize() {
    const { HAS_SIDEBAR } = this.props
    if (HAS_SIDEBAR) return NavFull
    return NavMin
  }

  get navType() {
    if (this.props.mode === 'bulkEdit') return NavBulkEdit
    if (this.props.mode === 'search' || this.props.query) return NavSearch
    if (this.props.mode === 'addUrl') return NavAddUrl
    return this.navSize
  }

  /* Render
  ------------------------------------------------------- */
  render() {
    const { HAS_SIDEBAR } = this.props
    const NavType = this.navType
    return (
      <NavBarTop>
        <NavType {...this.props} hasSidebar={HAS_SIDEBAR} />
      </NavBarTop>
    )
  }
}

export const TopNavView = withSizes(TopNavClass)
