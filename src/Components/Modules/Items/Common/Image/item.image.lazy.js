import React from 'react'
import styled from '@emotion/styled'
import { getImageCacheUrl } from '../../../../../Common/helpers'
import { SIZES } from '../../../../../Common/constants'
import { ImageFallback } from './item.image.fallback'

const {
  GRID: { WIDTH, IMAGE_HEIGHT }
} = SIZES.LARGE

const FigureClamp = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  background-position: top;
`

const FigureImageFull = styled('div')`
  background-size: cover;
  background-position: top center;
  width: 100%;
  height: 100%;
  background-image: url('${props => props.imageSrc}');
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
`

const imageSize = {
  width: Math.round(window.devicePixelRatio * WIDTH),
  height: Math.round(window.devicePixelRatio * IMAGE_HEIGHT)
}

export class LazyItemImage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      fullImage: getImageCacheUrl(this.bestImage, imageSize),
      testFallback: true,
      badImage: false
    }
    this.imgLoad = new Image()
  }

  componentWillUnmount() {
    this.cleanUpListeners()
    this.imgLoad.src = ''
  }

  componentDidMount() {
    this.preLoad()
  }

  cleanUpListeners = () => {
    this.imgLoad.removeEventListener('load', this.setLoaded, false)
    this.imgLoad.removeEventListener('error', this.loadFailed, false)
  }

  preLoad = () => {
    // this.badImage()
    this.imgLoad.addEventListener('load', this.setLoaded, false)
    this.imgLoad.addEventListener('error', this.loadFailed, false)
    this.imgLoad.src = this.state.fullImage
  }

  setLoaded = () => {
    this.cleanUpListeners()

    if (this.imgLoad.height < 100 || this.imgLoad.width < 200) {
      return this.badImage()
    }

    this.setState({ loaded: true })
    // TODO: Test Performance for adding this to the stored state
  }

  loadFailed = () => {
    const fallBack = this.fallBack
    if (fallBack && this.state.testFallback) {
      this.setState({
        fullImage: getImageCacheUrl(fallBack, imageSize),
        loadImage: getImageCacheUrl(fallBack, '10x10'),
        testFallback: false
      })
      this.preLoad()
      return
    }
    this.badImage()
  }

  badImage = () => {
    this.setState({ badImage: true })
  }

  get fallBack() {
    const { top_image_url, images } = this.props
    if (!images) return this.badImage()
    return top_image_url ? images[Object.keys(images)[0]].src : false
  }

  get bestImage() {
    const { top_image_url, images, image } = this.props
    if (!top_image_url && !images && !image) return undefined
    return top_image_url
      ? top_image_url
      : image
      ? image.src
      : images[Object.keys(images)[0]].src
  }

  render() {
    const { title, isList } = this.props
    return (
      <FigureClamp>
        {this.state.badImage ? (
          <ImageFallback
            isList={isList}
            item_id={this.props.item_id}
            title={title}
          />
        ) : (
          <FigureImageFull
            style={{ backgroundImage: `url(${this.state.fullImage})` }}
            imageSrc={this.state.fullImage}
          />
        )}
      </FigureClamp>
    )
  }
}
