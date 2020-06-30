/* eslint  react/jsx-no-target-blank: 0*/
import React from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'
import { Button } from '../../Elements/Buttons/button'
import { OverlayBase } from '../../Elements/Overlay/overlay'
import { Translate, withLocalize } from 'react-localize-redux'
import { LogoAnimated } from '../../Elements/LogoAnimated/logo.animated'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../Common/constants'

const Container = styled('div')`
  ${OverlayBase};
  display: flex;
  flex-direction: column;
  padding: 50px 80px 60px;
  justify-content: center;
  align-items: center;
  max-width: 575px;
  color: ${props => props.theme.whatsnew.color};
  text-align: center;
  .main {
    display: inline-block;
    max-width: 310px;
  }
  h1 {
    font-size: 26px;
    line-height: 22px;
    font-weight: 400;
    color: ${props => props.theme.whatsnew.header};
    margin: 0;
    padding: 18px 0 0;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  p,
  li {
    font-size: 14px;
    line-height: 20px;
  }
  p {
    color: ${props => props.theme.whatsnew.copy};
    font-size: 14px;
    padding: 20px 0 0;
  }
  li {
    color: ${props => props.theme.whatsnew.list};
    padding: 0 0 10px;
    &:before {
      content: '•';
      display: inline-block;
      padding-right: 6px;
    }
  }
  a {
    cursor: pointer;
    color: ${props => props.theme.body.color};
    &:hover {
      color: ${props => props.theme.menu.hover.color};
    }
  }

  footer {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    a,
    button {
      margin: 0 10px;
      min-width: 190px;
      text-decoration: none;
      display: block;
      &:hover {
        text-decoration: none;
      }
    }
  }
`

class WhatsNewClass extends React.Component {
  render() {
    return (
      <Container>
        <LogoAnimated />

        <div className="main">
          <ReactMarkdown source={this.props.notes} />
        </div>

        <footer>
          {!this.props.isPremium ? (
            <a href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.ANNOTATIONS}`} target="_blank">
              <Button type="open">
                <Translate id="whatsNewMenu.getPremium">
                  Get Pocket Premium
                </Translate>
              </Button>
            </a>
          ) : null}
          <Button type="cta" onClick={this.props.onClose}>
            <Translate id="whatsNewMenu.goto">Go to My List</Translate>
          </Button>
        </footer>
      </Container>
    )
  }
}

export const WhatsNew = withLocalize(WhatsNewClass)
