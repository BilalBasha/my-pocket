import React, { Component } from 'react'
import styled from '@emotion/styled'
import { ScrollTracker } from '../../Modules/ScrollTracker/scrollTracker'
import { ExploreBar } from './Explore/explore'
import { ReaderTopNav } from '../../../Components/Views/Reader/TopNav/nav.top.connector'
import { PremiumFontUpsell } from '../../../Components/Views/Reader/Premium/reader.font.upsell'
import { SentryBoundary } from '../../../Components/Views/App/Errors/error.boundary'
import { Platen } from './platen.view'
import { ReaderBottomUpsell } from './Premium/reader.bottom.upsell'
import { FONT_TYPES } from '../../../Common/constants'

const ReaderWrapper = styled('div')`
  width: 100%;
  min-height: 100vh;
  display: block;
  background: ${props => props.theme.article.background};
`

class Reader extends Component {
  state = {
    annotationsOpen: false
  }

  toggleAnnotations = () => {
    this.setState({ annotationsOpen: !this.state.annotationsOpen })
  }

  get showBottomUpsell() {
    const { isPremium, item } = this.props
    return !isPremium && item && item.item_content
  }

  render() {
    const {
      options: { fontType, columnWidth },
      relatedTopics,
      scrollPercentage,
      isPremium,
      trackClick
    } = this.props

    const { annotationsOpen } = this.state

    const font = FONT_TYPES[fontType]
    const fontFamily = font.family
    const showFontUpsell = !isPremium && font.premium

    return (
      <React.Fragment>
        {showFontUpsell ? <PremiumFontUpsell fontFamily={fontFamily} /> : null}
        <ReaderTopNav
          item_id={this.props.item.item_id}
          scrollPercentage={scrollPercentage}
          annotationsOpen={annotationsOpen}
          toggleAnnotations={this.toggleAnnotations}
        />
        <ReaderWrapper>
          <SentryBoundary>
            <Platen
              {...this.props}
              annotationsOpen={annotationsOpen}
              toggleAnnotations={this.toggleAnnotations}
            />
          </SentryBoundary>
          { this.showBottomUpsell
            ? <ReaderBottomUpsell trackClick={trackClick} columnWidth={columnWidth} />
            : null }
          <ExploreBar
            show={
              this.props.scrollDirection === 'u' ||
              this.props.scrollPercentage === 100
            }
            list={relatedTopics}
          />
        </ReaderWrapper>
      </React.Fragment>
    )
  }
}

export const ReaderView = ScrollTracker(Reader)
