import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { AnnotationMenu } from './annotations.menu'
import { Card, Quote, CreatedDate } from './annotations.card'
import { buttonReset } from '../../../Elements/Buttons/button'
import { Icon } from '../../../Elements/Icons/icon'
import { EmptyList } from './annotations.emptylist'
import { LimitNotice } from './annotations.limit'
import { withLocalize } from 'react-localize-redux'

const ListWrapper = styled('div')`
  height: 100%;
  overflow: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  width: 100%;
  transform: translateX(-500px);
  transition: transform 150ms ease-in-out;
  &.visible {
    transform: translateX(0);
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

const cardStyles = props => css`
  transition: box-shadow 150ms ease-in-out;
  box-shadow: 0 0 0 1px ${props.theme.annotations.border};
  &.active {
    box-shadow: 0 0 0 1px ${props.theme.annotations.borderActive};
  }
`

const Heading = styled('div')`
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  padding: 25px 0 2px 25px;
`

class QuoteListClass extends Component {
  renderCards = () => {
    const { annotations, annotationList, viewPort, translate } = this.props
    const cards = []

    // Map the annotationList (which has vertical position as key)
    // to each matching annotation, and sort by that value
    annotations
      .map(a => {
        let coordY
        Object.keys(annotationList).forEach(key => {
          if (a.annotation_id === annotationList[key].id) {
            coordY = key
          }
        })

        return {
          ...a,
          coordY
        }
      })
      .sort((a, b) => a.coordY - b.coordY)
      .forEach(annot => {
        const className =
          annot.coordY > viewPort.top && annot.coordY < viewPort.bottom
            ? 'active'
            : ''
        cards.push(
          <Card
            onClick={e => e.stopPropagation()}
            key={annot.annotation_id}
            addedStyles={cardStyles}
            className={className}>
            <Quote
              onClick={() => this.props.onClickEvent(annot.coordY)}
              aria-label={translate('annotations.scrollTo')}>
              {annot.quote}
            </Quote>
            <CreatedDate>{annot.created_at}</CreatedDate>

            <MenuWrapper>
              <AnnotationMenu
                annotation_id={annot.annotation_id}
                deleteAnnotation={this.props.deleteAnnotation}
                item_id={this.props.item_id}
                item={this.props.item}
                shareItem={this.props.shareItem}
                socialShare={this.props.socialShare}
                annotation={annot}>
                <MenuTrigger>
                  <Icon name="IOSOverflow" />
                </MenuTrigger>
              </AnnotationMenu>
            </MenuWrapper>
          </Card>
        )
      })

    if (cards.length === 3 && !this.props.isPremium) {
      cards.push(
        <LimitNotice
          key='notice'
          trackClick={this.props.trackClick} />
      )
    }

    return cards.length > 0
      ? cards
      : <EmptyList />
  }

  render() {
    const className = this.props.visible ? 'visible' : ''
    return this.props.annotationList ? (
      <ListWrapper className={className}>
        {this.props.heading && <Heading>{this.props.heading}</Heading>}
        {this.renderCards()}
      </ListWrapper>
    ) : null
  }
}

export const QuoteList = withLocalize(QuoteListClass)
