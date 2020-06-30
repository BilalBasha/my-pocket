import React, { Component } from 'react'
import { NavBarTop, NavClamp } from '../../../Elements/NavBar/navBar'
import { ActionList, ActionIcon, BarActions } from '../../../Elements/NavBar/navBar'
import { ProgressBar } from '../../../Modules/ScrollTracker/progressBar'
import { Share } from '../../../Views/Reader/TopNav/Share/share'
import { DisplaySettings } from '../../../Views/Reader/TopNav/DisplaySettings/displaySettings'
import { getBool } from '../../../../Common/helpers'
import styled from '@emotion/styled'
import { ANALYTICS_KEYS } from '../../../../Common/constants'
import { withSizes } from '../../../Modules/Sizes/sizes.hoc'
import { withLocalize } from 'react-localize-redux'

const { UI, VIEW } = ANALYTICS_KEYS

const NavClampFull = styled(NavClamp)`
  grid-template-columns: 80px auto 80px;
`

const NavClampMin = styled(NavClamp)`
  grid-template-columns: 50px auto 50px;
`

class ReaderTopNavClass extends Component {
  clickBack = () => {
    this.props.readerSetExitMethod({ item_id: this.props.item_id, ui: 'back' })
    this.props.readerGoBack()
  }

  reAdd = () =>
    this.props.itemsReAdd({
      items: { [this.props.item_id]: false },
      analytics: {
        [UI]: 'toolbar',
        [VIEW]: 'reader'
      }
    })

  archive = () =>
    this.props.itemsArchive({
      items: { [this.props.item_id]: false },
      analytics: {
        [UI]: 'toolbar',
        [VIEW]: 'reader'
      }
    })

  favorite = () =>
    this.props.itemsFavorite({
      items: { [this.props.item_id]: false },
      analytics: {
        [UI]: 'toolbar',
        [VIEW]: 'reader'
      }
    })

  unfavorite = () =>
    this.props.itemsUnfavorite({
      items: { [this.props.item_id]: false },
      analytics: {
        [UI]: 'toolbar',
        [VIEW]: 'reader'
      }
    })

  delete = () =>
    this.props.itemsDelete({
      items: { [this.props.item_id]: false },
      analytics: {
        [UI]: 'toolbar',
        [VIEW]: 'reader'
      }
    })

  tagging = () =>
    this.props.itemsTagging({
      items: { [this.props.item_id]: false },
      analytics: {
        [UI]: 'toolbar',
        [VIEW]: 'reader'
      }
    })

  /* Archive or Add
  ------------------------------------------------------- */
  addOrArchive = () => {
    !getBool(this.props.isArchived) ? this.archive() : this.reAdd()
  }

  get archiveState() {
    return getBool(this.props.isArchived) ? 'ReAdd' : 'Archive'
  }

  /* Favorite
  ------------------------------------------------------- */
  toggleFavorite = () => {
    getBool(this.props.favorite) ? this.unfavorite() : this.favorite()
  }

  /* Share
  ------------------------------------------------------- */
  share = rec => {
    this.props.shareItem({
      item_id: this.props.item_id,
      recommend: rec,
      recent_friends: this.props.recent_friends
    })
  }

  shareSocial = service => {
    this.props.socialShare({
      item_id: this.props.item_id,
      analytics: {
        [UI]: 'toolbar',
        [VIEW]: 'reader'
      },
      service
    })
  }

  /* Annotations
  ------------------------------------------------------- */
  toggleAnnotationsMenu = () => {
    this.props.toggleAnnotations()
    this.props.trackClick({
      view: 'web',
      section: 'webapp',
      page: 'reader',
      identifier: 'open_highlights'
    })
  }

  /* Render
  ------------------------------------------------------- */
  render() {
    const {
      favorite,
      SIDEBAR_WIDTH,
      annotationsOpen,
      scrollPercentage,
      translate
    } = this.props
    const hasSidebar = SIDEBAR_WIDTH
    const NavLayout = hasSidebar ? NavClampFull : NavClampMin
    const centerIconMargin = hasSidebar ? '0 1.1em' : '0 0.4em'

    return (
      <NavBarTop>
        <ProgressBar percentage={scrollPercentage} />
        <NavLayout reader={true}>
          <ActionList>
            <ActionIcon
              icon="BackArrow"
              type="line"
              tooltip={translate('reader.topNav.back')}
              action={this.clickBack}>
              {hasSidebar ? 'Back' : null}
            </ActionIcon>
          </ActionList>
          <ActionList style={{ justifyContent: 'center' }}>
            <ActionIcon
              icon="Highlights"
              action={this.toggleAnnotationsMenu}
              type={annotationsOpen ? "solid" : "line"}
              tooltip={translate('reader.topNav.highlights')}
              margin={centerIconMargin}
            />

            <ActionIcon
              icon="AddTags"
              action={this.tagging}
              tooltip={translate('reader.topNav.tagging')}
              margin={centerIconMargin}
            />

            <ActionIcon
              type={getBool(favorite) ? 'solid' : 'line'}
              icon="Favorite"
              action={this.toggleFavorite}
              tooltip={
                getBool(favorite)
                  ? translate('reader.topNav.unfavorite')
                  : translate('reader.topNav.favorite')
              }
              favorite={getBool(favorite)}
              margin={centerIconMargin}
            />

            <ActionIcon
              type="line"
              icon={this.archiveState}
              action={this.addOrArchive}
              tooltip={
                getBool(this.props.isArchived)
                  ? translate('reader.topNav.reAdd.aria')
                  : translate('reader.topNav.archive')
              }
              margin={centerIconMargin}
            />

            <ActionIcon
              type="line"
              icon="Delete"
              action={this.delete}
              tooltip={translate('reader.topNav.delete')}
              margin={centerIconMargin}
            />

            <Share
              url={this.props.resolved_url}
              iconMargin={centerIconMargin}
              shareItem={this.share}
              socialShare={this.shareSocial}
              item_id={this.props.item_id}
              isPremium={this.props.isPremium}
            />
          </ActionList>
          <BarActions>
            <DisplaySettings
              fontRange={this.props.fontRange}
              fontSize={this.props.fontSize}
              fontType={this.props.fontType}
              fontTypeChange={this.props.fontTypeChange}
              fontSizeChange={this.props.fontSizeChange}
              columnWidthChange={this.props.columnWidthChange}
              columnWidth={this.props.columnWidth}
              lineHeightChange={this.props.lineHeightChange}
              lineHeight={this.props.lineHeight}
              themeChange={this.props.themeChange}
              activeTheme={this.props.theme}
              isPremium={this.props.isPremium}
            />
          </BarActions>
        </NavLayout>
      </NavBarTop>
    )
  }
}
export const ReaderTopNavView = withLocalize(withSizes(ReaderTopNavClass))
