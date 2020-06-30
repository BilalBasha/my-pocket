import React, { Component } from 'react'
import styled from '@emotion/styled'
import { getScrollTop } from '../../../Common/helpers'
import { DiscoverList } from '../../../Components/Views/Discover/List/list'
import { SentryBoundary } from '../../../Components/Views/App/Errors/error.boundary'
import * as Sentry from '@sentry/browser'

const MainWrapper = styled('div')`
  grid-column-start: 2;
`

export class DiscoverView extends Component {
  componentDidMount() {
    try {
      const { scrollTop } = this.props
      const top = scrollTop || 0
      window.scrollTo(0, top)
    } catch (error) {
      process.env.NODE_ENV !== 'production'
        ? console.log(error)
        : Sentry.captureException(error)
    }
  }

  componentWillUnmount() {
    const top = getScrollTop()
    this.props.saveListScroll(top)
  }

  render() {
    const { list, listEndTrigger, loading } = this.props
    return (
      <MainWrapper>
        <SentryBoundary>
          <DiscoverList
            loading={loading}
            list={list}
            listEndTrigger={listEndTrigger}
          />
        </SentryBoundary>
      </MainWrapper>
    )
  }
}
