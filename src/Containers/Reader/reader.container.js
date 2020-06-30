import React, { Component } from 'react'
import DOMPurify from 'dompurify'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { readerActions } from './reader.state'
import { itemActions } from '../../Containers/App/Items/item.state'
import { appActions } from '../../Containers/App/app.state'
import { analyticsActions } from '../../Containers/App/Analytics/analytics.state'
import { ReaderView } from '../../Components/Views/Reader/reader.view'
import { getBool } from '../../Common/helpers'

import { ANALYTICS_KEYS } from '../../Common/constants'
const { VIEW, UI } = ANALYTICS_KEYS

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
class ReaderContainer extends Component {
  state = {
    checked: false,
    valid: false
  }

  componentDidMount() {
    window.addEventListener('focus', this.handleFocus)
    const { item_id } = this.props
    this.props.readerViewOpened({ item_id })
    this.checkArticleIsValid()
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.handleFocus)
    this.props.readerViewClosed()
  }

  shouldComponentUpdate(nextProps) {
    // This is in place for deleting an item
    if (this.props.item && !nextProps.item) {
      this.props.readerSetExitMethod({
        item_id: this.props.item_id,
        [UI]: 'toolbar'
      })
      this.props.readerGoBack()
      return false
    }
    return true
  }

  componentDidUpdate(prevProps) {
    const { item } = this.props
    if (!this.state.checked && item) {
      this.checkArticleIsValid()
    }
    this.checkStatusChange(prevProps)
  }

  checkStatusChange(prevProps) {
    if (!prevProps.status) return
    if (prevProps.status !== this.props.status) {
      this.props.readerSetExitMethod({
        item_id: this.props.item_id,
        [UI]: 'toolbar'
      })
      this.props.readerGoBack()
    }
  }

  checkArticleIsValid() {
    const { item } = this.props
    if (!item) return

    const { is_article, has_video, has_image } = item
    const valid = is_article === '1' || has_video === '2' || has_image === '2'

    if (!valid) return this.navigateToPage()

    const cleanTitle = DOMPurify.sanitize(item.resolved_title || item.given_title)
    document.title = `Pocket - ${cleanTitle}`
    this.setState({ checked: true, valid: true })
  }

  handleFocus = () => {
    this.props.readerViewFocused()
  }

  navigateToPage = () => {
    const { given_url } = this.props.item
    this.props.externalLink({
      url: given_url,
      analytics: {
        item_id: this.props.item_id,
        [VIEW]: 'reader'
      }
    })
  }

  render() {
    const {
      item,
      relatedTopics,
      options,
      isPremium,
      saveItemPosition,
      shareItem,
      socialShare,
      addAnnotation,
      deleteAnnotation,
      trackClick
    } = this.props

    return this.state.valid ? (
      <ReaderView
        relatedTopics={relatedTopics}
        options={options}
        isPremium={isPremium}
        item={item}
        saveItemPosition={saveItemPosition}
        shareItem={shareItem}
        socialShare={socialShare}
        addAnnotation={addAnnotation}
        deleteAnnotation={deleteAnnotation}
        trackClick={trackClick}
      />
    ) : null
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  const {
    saveItemPosition,
    shareItem,
    socialShare,
    addAnnotation,
    deleteAnnotation
  } = itemActions
  return bindActionCreators(
    {
      ...readerActions,
      saveItemPosition,
      shareItem,
      socialShare,
      addAnnotation,
      deleteAnnotation,
      ...appActions,
      ...analyticsActions
    },
    dispatch
  )
}

function mapStateToProps(state, ownProps) {
  const { item_id } = ownProps.match.params
  const status = state.items[item_id] ? state.items[item_id].status : null
  const isPremium = getBool(state.app.isPremium)

  return {
    item_id,
    status,
    isPremium,
    item: state.items[item_id],
    relatedTopics: state.reader.relatedTopics,
    options: state.options
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReaderContainer)
