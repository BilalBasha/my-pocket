import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { buttonReset } from '../../../Elements/Buttons/button'
import { CardWrapper, Quote, CreatedDate } from './annotations.card'
import { Icon } from '../../../Elements/Icons/icon'
import { AnnotationMenu } from './annotations.menu'
import { FirstTime } from './annotations.firsttime'

const TicTray = styled('div')`
  position: absolute;
  z-index: 2;
  top: 0;
  width: 100%;
  transform: translateX(-500px);
  transition: transform 200ms ease-in-out;
  &.visible {
    transform: translateX(0);
    transition-delay: 70ms;
  }
`

const Tic = styled('div')`
  position: absolute;
  top: ${props => props.top}px;
  left: 0;
  padding: 3px 0;
  width: 100%;
  z-index: 100;
  cursor: pointer;
  transition: transform 0 ease-in-out;
  &, &.loading {
    transform: translate(-100px, 0);
  }
  &.active {
    transition: transform 250ms ease-in-out;
    transform: translate(5px, -2px);
  }
  &.loaded {
    transition: transform 250ms ease-in-out;
    transform: translate(0, 0);
  }
`

const Anchor = styled('div')`
  position: relative;
  width: calc(100% - 6px);
  height: 3px;
  background-color: ${props => props.theme.annotations.bright};
  border-radius: 0 4px 4px 0;
`

export const FlyAway = styled('div')`
  padding: 0 20px;
  position: absolute;
  transition: transform 150ms ease-in-out,
    opacity 125ms ease-in-out 0ms;
  transform: translate(250px, -30px);
  pointer-events: none;
  opacity: 0;
  &.show {
    transform: translate(350px, -30px);
    opacity: 1;
    pointer-events: auto;
    transition: transform 150ms ease-in-out,
      opacity 100ms ease-in-out 50ms;
  }
`

const MenuWrapper = styled('div')`
  position: absolute;
  bottom: 15px;
  right: 20px;
`

const MenuTrigger = styled('div')`
  ${buttonReset};
  height: 24px;
  cursor: pointer;
  color: ${props => props.theme.item.menu.trigger.color};
  &:hover {
    color: ${props => props.theme.item.menu.button.hover};
  }
`

const floatingCardStyles = props => css`
  box-shadow: ${props.theme.overlay.shadow};
`

class Card extends Component {
  render() {
    const { annotation, show } = this.props
    return annotation ? (
      <CardWrapper addedStyles={floatingCardStyles} show={show} arrow>
        <Quote>{annotation.quote}</Quote>
        <CreatedDate>{annotation.created_at}</CreatedDate>
        <MenuWrapper>
          <AnnotationMenu
            annotation_id={annotation.annotation_id}
            deleteAnnotation={this.props.deleteAnnotation}
            item_id={this.props.item_id}
            item={this.props.item}
            shareItem={this.props.shareItem}
            socialShare={this.props.socialShare}
            annotation={annotation}>
            <MenuTrigger>
              <Icon name="IOSOverflow" />
            </MenuTrigger>
          </AnnotationMenu>
        </MenuWrapper>
      </CardWrapper>
    ) : null
  }
}

class HighlightIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      loading: props.new
    }
  }

  componentDidMount() {
    if (this.state.loading) this.setState({ loading: false })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled && nextProps.disabled) {
      this.closeMenu()
    }

    if (nextProps.new !== this.props.new && nextProps.new) {
      this.setState({ loading: true })
      setTimeout(() => this.setState({ loading: false }), 1)
    }
  }

  itemHoverOn = () => {
    if (!this.props.disabled) this.setState({ hover: true })
  }

  itemHoverOff = () => {
    this.closeMenu()
  }

  closeMenu = () => {
    const state = this.state
    if (state.hover) this.setState({ hover: false, share: false })
  }

  onItemClick = e => {
    e.stopPropagation()
    this.props.onClickEvent(this.props.yCoord)
  }

  render() {
    const {
      annotation,
      yCoord,
      top,
      viewPort,
      shareItem,
      socialShare,
      deleteAnnotation,
      item_id,
      item
    } = this.props
    const onScreen = yCoord > viewPort.top && yCoord < viewPort.bottom
    const activeClass = onScreen ? 'active' : 'loaded'
    const className = this.state.loading ? 'loading' : activeClass
    const show = this.state.hover ? 'show' : ''

    return (
      <Tic
        top={top}
        onMouseEnter={this.itemHoverOn}
        onMouseLeave={this.itemHoverOff}
        onClick={this.onItemClick}
        className={className}>
        <Anchor>
          <FlyAway className={show}>
            <Card
              annotation={annotation}
              active={onScreen}
              shareItem={shareItem}
              socialShare={socialShare}
              deleteAnnotation={deleteAnnotation}
              item_id={item_id}
              item={item}
              show={show}
            />
          </FlyAway>
          { this.props.children }
        </Anchor>
      </Tic>
    )
  }
}

export class Tics extends Component {
  renderTics = () => {
    const screenHeight =
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0) -
      93 // 63 for navbar height, 30 for extra top and bottom padding

    const {
      annotationList,
      onClickEvent,
      viewPort,
      annotations,
      shareItem,
      socialShare,
      deleteAnnotation,
      item_id,
      item,
      docHeight,
      visible,
      firstTime,
      firstTimeEngaged
    } = this.props
    const tics = []
    let showFirstTime = firstTime

    Object.keys(annotationList).forEach((key, index) => {
      let percent = key / docHeight
      let top = Math.round(percent * screenHeight) + 15 // top padding

      tics.push(
        <HighlightIndex
          key={index}
          yCoord={key}
          annotation_id={annotationList[key].id}
          top={top}
          annotation={
            annotations.filter(
              i => i.annotation_id === annotationList[key].id
            )[0]
          }
          onClickEvent={onClickEvent}
          viewPort={viewPort}
          shareItem={shareItem}
          socialShare={socialShare}
          deleteAnnotation={deleteAnnotation}
          item_id={item_id}
          item={item}
          disabled={!visible || firstTime}
          new={annotationList[key].new}
        >
          { showFirstTime && <FirstTime clickEvent={firstTimeEngaged} /> }
        </HighlightIndex>
      )
      showFirstTime = false
    })

    return tics
  }

  render() {
    const className = this.props.visible ? 'visible' : ''
    return <TicTray className={className}>{this.renderTics()}</TicTray>
  }
}
