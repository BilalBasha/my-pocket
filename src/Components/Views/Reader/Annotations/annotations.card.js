import React, { Component } from 'react'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { FONT_DEFAULTS } from '../../../../Common/constants'
import { buttonReset } from '../../../Elements/Buttons/button'
import { Translate, withLocalize } from 'react-localize-redux'

export const Card = styled('div')`
  font-family: ${FONT_DEFAULTS['serif'].family};
  position: relative;
  margin: 10px 20px;
  padding: 20px;
  border-top: 4px solid ${props => props.theme.annotations.bright};
  border-radius: 4px;
  transform: translateY(${props => props.topAdj}px);
  background-color: ${props => props.theme.sharesheet.background};
  &.arrow:before {
    content: '';
    position: absolute;
    top: ${props => Math.abs(props.topAdj) + 10}px;
    left: -8px;
    width: 0;
    height: 0;
    border-bottom: 8px solid transparent;
    border-right: 8px solid ${props => props.theme.sharesheet.background};
    border-top: 8px solid transparent;
    filter: drop-shadow(-6px 0 4px rgba(0, 0, 0, 0.12));
  }
  ${props => props.addedStyles}
`

export const Quote = styled('button')`
  ${buttonReset};
  line-height: 25px;
  font-size: 18px;
  margin: 0;
  cursor: pointer;
`

export const StyledDate = styled('p')`
  font-family: ${FONT_DEFAULTS['sans'].family};
  line-height: 16px;
  font-size: 12px;
  color: ${props => props.theme.annotations.metaColor};
  margin: 24px 0 0;
`

export class CreatedDateClass extends Component {
  getValue(val) {
    if (!val) {
      return <Translate id="time.now">Just now</Translate>
    }

    const now = dayjs()
    const ts = dayjs(val)
    const diff = now.diff(ts, 'day')

    if (diff < 1) {
      return <Translate id="time.addedtoday">Added Today</Translate>
    } else if (diff === 1) {
      let date = diff
      return (
        <Translate id="time.addeddayago" data={{ date }}>
          Added ${date} day ago
        </Translate>
      )
    } else if (diff < 7) {
      let date = diff
      return (
        <Translate id="time.addeddaysago" data={{ date }}>
          Added ${date} days ago
        </Translate>
      )
    }

    let date = ts.format('MMM D, YYYY')
    return (
      <Translate id="time.added" data={{ date }}>
        Added ${date}
      </Translate>
    )
  }

  render() {
    const { children } = this.props
    return <StyledDate>{this.getValue(children)}</StyledDate>
  }
}
export const CreatedDate = withLocalize(CreatedDateClass)

export class CardWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topAdj: null
    }
  }

  componentDidMount() {
    if (this.props.show) {
      this.setTopAdjustment()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show
      && this.props.show
      && !this.state.topAdj) {
      this.setTopAdjustment()
    }
  }

  setTopAdjustment() {
    if (this.contentNode) {
      let docHeight =
        window.innerHeight || document.documentElement.clientHeight
      let { top, bottom } = this.contentNode.getBoundingClientRect()

      const topAdj =
        top < 63
          ? Math.abs(63 - top)
          : bottom > docHeight
          ? -Math.abs(bottom - docHeight)
          : 0

      this.setState({ topAdj })
    }
  }

  render() {
    const className = this.props.arrow ? 'arrow' : ''

    return (
      <Card
        className={className}
        topAdj={this.state.topAdj}
        ref={node => (this.contentNode = node)}
        addedStyles={this.props.addedStyles}>
        {this.props.children}
      </Card>
    )
  }
}
