import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { LazyItemImage } from './item.image.lazy'
import { Icon } from '../../../../Elements/Icons/icon'
import facepaint from 'facepaint'
import { BREAKPOINTS } from '../../../../../Common/constants'
const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const ItemFigureList = () => css`
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
  margin-left: 40px;
  margin: 0 0 0 40px;
  ${mq({
    width: ['60px', '125px'],
    height: ['60px', '84px'],
    minHeight: ['60px', '84px']
  })};
`

const ItemFigureGrid = () => css`
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
  margin: 0 0 16px 0;
  width: 100%;
  ${mq({
    height: ['220px', '136px', '170px', '220px'],
    minHeight: ['220px', '136px', '170px', '220px']
  })};
`

const ItemFigure = styled('figure')`
  ${({ isList }) => (isList ? ItemFigureList : ItemFigureGrid)};
`

const VideoIndicator = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.theme.item.video.play.color};
  background: ${props => props.theme.item.video.play.background};
  border-radius: 60%;
  display: flex;
  align-content: center;
  align-items: center;
  padding: ${props => (props.isList ? '8px' : '18px')};
  font-size: ${props => (props.isList ? '14px' : '24px')};
  svg {
    width: ${props => (props.isList ? '12px' : '18px')};
    height: ${props => (props.isList ? '12px' : '18px')};
  }
`

export class ItemImage extends React.Component {
  get isVideo() {
    return this.props.has_video === '2'
  }

  render() {
    const { title, resolved_title, given_title, listMode } = this.props
    const isList = listMode === 'list'

    return (
      <ItemFigure
        isList={isList}
        sizes={this.props.sizes}
        imageType={this.props.imageType}
        cardType={this.props.cardType}
        full={this.props.full}>
        <LazyItemImage
          isList={isList}
          item_id={this.props.item_id}
          title={title || resolved_title || given_title}
          image={this.props.image}
          images={this.props.images}
          resolved_url={this.props.resolved_url}
          top_image_url={this.props.top_image_url}
          has_image={this.props.has_image}
        />
        {this.isVideo && (
          <VideoIndicator isList={isList}>
            <Icon type="solid" name="Play" />
          </VideoIndicator>
        )}
      </ItemFigure>
    )
  }
}
