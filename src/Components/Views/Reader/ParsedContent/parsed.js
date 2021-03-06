import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { loadParsedImages } from './images'
import { loadParsedVideos } from './videos'
import { ParsedContent } from './content'
import * as Sentry from '@sentry/browser'

import { SelectionPopover } from '../../../Modules/SelectionPopover/selectionPopover'
import { requestAnnotationPatch } from '../Annotations/highlighter'
import { getListPositionByAttr } from '../../../../Common/helpers'
import { READER_PADDING } from '../../../../Common/constants'

import DOMPurify from 'dompurify'

const Container = styled('div')`
  padding: 0 ${READER_PADDING}px;
  position: relative;
`

export class Parsed extends Component {
  state = {
    scrollList: {},
    textHighlighted: false
  }

  componentWillMount() {
    const { images } = this.props
    if (images) loadParsedImages(images)
  }

  componentDidMount() {
    const { videos } = this.props
    if (videos) loadParsedVideos(videos)

    const scrollList = getListPositionByAttr('nodeindex')
    this.setState({ scrollList })

    this.checkScrollPosition(this.props.positions, scrollList)

    if (this.props.item_content) {
      this.externalizeLinks()
    }

    if (this.props.annotations) {
      // Timeout allows moment for images to load
      setTimeout(() => this.props.highlightAnnotations(this.contentNode), 300)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollValue !== prevProps.scrollValue) {
      this.checkPositioning(this.props.scrollValue)
    }

    if (this.props.item_content !== prevProps.item_content) {
      this.externalizeLinks()
    }

    if (this.props.annotations.length !== prevProps.annotations.length) {
      this.props.highlightAnnotations(this.contentNode)
    }
  }

  externalizeLinks() {
    const links = this.contentNode.querySelectorAll('a[nodeindex]')
    links.forEach(link => {
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')
    })
  }

  checkScrollPosition(position, list) {
    try {
      if (position && position[1] && list) {
        const top =
          Object.keys(list).find(key => list[key] === position[1].node_index) ||
          0

        window.scrollTo(0, top)
      }
    } catch (error) {
      process.env.NODE_ENV !== 'production'
        ? console.log(error)
        : Sentry.captureException(error)
    }
  }

  checkPositioning(val) {
    let list = Object.keys(this.state.scrollList)
    // https://stackoverflow.com/questions/37219933/get-closest-number-of-array
    let closest =
      val -
      list.reduce((c, v) => {
        return val >= v ? Math.min(val - v, c) : c
      }, 1e100)

    if (
      this.state.scrollList[closest] &&
      this.state.scrollList[closest] !== this.state.curNode
    ) {
      this.setState({ curNode: this.state.scrollList[closest] })

      this.props.saveItemPosition({
        item_id: this.props.item_id,
        view: 1,
        node_index: this.state.scrollList[closest],
        time: Math.round(Date.now() / 1000)
      })
    }
  }

  toggleHighlight = () => {
    const selection = window.getSelection()
    const selectionString = selection.toString()
    if (selectionString) {
      this.setState({ textHighlighted: selection })
      this.props.onTextHighlight(selectionString)
    } else if (this.state.textHighlighted) {
      this.setState({ textHighlighted: false })
      this.props.onTextHighlight('')
    }
  }

  clearSelection = () => {
    window.getSelection().removeAllRanges()
    this.toggleHighlight()
  }

  render() {
    const {
      item_content,
      fontSize,
      fontType,
      textSelection,
      shareItem,
      socialShare,
      addAnnotation,
      item_id,
      recent_friends,
      item,
      isPremium
    } = this.props

    return (
      <Container onMouseUp={this.toggleHighlight}>
        <ParsedContent
          ref={node => (this.contentNode = node)}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item_content) }}
          fontSize={fontSize}
          fontType={fontType}
          role="main"
        />
        {this.state.textHighlighted && (
          <SelectionPopover
            anchor={this.state.textHighlighted}
            disablePopup={this.clearSelection}
            shareItem={shareItem}
            socialShare={socialShare}
            addAnnotation={addAnnotation}
            requestPatch={requestAnnotationPatch}
            textSelection={textSelection}
            item_id={item_id}
            recent_friends={recent_friends}
            item={item}
            isPremium={isPremium}
          />
        )}
      </Container>
    )
  }
}

Parsed.propTypes = {
  itemData: PropTypes.object,
  fontSize: PropTypes.number,
  fontType: PropTypes.string,
  scrollValue: PropTypes.number,
  saveItemPosition: PropTypes.func
}
