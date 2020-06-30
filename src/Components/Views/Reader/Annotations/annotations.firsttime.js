import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Translate, withLocalize } from 'react-localize-redux'
import { Icon } from '../../../Elements/Icons/icon'
import { FlyAway } from './tics'

const FirstTimeCard = styled('div')`
  width: 230px;
  position: relative;
  box-shadow: ${props => props.theme.overlay.shadow};
  background-color: #116A65;
  color: #FFF;
  font-size: 14px;
  line-height: 20px;
  padding: 20px 45px 20px 20px;
  border-radius: 4px;
  transform: translateY(${props => props.topAdj}px);
  &:before {
    content: '';
    position: absolute;
    top: ${props => Math.abs(props.topAdj) + 25}px;
    left: -8px;
    width: 0;
    height: 0;
    border-bottom: 8px solid transparent;
    border-right: 8px solid #116A65;
    border-top: 8px solid transparent;
  }
`

const IconWrapper = styled('div')`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
  font-size: ${props => (props.size ? props.size : 16)}px;
  display: block;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: ${({ theme }) => theme.body.link.color};
  }
`

class FirstTimeClass extends Component {
  state = {
    topAdj: 0
  }

  componentDidMount() {
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

  closeModal = e => {
    e.stopPropagation()
    this.props.clickEvent(false) // dismiss
  }

  clickEvent = () => {
    this.props.clickEvent(true) // interested
  }

  render() {
    return (
      <FlyAway className={'show'} onClick={this.clickEvent}>
        <FirstTimeCard
          topAdj={this.state.topAdj}
          ref={node => (this.contentNode = node)}
        >
          <IconWrapper onClick={this.closeModal}>
            <Icon name="CloseX" size="13px" type="mini" />
          </IconWrapper>
          <Translate id="highlightLimit.first">
            You created your first highlight. Click here to see it
            alongside other highlights you create in this article.
          </Translate>
        </FirstTimeCard>
      </FlyAway>
    )
  }
}

export const FirstTime = withLocalize(FirstTimeClass)
