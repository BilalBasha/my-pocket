import React, { Component } from 'react'
import { ListWrapper, List } from '../../../Modules/List/list.alt'
import { ListHeader } from '../../../Modules/List/Header/list.header'
import { DiscoverItem } from '../../../../Components/Views/Discover/List/list.item'
import { withLocalize } from 'react-localize-redux'
import { Loader, LoadMore } from '../../../Elements/Loader/loader'

class DiscoverListClass extends Component {
  render() {
    const { list, sizes, listEndTrigger, translate, loading } = this.props

    return (
      <ListWrapper>
        <ListHeader title={translate('listHeader.titles.discover')} />
        {list && list.length ? (
          <List
            listMode="grid"
            collectionEndTrigger={listEndTrigger}
            list={list}
            sizes={sizes}
            Item={DiscoverItem}
          />
        ) : null}
        <LoadMore>
          <Loader isVisible={loading} />
        </LoadMore>
      </ListWrapper>
    )
  }
}
export const DiscoverList = withLocalize(DiscoverListClass)
