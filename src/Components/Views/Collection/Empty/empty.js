import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Button } from '../../../Elements/Buttons/button'
import { withLocalize, Translate } from 'react-localize-redux'
import { Icon } from '../../../Elements/Icons/icon'
import posed, { PoseGroup } from 'react-pose'
import { EmptySearch } from './empty.search'
import { EmptyConfetti } from './empty.confetti'
import { EMPTY_STATE_DELAY } from '../../../../Common/constants'
import { Link } from 'react-router-dom'

const LoadInOut = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 0,
    transition: {
      y: { type: 'spring', stiffness: 400, damping: 35 },
      default: { duration: EMPTY_STATE_DELAY }
    }
  },
  exit: {
    y: -5,
    opacity: 0,
    transition: { duration: 150 }
  }
})

export const EmptyWrapper = styled('div')`
  height: calc(60vh - 63px);
  min-height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`

const EmptyBlock = styled('div')`
  text-align: center;
  max-width: 520px;
  padding: 0;
  figure {
    color: ${({ theme }) => theme.list.empty.figure};
  }
  header {
    display: block;
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    ${({ theme }) => theme.list.empty.header};
    padding-bottom: 10px;
  }
  .copy {
    display: block;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: ${({ theme }) => theme.list.empty.copy};
  }
  .cta {
    padding-top: 20px;
  }
`

class EmptyClass extends Component {
  subsets = {
    unreadNew: {
      icon: () => <Icon type="solid" name="Save" size="32px" />,
      cta: true
    },
    unread: {
      icon: () => <EmptyConfetti />,
      cta: true,
      accent: true
    },
    archive: {
      icon: () => <Icon type="line" name="Archive" size="32px" />
    },
    favorites: {
      icon: () => <Icon type="line" name="Favorite" size="32px" />
    },
    highlights: {
      icon: () => <Icon type="line" name="Highlights" size="32px" />
    },
    tagged: {
      icon: () => <Icon type="line" name="Tag" size="32px" />
    },
    articles: {
      icon: () => <Icon type="line" name="Article" size="32px" />,
      cta: true
    },
    videos: {
      icon: () => <Icon type="line" name="Videos" size="32px" />,
      cta: true
    },
    search: {
      icon: () => <EmptySearch />
    }
  }

  state = { isComplete: false }

  handleComplete = () => {
    this.setState({ isComplete: true })
  }

  render() {
    const { subset, query, ready, translate, tag } = this.props
    if (!this.subsets[subset]) return null

    const isValid = Object.keys(this.subsets).includes(subset)
    const hasCTA = this.subsets[subset].cta
    const include = translate(
      `itemCollection.empty.include.${this.props.include}`
    )

    const Visual = this.subsets[subset].icon

    return isValid ? (
      <PoseGroup>
        {ready && [
          <LoadInOut key="loadInOut" onPoseComplete={this.handleComplete}>
            <EmptyWrapper>
              <EmptyBlock>
                <figure>
                  <Visual />
                </figure>
                <header>
                  <Translate
                    id={`itemCollection.empty.${subset}.header`}
                    data={{ query, include, tag }}>
                    No results
                  </Translate>
                </header>
                <div className="copy">
                  <Translate id={`itemCollection.empty.${subset}.copy`}>
                    No results could be found for this section
                  </Translate>
                </div>
                {hasCTA ? (
                  <div className="cta">
                    <Link to="/discover">
                      <Button type="cta">
                        <Translate id={`itemCollection.empty.${subset}.cta`}>
                          Discover Stories
                        </Translate>
                      </Button>
                    </Link>
                  </div>
                ) : null}
              </EmptyBlock>
            </EmptyWrapper>
          </LoadInOut>
        ]}
      </PoseGroup>
    ) : null
  }
}
export const Empty = withLocalize(EmptyClass)
