import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Icon } from '../../Elements/Icons/icon'
import { Button } from '../../Elements/Buttons/button'
import { OverlayBase } from '../../Elements/Overlay/overlay'
import { Translate, withLocalize } from 'react-localize-redux'

const ReportItemContainer = styled('div')`
  ${OverlayBase};
  padding: 20px;
  width: 280px;
  color: ${props => props.theme.reportItem.color};
  h2,
  h3 {
    margin: 0;
    padding: 0 0 16px;
    font-weight: 600;
    font-size: 1em;
    line-height: 1.5em;
  }
`

const ReasonList = styled('div')``

const Reason = styled('div')`
  display: block;
  padding: 8px 0;
  cursor: pointer;
`

const SelectorWrapper = styled('div')`
  display: inline-block;
  color: ${props =>
    props.active
      ? props.theme.reportItem.selector.active
      : props.theme.reportItem.selector.color};
`

const Actions = styled('div')`
  padding: 24px 0 0;
  display: flex;
  justify-content: space-between;
`

const Disclaimer = styled('a')`
  display: block;
  text-align: center;
  font-size: 12px;
  padding: 24px 0 0;
  color: ${props => props.theme.body.link.color};
  &:hover {
    color: ${props => props.theme.body.link.hover};
  }
`

function Selector({ active }) {
  return (
    <SelectorWrapper active={active}>
      {active ? (
        <Icon type="solid" name="CheckFilled" size="24px" margin="0 8px 0 0" />
      ) : (
        <Icon type="line" name="CheckOpen" size="24px" margin="0 8px 0 0" />
      )}
    </SelectorWrapper>
  )
}
class ReportItemClass extends Component {
  state = { reason: false }

  notInteresting = () => this.setState({ reason: 'not_interesting' })
  alreadySeen = () => this.setState({ reason: 'already_seen' })
  offensive = () => this.setState({ reason: 'offensive' })
  spam = () => this.setState({ reason: 'spam' })
  onSubmit = () => this.props.confirmModal({ reason: this.state.reason })

  render() {
    const { reason } = this.state
    return (
      <ReportItemContainer>
        <h2>
          <Translate id="itemDiscover.hide.whyHide">
            Why are you hiding this item?
          </Translate>
        </h2>
        <ReasonList>
          <Reason onClick={this.notInteresting}>
            <Selector active={reason === 'not_interesting'} />
            <Translate id="itemDiscover.hide.notInteresting">
              This is not interesting
            </Translate>
          </Reason>
          <Reason onClick={this.alreadySeen}>
            <Selector active={reason === 'already_seen'} />
            <Translate id="itemDiscover.hide.alreadySeen">
              I've already seen this
            </Translate>
          </Reason>
          <Reason onClick={this.offensive}>
            <Selector active={reason === 'offensive'} />
            <Translate id="itemDiscover.hide.offensive">
              This is offensive
            </Translate>
          </Reason>
          <Reason onClick={this.spam}>
            <Selector active={reason === 'spam'} />
            <Translate id="itemDiscover.hide.spam">This is spam</Translate>
          </Reason>
        </ReasonList>
        <Actions>
          <Button type="neutral" onClick={this.props.cancelModal}>
            <Translate id="itemDiscover.hide.cancel">Cancel</Translate>
          </Button>
          {
            <Button
              type={!this.state.reason ? 'disabled' : 'warn'}
              onClick={this.onSubmit}
              disabled={!this.state.reason}>
              <Translate id="itemDiscover.hide.remove">Remove Item</Translate>
            </Button>
          }
        </Actions>

        <Disclaimer href="http://help.getpocket.com/customer/portal/articles/2061219">
          <Translate id="itemDiscover.hide.whyRecommended">
            Why was this item recommended to me?
          </Translate>
        </Disclaimer>
      </ReportItemContainer>
    )
  }
}

export const ReportItem = withLocalize(ReportItemClass)
