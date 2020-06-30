import { ReaderTopNavView } from './nav.top'

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { itemActions } from '../../../../Containers/App/Items/item.state'
import { optionsActions } from '../../../../Containers/App/Options/options.state'
import { readerActions } from '../../../../Containers/Reader/reader.state'
import { analyticsActions } from '../../../../Containers/App/Analytics/analytics.state'
import { getBool } from '../../../../Common/helpers'

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class ReaderTopNavConnector extends Component {
  render() {
    const {
      avatar,
      itemAdd,
      itemsArchive,
      itemsReAdd,
      itemsFavorite,
      itemsUnfavorite,
      itemsDelete,
      itemsTagging,
      itemDetails,
      toggleTaggingDisplay,
      shareItem,
      socialShare,
      appNavigate,
      fontRange,
      fontSize,
      fontType,
      fontTypeChange,
      fontSizeChange,
      columnWidthChange,
      columnWidth,
      lineHeightChange,
      lineHeight,
      themeChange,
      resolved_title,
      item_id,
      recent_friends,
      sizes,
      readerSetExitMethod,
      readerGoBack,
      scrollPercentage,
      isPremium,
      toggleAnnotations,
      annotationsOpen,
      trackClick,
      theme
    } = this.props

    return itemDetails ? (
      <ReaderTopNavView
        item_id={item_id}
        appNavigate={appNavigate}
        avatar={avatar}
        itemAdd={itemAdd}
        itemsArchive={itemsArchive}
        itemsReAdd={itemsReAdd}
        itemsFavorite={itemsFavorite}
        itemsUnfavorite={itemsUnfavorite}
        itemsDelete={itemsDelete}
        itemsTagging={itemsTagging}
        toggleTaggingDisplay={toggleTaggingDisplay}
        shareItem={shareItem}
        socialShare={socialShare}
        fontRange={fontRange}
        fontSize={fontSize}
        fontType={fontType}
        fontTypeChange={fontTypeChange}
        fontSizeChange={fontSizeChange}
        columnWidthChange={columnWidthChange}
        columnWidth={columnWidth}
        lineHeightChange={lineHeightChange}
        lineHeight={lineHeight}
        themeChange={themeChange}
        theme={theme}
        favorite={itemDetails.favorite}
        isArchived={itemDetails.status}
        resolved_title={resolved_title}
        resolved_url={itemDetails.resolved_url}
        recent_friends={recent_friends}
        itemDetails={itemDetails}
        sizes={sizes}
        readerGoBack={readerGoBack}
        readerSetExitMethod={readerSetExitMethod}
        scrollPercentage={scrollPercentage}
        isPremium={isPremium}
        toggleAnnotations={toggleAnnotations}
        annotationsOpen={annotationsOpen}
        trackClick={trackClick}
      />
    ) : null
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...itemActions,
      ...optionsActions,
      ...readerActions,
      ...analyticsActions
    },
    dispatch
  )
}

function mapStateToProps(state, ownProps) {
  const item_id = ownProps.item_id
  const isPremium = getBool(state.app.isPremium)

  return {
    item_id,
    isPremium,
    itemDetails: state.items[item_id],
    columnWidth: state.options.columnWidth,
    lineHeight: state.options.lineHeight,
    fontSize: state.options.fontSize,
    fontRange: state.options.fontRange,
    fontType: state.options.fontType,
    theme: state.options.theme
  }
}

export const ReaderTopNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReaderTopNavConnector)
