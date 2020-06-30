import React, { Component } from 'react'
import { ListWrapper, List } from '../../../Modules/List/list.alt'
import { ListHeader } from '../../../Modules/List/Header/list.header'
import { MyListItem } from '../../../../Components/Views/Collection/List/list.item'
import { shallowArrayEquality } from '../../../../Common/helpers'
import { withLocalize } from 'react-localize-redux'
import { Loader, LoadMore } from '../../../Elements/Loader/loader'
import { Empty } from '../../../../Components/Views/Collection/Empty/empty'

class CollectionListClass extends Component {
  get title() {
    const {
      subset,
      tag,
      searching,
      searchQuery,
      searchResultCount,
      translate
    } = this.props

    const subsetTitles = {
      archive: translate('listHeader.titles.archive'),
      favorites: translate('listHeader.titles.favorites'),
      highlights: translate('listHeader.titles.highlights'),
      articles: translate('listHeader.titles.articles'),
      videos: translate('listHeader.titles.videos'),
      images: translate('listHeader.titles.images'),
      discover: translate('listHeader.titles.discover')
    }

    if (subset === 'tagged') {
      return tag ? tag : translate('listHeader.myList')
    }

    if (subset === 'search') {
      if (searchQuery === '') return translate('listHeader.search')
      if (searching) return translate('listHeader.searching')
      if (searchResultCount) {
        return translate('listHeader.searchResults', { searchResultCount })
      }
      return translate('listHeader.search')
    }

    return subsetTitles[subset] || translate('listHeader.myList')
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.searching !== this.props.searching) return true
    if (nextProps.listMode !== this.props.listMode) return true
    if (nextProps.include !== this.props.include) return true
    if (nextProps.loading !== this.props.loading) return true
    if (nextProps.ready !== this.props.ready) return true

    // List is just a hash table.  Shallow compare is cheap
    const arrayEquality = shallowArrayEquality(nextProps.list, this.props.list)
    if (arrayEquality) return false

    return true
  }

  render() {
    const {
      list,
      listMode,
      collectionEndTrigger,
      searchQuery,
      include,
      setInclude,
      tag,
      subset,
      sort,
      isPremium,
      loading,
      ready
    } = this.props

    return (
      <ListWrapper>
        <ListHeader
          isPremium={isPremium}
          searching={loading}
          searchQuery={searchQuery}
          title={this.title}
          include={include}
          setInclude={setInclude}
          sort={sort}
          subset={subset}
          tag={tag}
        />
        {(list && list.length) || loading ? (
          <List
            list={list}
            listMode={listMode}
            searchQuery={searchQuery}
            collectionEndTrigger={collectionEndTrigger}
            include={include}
            tag={tag}
            subset={subset}
            Item={MyListItem}
          />
        ) : (
          <Empty
            ready={ready}
            subset={this.props.subset}
            query={searchQuery}
            include={include}
            tag={tag}
          />
        )}
        <LoadMore>
          <Loader isVisible={loading} />
        </LoadMore>
      </ListWrapper>
    )
  }
}

export const CollectionList = withLocalize(CollectionListClass)
