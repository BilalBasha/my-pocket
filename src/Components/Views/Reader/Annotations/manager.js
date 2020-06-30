import React, { Component } from 'react'
import styled from '@emotion/styled'
import facepaint from 'facepaint'
import { withLocalize } from 'react-localize-redux'
import {
  highlightAnnotation,
  removeAllHighlights,
  removeHighlight
} from './highlighter'
import { getListPositionByAttr } from '../../../../Common/helpers'
import { Rail } from '../../../Modules/Rail/rail'
import { Tics } from './tics'
import { QuoteList } from './annotations.list'
import { InlineAnnotationMenu } from './annotations.inline'
import { AnnotationPreview } from './annotations.preview'
import { FloatingButton } from '../../../Elements/Buttons/button'
import { Icon } from '../../../Elements/Icons/icon'
import { MAX_ANNOTATIONS_DEFAULT } from '../../../../Common/constants'
import { BREAKPOINTS } from '../../../../Common/constants'
import { ZINDEX } from '../../../../Common/constants'
const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const Wrapper = styled('div')`
  display: flex;
`

const VerticallyCentered = styled('div')`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  opacity: 0;
  transition: opacity 150ms ease-in-out;
  z-index: 1;
`

const SidebarSpacer = styled('div')`
  width: 0;
  transition: width 150ms ease-in-out;
  &.expand {
    ${mq({ width: ['0', '0', '400px'] })}
  }
`

const Sidebar = styled('div')`
  position: fixed;
  z-index: 1;
  left: 0;
  bottom: 0;
  top: 63px;
  height: calc(100% - 63px);
  width: 400px;
  background-color: transparent;
  transition: transform 150ms ease-in-out;
  ${mq({
    transform: [
      'translateX(-325px)',
      'translateX(-315px)',
      'translateX(-315px)'
    ]
  })}
  &.first-time {
    z-index: ${ZINDEX.item.menu + 1};
  }
  &.expand {
    z-index: ${ZINDEX.item.menu + 1};
    transform: translateX(-0px);
  }
  &:hover .slide-toggle,
  &.expand .slide-toggle {
    ${mq({
      opacity: ['0', '1']
    })}
  }
  &:hover .rail-wrapper {
    background-color: ${props => props.theme.annotations.gutter};
    box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.12);
    border-right: 1px solid ${props => props.theme.annotations.gutterActive};
  }
`

export const AnnotationManager = ComponentToWrap => {
  class AnnotationHandler extends Component {
    constructor(props) {
      super(props)
      this.state = {
        firstTime: false,
        annotationList: {},
        annotationHovered: false,
        limitReached: false,
        docHeight: null,
        viewPort: {
          top: 0,
          bottom: Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
          )
        }
      }
    }

    componentDidMount() {
      this.checkDocHeight()
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.isPremium !== prevProps.isPremium &&
        this.props.isPremium &&
        this.state.limitReached
      ) {
        this.props.addAnnotation(this.state.limitReached)
        this.clearAnnotationLimit()
      }

      if (this.props.scrollValue !== prevProps.scrollValue) {
        const viewPort = {
          top: this.props.scrollValue,
          bottom:
            this.props.scrollValue +
            Math.max(
              document.documentElement.clientHeight,
              window.innerHeight || 0
            )
        }
        this.setState({ viewPort })
      }

      if (
        this.props.options.activeHighlight !== prevProps.options.activeHighlight
      ) {
        this.firstTimeTimeout = setTimeout(
          () => this.firstTimeEngaged(false),
          6000
        )
        this.setState({ firstTime: true })
      }

      this.checkDocHeight()
    }

    checkDocHeight = () => {
      let body = document.body,
        html = document.documentElement

      const fullHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )

      if (fullHeight !== this.state.docHeight) {
        this.updateHighlightList()
        this.setState({ docHeight: fullHeight })
      }
    }

    componentWillUnmount() {
      if (this.firstTimeTimeout) clearTimeout(this.firstTimeTimeout)
    }

    annotationLimitReached = req => {
      const { quote, patch } = req
      this.setState({ limitReached: req })

      const highlight = { quote, patch }
      highlightAnnotation(highlight, null, document.body, 'highlight-preview')
    }

    clearAnnotationLimit = () => {
      this.setState({ limitReached: false })
      removeHighlight(document.body, 'highlight-preview')
    }

    addAnnotationPreFlight = req => {
      const { annotations = [] } = this.props.item
      if (
        annotations.length >= MAX_ANNOTATIONS_DEFAULT &&
        !this.props.isPremium
      ) {
        this.annotationLimitReached(req)
      } else {
        this.props.addAnnotation(req)
      }
    }

    updateHighlightList = () => {
      const current = Object.keys(this.state.annotationList).map(
        key => this.state.annotationList[key].id
      )
      const annList = getListPositionByAttr('annotation_id')
      // De-dupe any annotation node references (annotations may cross multiple nodes)
      let unique = {}
      Object.keys(annList).forEach(key => {
        if (
          typeof unique[annList[key]] == 'undefined' ||
          unique[annList[key]] > key
        ) {
          unique[annList[key]] = key
        }
      })
      // unique list uses ID as key, reverse to use y-coord as key
      let reverse = {}
      Object.keys(unique).forEach(
        key => (reverse[unique[key]] = { id: key, new: !current.includes(key) })
      )

      const annotationList = reverse
      this.setState({ annotationList })
    }

    highlightAnnotations = element => {
      removeAllHighlights()
      const { annotations = [] } = this.props.item
      annotations.forEach(highlight => {
        highlightAnnotation(highlight, this.toggleAnnotationHover, element)
      })

      this.updateHighlightList()
    }

    toggleAnnotationHover = e => {
      if (this.state.annotationHovered) {
        this.setState({ annotationHovered: false })
      } else {
        this.setState({
          annotationHovered: {
            id: e.target.getAttribute('annotation_id'),
            event: e
          }
        })
      }
    }

    toggleRail = () => {
      this.props.toggleAnnotations()
    }

    scrollToAnnotation = y => {
      // scroll 100px above item to offset header
      window.scrollTo(0, y - 100)
    }

    firstTimeEngaged = interest => {
      clearTimeout(this.firstTimeTimeout)
      this.setState({ firstTime: false })
      if (interest) this.toggleRail()
    }

    render() {
      const {
        item,
        item: { item_id, annotations = [] },
        isPremium,
        shareItem,
        socialShare,
        deleteAnnotation,
        annotationsOpen,
        trackClick,
        translate
      } = this.props

      const {
        annotationList,
        annotationHovered,
        viewPort,
        docHeight,
        limitReached,
        firstTime
      } = this.state

      const sidebarClassName = firstTime
        ? 'first-time'
        : annotationsOpen
        ? 'expand'
        : ''

      return (
        <Wrapper>
          <SidebarSpacer className={annotationsOpen ? 'expand' : ''} />
          <Sidebar
            className={sidebarClassName}
            onClick={annotationsOpen ? this.toggleRail : null}>
            <Rail
              visible={annotationsOpen}
              clickAction={!annotationsOpen ? this.toggleRail : null}>
              <QuoteList
                annotations={annotations}
                annotationList={annotationList}
                item_id={item_id}
                item={item}
                shareItem={shareItem}
                socialShare={socialShare}
                deleteAnnotation={deleteAnnotation}
                onClickEvent={this.scrollToAnnotation}
                viewPort={viewPort}
                heading={translate('annotations.listHeading')}
                visible={annotationsOpen}
                trackClick={trackClick}
                isPremium={isPremium}
              />
              <Tics
                annotations={annotations}
                annotationList={annotationList}
                onClickEvent={this.scrollToAnnotation}
                viewPort={viewPort}
                item_id={item_id}
                item={item}
                shareItem={shareItem}
                socialShare={socialShare}
                deleteAnnotation={deleteAnnotation}
                visible={!annotationsOpen}
                docHeight={docHeight}
                firstTime={firstTime}
                firstTimeEngaged={this.firstTimeEngaged}
              />
            </Rail>

            <VerticallyCentered className={'slide-toggle'}>
              <FloatingButton
                type="neutral"
                onClick={this.toggleRail}
                aria-label={
                  annotationsOpen
                    ? translate('annotations.hide.aria')
                    : translate('annotations.show.aria')
                }
                data-tooltip={
                  annotationsOpen
                    ? translate('annotations.hide.copy')
                    : translate('annotations.show.copy')
                }>
                <Icon
                  name={annotationsOpen ? 'BackChevron' : 'ForwardChevron'}
                  type="line"
                />
              </FloatingButton>
            </VerticallyCentered>
          </Sidebar>
          {limitReached && !annotationsOpen
            ? (
              <AnnotationPreview
                closeModal={this.clearAnnotationLimit}
                docHeight={docHeight}
                trackClick={trackClick}
              />
            ) : null
          }

          <ComponentToWrap
            {...this.props}
            highlightAnnotations={this.highlightAnnotations}
            addAnnotation={this.addAnnotationPreFlight}
          />

          <InlineAnnotationMenu
            item_id={item_id}
            item={item}
            shareItem={shareItem}
            socialShare={socialShare}
            annotations={annotations}
            annotationList={annotationList}
            annotationHovered={annotationHovered}
            deleteAnnotation={deleteAnnotation}
            isPremium={isPremium}
          />
        </Wrapper>
      )
    }
  }

  return withLocalize(AnnotationHandler)
}
