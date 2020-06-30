import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { collectionActions } from '../collection.state'
import { optionsActions } from '../../../Containers/App/Options/options.state'
import { CollectionView } from '../../../Components/Views/Collection/collection.view'
import { withRouter } from 'react-router'
import { shallowArrayEquality, getBool } from '../../../Common/helpers'
import { parseListFilterSubType } from '../../../Common/helpers'

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class CollectionContainer extends Component {
  componentDidMount() {
    this.avatar = localStorage.getItem('avatar')
    window.addEventListener('focus', this.handleFocus)
    const { tag, subset, include, sort } = this.props
    if (tag) {
      return this.props.collectionTaggedOpened({ subset, tag, include, sort })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.handleFocus)
  }

  handleFocus = () => {
    const { subset, offset, tag, since, include, sort } = this.props
    const { collectionFocused } = this.props
    collectionFocused({ subset, offset, tag, since, include, sort })
  }

  componentDidUpdate(prevProps) {
    const { tag, subset, include, location, sort } = this.props
    const { collectionTaggedActive, collectionTaggedOpened } = this.props

    const initialTag = tag && !prevProps.tag
    if (initialTag) collectionTaggedOpened({ subset, tag, include, sort })

    const locationChanged = location.pathname !== prevProps.location.pathname
    if (locationChanged) collectionTaggedActive({ subset, tag, include, sort })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.listMode !== this.props.listMode) return true
    if (nextProps.include !== this.props.include) return true
    if (nextProps.tag !== this.props.tag) return true
    if (nextProps.ready !== this.props.ready) return true
    if (nextProps.loading !== this.props.loading) return true

    // List is just a hash table.  Shallow compare is cheap
    const arrayEquality = shallowArrayEquality(nextProps.list, this.props.list)
    if (arrayEquality) return false

    return true
  }

  collectionEndTrigger = () => {
    const { subset, tag, include, offset, sort } = this.props
    const { collectionTaggedEnd } = this.props
    collectionTaggedEnd({ subset, tag, include, offset, sort })
  }

  setInclude = ({ include }) => {
    const { subset, tag, setTaggedInclude, sort } = this.props
    setTaggedInclude({ subset, tag, include, sort })
  }

  render() {
    const {
      list,
      tag,
      refreshCollection,
      showSubset,
      mode,
      enterBulkEditMode,
      subset,
      tagSlug,
      scrollTop,
      saveListScroll,
      sideNavActive,
      listMode,
      include,
      offset,
      since,
      isPremium,
      loading,
      ready
    } = this.props

    return (
      <CollectionView
        loading={loading}
        ready={ready}
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
        scrollTop={scrollTop}
        saveListScroll={saveListScroll}
        sideNavActive={sideNavActive}
        collectionEndTrigger={this.collectionEndTrigger}
        tagSlug={tagSlug}
        tag={tag}
        include={include}
        setInclude={this.setInclude}
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
  const basicState = {
    mode,
    scrollTop,
    sideNavActive,
    listMode,
    sort,
    tagTitle: '',
    tag: '',
    list: [],
    loading: false,
    ready: false
  }

  // Avoid a race condition with tags being setup
  // TODO: be better than this
  const { tagSlug, subType } = ownProps.match.params
  const tagState = state.tags[tagSlug]
  if (!tagState) return basicState

  const collectionState = state.collection.tags[tagSlug]
  if (!collectionState) return basicState

  const include = parseListFilterSubType(subType) || collectionState.include
  const { list, offset, loading, ready } = collectionState[include]
  const tag = tagState.name

  const isPremium = getBool(state.app.isPremium)

  return {
    ...basicState,
    subset: 'tagged',
    list,
    include,
    isPremium,
    offset,
    tag,
    tagSlug,
    since,
    loading,
    ready
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CollectionContainer)
)
