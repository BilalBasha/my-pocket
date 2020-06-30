import React, { Component } from 'react'
import styled from '@emotion/styled'
import { getScrollTop } from '../../../../Common/helpers'
import { CollectionList } from '../../../Views/Collection/List/list'
import { SentryBoundary } from '../../../../Components/Views/App/Errors/error.boundary'
import * as Sentry from '@sentry/browser'
import ScrollManager from '../../../Modules/ScrollManager/scrollmanager'

const MainWrapper = styled('div')`
  grid-column-start: 2;
`

export class CollectionView extends Component {
  componentDidMount() {
    try {
      const { scrollTop } = this.props
      const top = scrollTop || 0
      window.scrollTo(0, top)
    } catch (error) {
      process.env.NODE_ENV !== 'production'
        ? console.log(error)
        : Sentry.captureException(error)
    }
  }

  componentWillUnmount() {
    const top = getScrollTop()
    this.props.saveListScroll(top)
  }

  render() {
    const {
      list,
      listMode,
      subset,
      tag,
      enterBulkEditMode,
      scrollTop,
      saveListScroll,
      collectionEndTrigger,
      searching,
      searchQuery,
      searchResultCount,
      include,
      setInclude,
      isPremium,
      sort,
      loading,
      ready
    } = this.props

    return (
      <MainWrapper>
        <SentryBoundary>
          <ScrollManager scrollKey={`${subset}${tag}-${include}`} />
          <CollectionList
            ready={ready}
            loading={loading}
            sort={sort}
            isPremium={isPremium}
            listMode={listMode}
            list={list}
            include={include}
            setInclude={setInclude}
            subset={subset}
            tag={tag}
            searching={searching}
            searchQuery={searchQuery}
            searchResultCount={searchResultCount}
            enterBulkEditMode={enterBulkEditMode}
            scrollTop={scrollTop}
            saveListScroll={saveListScroll}
            collectionEndTrigger={collectionEndTrigger}
          />
        </SentryBoundary>
      </MainWrapper>
    )
  }
}
