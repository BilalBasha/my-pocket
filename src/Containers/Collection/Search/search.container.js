import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { collectionActions } from '../collection.state'
import { optionsActions } from '../../../Containers/App/Options/options.state'
import { CollectionView } from '../../../Components/Views/Collection/collection.view'
import { withRouter } from 'react-router'
import { shallowArrayEquality, getBool } from '../../../Common/helpers'

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class CollectionContainer extends Component {
  componentDidMount() {
    this.avatar = localStorage.getItem('avatar')

    const { searchQuery, subset, include } = this.props
    this.props.openSearch({ value: searchQuery, subset, include })
  }

  collectionEndTrigger = () => {
    const {
      subset,
      collectionSearchEnd,
      searchQuery,
      offset,
      has_more,
      include
    } = this.props
    collectionSearchEnd({
      subset,
      include,
      value: searchQuery,
      offset,
      has_more
    })
  }

  setInclude = ({ include, sort }) => {
    const { searchQuery, setSearchInclude } = this.props
    setSearchInclude({ value: searchQuery, include, sort })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.loading !== this.props.loading) return true
    if (nextProps.ready !== this.props.ready) return true
    if (nextProps.listMode !== this.props.listMode) return true
    if (nextProps.include !== this.props.include) return true
    if (nextProps.sort !== this.props.sort) return true

    // List is just a hash table.  Shallow compare is cheap
    const arrayEquality = shallowArrayEquality(nextProps.list, this.props.list)
    if (arrayEquality) return false

    return true
  }

  render() {
    const {
      list,
      refreshCollection,
      showSubset,
      mode,
      enterBulkEditMode,
      subset,
      tagTitle,
      scrollTop,
      saveListScroll,
      sideNavActive,
      listMode,
      loading,
      ready,
      searchQuery,
      searchResultCount,
      include,
      isPremium,
      sort
    } = this.props

    return (
      <CollectionView
        isPremium={isPremium}
        include={include}
        setInclude={this.setInclude}
        listMode={listMode}
        sizes={this.sizes}
        list={list}
        subset={subset}
        refreshCollection={refreshCollection}
        avatar={this.avatar}
        showSubset={showSubset}
        enterBulkEditMode={enterBulkEditMode}
        mode={mode}
        sort={sort}
        scrollTop={scrollTop}
        saveListScroll={saveListScroll}
        sideNavActive={sideNavActive}
        listEndTrigger={this.collectionEndTrigger}
        tagTitle={tagTitle}
        loading={loading}
        ready={ready}
        searchQuery={searchQuery}
        searchResultCount={searchResultCount}
        collectionEndTrigger={this.collectionEndTrigger}
      />
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...collectionActions, ...optionsActions },
    dispatch
  )
}

function mapStateToProps(state, ownProps) {
  const { mode, scrollTop, sideNavActive } = state.collection.options
  const { listMode } = state.options
  const basicState = { mode, scrollTop, sideNavActive, listMode }

  const { query } = ownProps.match.params
  const { hash } = ownProps.location
  const { list, offset, has_more, include, sort } = state.collection.search
  const { loading, ready } = state.collection.search

  const isPremium = getBool(state.app.isPremium)

  return {
    ...basicState,
    loading,
    ready,
    subset: 'search',
    list,
    offset,
    isPremium,
    has_more,
    include,
    sort,
    searchQuery: query || unescape(hash),
    searchResultCount: state.collection.search.total_result_count
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CollectionContainer)
)
