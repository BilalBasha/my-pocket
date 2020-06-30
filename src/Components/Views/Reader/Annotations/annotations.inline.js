import React, { Component } from 'react'
import { css } from '@emotion/core'
import { PositionedAnnotationMenu } from './annotations.menu'
import { FloatingButton } from '../../../Elements/Buttons/button'
import { Icon } from '../../../Elements/Icons/icon'
import { withLocalize } from 'react-localize-redux'

export const InlineHighlightStyle = props => css`
  *::-moz-selection {
    background-color: ${props.theme.body.selection.background} !important;
    color: ${props.theme.body.selection.color} !important;
  }
  *::selection {
    background-color: ${props.theme.body.selection.background} !important;
    color: ${props.theme.body.selection.color} !important;
  }

  .highlight {
    position: relative;
    background-color: ${props.theme.body.highlight.background};
    color: ${props.theme.body.highlight.color};
  }
  a .highlight,
  a.highlight {
    text-shadow: -1px -1px 0 ${props.theme.body.highlight.background},
      1px -1px 0 ${props.theme.body.highlight.background},
      -1px 1px 0 ${props.theme.body.highlight.background},
      1px 1px 0 ${props.theme.body.highlight.background} !important;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 1px,
      ${props.theme.body.highlight.color} 1px,
      ${props.theme.body.highlight.color} 2px,
      rgba(0, 0, 0, 0) 2px
    );
  }

  .highlight-preview {
    background-color: ${props.theme.annotations.preview};
    color: ${props.theme.body.highlight.color};
  }
  a .highlight-preview,
  a.highlight-preview {
    text-shadow: -1px -1px 0 ${props.theme.annotations.preview},
      1px -1px 0 ${props.theme.annotations.preview},
      -1px 1px 0 ${props.theme.annotations.preview},
      1px 1px 0 ${props.theme.annotations.preview} !important;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 1px,
      ${props.theme.body.highlight.color} 1px,
      ${props.theme.body.highlight.color} 2px,
      rgba(0, 0, 0, 0) 2px
    );
  }
`

class InlineAnnotationMenuClass extends Component {
  renderMenus = () => {
    const { annotationList, annotationHovered, translate } = this.props
    const inlineMenus = []

    Object.keys(annotationList).forEach((key, index) => {
      const annotation_id = annotationList[key].id
      const el = document.querySelector(`[annotation_id="${annotation_id}"]`)

      if (el) {
        const { x, y } = el.getBoundingClientRect()

        inlineMenus.push(
          <PositionedAnnotationMenu
            key={index}
            annotation_id={annotation_id}
            top={Math.round(y + window.pageYOffset)} // whole pixels only
            left={x + el.offsetLeft - 35} // 35 adjusts for padding on content
            visible={annotationHovered.id === annotation_id}
            deleteAnnotation={this.props.deleteAnnotation}
            item_id={this.props.item_id}
            item={this.props.item}
            shareItem={this.props.shareItem}
            socialShare={this.props.socialShare}
            annotation={
              this.props.annotations.filter(
                i => i.annotation_id === annotation_id
              )[0]
            }>
            <FloatingButton
              type="neutral"
              data-tooltip={translate('annotations.menu')}
              aria-label={translate('annotations.menu')}>
              <Icon name="IOSOverflow" />
            </FloatingButton>
          </PositionedAnnotationMenu>
        )
      }
    })

    return inlineMenus
  }

  render() {
    return <React.Fragment>{this.renderMenus()}</React.Fragment>
  }
}

export const InlineAnnotationMenu = withLocalize(InlineAnnotationMenuClass)
