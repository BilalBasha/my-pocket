import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { discoverActions } from './discover.state'
import { optionsActions } from '../../Containers/App/Options/options.state'
import { DiscoverView } from '../../Components/Views/Discover/discover.view'
import { withRouter } from 'react-router'

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class DiscoverContainer extends Component {
  componentWillMount() {
    this.props.discoverOpened()
  }

  render() {
    const {
      list,
      scrollTop,
      saveListScroll,
      discoverEndTrigger,
      loading
    } = this.props

    return (
      <DiscoverView
        loading={loading}
        sizes={this.sizes}
        list={list}
        scrollTop={scrollTop}
        saveListScroll={saveListScroll}
        listEndTrigger={discoverEndTrigger}
      />
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...discoverActions, ...optionsActions }, dispatch)
}

function mapStateToProps(state) {
  return {
    loading: state.discover.loading,
    list: state.discover.feed
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DiscoverContainer)
)
