import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { collectionActions } from '../../Containers/Collection/collection.state'
import { optionsActions } from '../../Containers/App/Options/options.state'
import { CollectionView } from '../../Components/Views/Collection/collection.view'
import { withRouter } from 'react-router'
import { shallowArrayEquality, getBool } from '../../Common/helpers'
import { parseListFilterSubType } from '../../Common/helpers'
import { routes } from '../../Containers/App/app.routes'

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class CollectionContainer extends Component {
  componentDidMount() {
    this.avatar = localStorage.getItem('avatar')
    window.addEventListener('focus', this.handleFocus)

    const { subset, offset, since, include, type, sort } = this.props
    this.props.collectionOpened({ subset, offset, since, include, type, sort })
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.handleFocus)
  }

  handleFocus = () => {
    const { subset, offset, since, type, sort } = this.props
    const { collectionFocused } = this.props
    if (!since) return

    collectionFocused({ subset, offset, since, type, sort })
  }

  componentDidUpdate(prevProps) {
    const { subset, location, offset, include, since, type, sort } = this.props
    const { collectionActive } = this.props

    const locationChanged = location.pathname !== prevProps.location.pathname
    if (locationChanged)
      collectionActive({ subset, offset, include, since, type, sort })
  }

  collectionEndTrigger = () => {
    const { subset, collectionEnd, offset, include, type, sort } = this.props
    if (!offset) return
    collectionEnd({ subset, offset, include, type, sort })
  }

  setInclude = ({ include }) => {
    const { subset, tag, collectionInclude, type, sort } = this.props
    collectionInclude({ subset, tag, include, type, sort })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.ready !== this.props.ready) return true
    if (nextProps.loading !== this.props.loading) return true
    if (nextProps.listMode !== this.props.listMode) return true
    if (nextProps.include !== this.props.include) return true
    if (nextProps.subset !== this.props.subset) return true

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
      include,
      tagTitle,
      scrollTop,
      saveListScroll,
      sideNavActive,
      listMode,
      offset,
      since,
      isPremium,
      loading,
      ready
    } = this.props

    return (
      <CollectionView
        ready={ready}
        loading={loading}
        isPremium={isPremium}
        since={since}
        offset={offset}
        listMode={listMode}
        sizes={this.sizes}
        list={list}
        subset={subset}
        refreshCollection={refreshCollection}
        avatar={this.avatar}
        showSubset={showSubset}
        enterBulkEditMode={enterBulkEditMode}
        mode={mode}
        include={include}
        setInclude={this.setInclude}
        scrollTop={scrollTop}
        saveListScroll={saveListScroll}
        sideNavActive={sideNavActive}
        collectionEndTrigger={this.collectionEndTrigger}
        tagTitle={tagTitle}
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
  const { mode, scrollTop, sideNavActive, since } = state.collection.options
  const { listMode, sort } = state.options
  const { subset, type } = ownProps
  const { subType } = ownProps.match.params

  const route = routes.filter(route => route.subset === subset)[0]
  const listState = state.collection[type][subset]
  const prevInclude = route.hasInclude ? listState.include : false
  const include = parseListFilterSubType(subType) || prevInclude
  const { list, offset, loading, ready } = route.hasInclude
    ? listState[include]
    : listState

  const isPremium = getBool(state.app.isPremium)

  return {
    sort,
    ready,
    loading,
    mode,
    include,
    scrollTop,
    sideNavActive,
    listMode,
    subset,
    type,
    list,
    offset,
    since,
    isPremium
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CollectionContainer)
)
