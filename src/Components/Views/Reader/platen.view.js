import React, { Component } from 'react'
import styled from '@emotion/styled'
import { ItemHeader } from './ItemHeader/itemHeader'
import { Parsed } from './ParsedContent/parsed'
import { AnnotationManager } from './Annotations/manager'
import { FONT_TYPES, FONT_RANGE, COLUMN_WIDTH_RANGE } from '../../../Common/constants'
import { LINE_HEIGHT_RANGE } from '../../../Common/constants'
import { READER_PADDING } from '../../../Common/constants'

const ContentWrapper = styled('div')`
  max-width: ${props => props.width + (READER_PADDING * 2)}px;
  margin: 0 auto;
  padding: 120px 0;
  font-size: ${props => props.fontSize}px;
  font-family: ${props => props.fontFamily};
  line-height: ${props => props.lineHeight};

  header {
    font-family: 'Graphik Web';
    font-size: ${props => props.fontSize}px;
  }
  #RIL_body {
    font-size: ${props => props.fontTypeSize};
  }
`

class PlatenWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: ''
    }
  }

  onTextHighlight = selection => this.setState({ selection })

  render() {
    const {
      item,
      item: {
        item_id,
        item_content,
        images,
        videos,
        positions,
        annotations = []
      },
      options: { fontSize, fontType, columnWidth, lineHeight },
      isPremium,
      scrollValue,
      saveItemPosition,
      shareItem,
      socialShare,
      addAnnotation,
      ...other
    } = this.props

    const fontFamily = FONT_TYPES[fontType].family
    const fontTypeSize = FONT_TYPES[fontType].size
    const size = FONT_RANGE[fontSize]

    return (
      <ContentWrapper
        fontSize={size}
        fontFamily={fontFamily}
        fontType={fontType}
        fontTypeSize={fontTypeSize}
        width={COLUMN_WIDTH_RANGE[columnWidth]}
        lineHeight={LINE_HEIGHT_RANGE[lineHeight]}>
        <ItemHeader item={item} lineHeight={LINE_HEIGHT_RANGE[lineHeight]} />
        {item_content ? (
          <Parsed
            item={item}
            item_id={item_id}
            images={images}
            videos={videos}
            item_content={item_content}
            fontSize={fontSize}
            fontFamily={fontFamily}
            fontType={fontType}
            lineHeight={lineHeight}
            scrollValue={scrollValue}
            positions={positions}
            isPremium={isPremium}
            onTextHighlight={this.onTextHighlight}
            textSelection={this.state.selection}
            saveItemPosition={saveItemPosition}
            shareItem={shareItem}
            socialShare={socialShare}
            addAnnotation={addAnnotation}
            annotations={annotations}
            {...other}
          />
        ) : null}
      </ContentWrapper>
    )
  }
}

export const Platen = AnnotationManager(PlatenWrapper)
