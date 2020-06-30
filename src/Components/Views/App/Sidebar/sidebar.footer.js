/* eslint  react/jsx-no-target-blank: 0*/
import React from 'react'
import styled from '@emotion/styled'
import { buttonReset } from '../../../Elements/Buttons/button'
import { Translate, withLocalize } from 'react-localize-redux'
import { Popover, Trigger, Content } from '../../../Modules/Popover/popover'

const SideBarFooter = styled('div')`
  padding: 0 0 80px;
  width: 80%;
  a,
  button,
  & > div {
    ${buttonReset};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    align-content: center;
    width: 100%;
    padding: 0 20px 0 10px;
    margin-left: 10px;
    font-weight: 400;
    font-size: 12px;
    line-height: 28px;
    text-decoration: none;
    color: ${props => props.theme.sidebar.menu.button.primary.color};
    &:hover,
    &:active {
      color: ${props => props.theme.sidebar.menu.button.primary.hover};
    }
  }
`

const PopMenu = styled('div')`
  padding: 15px 0;
  a {
    cursor: pointer;
  }
`

class SidebarFooterClass extends React.Component {
  render() {
    return (
      <SideBarFooter>
        <a href="https://getpocket.com/jobs" target="_blank">
          <Translate id="sideBar.footer.careers">Careers at Pocket</Translate>
        </a>
        <a href="https://getpocket.com/sponsor" target="_blank">
          <Translate id="sideBar.footer.sponsor">Become a Sponsor</Translate>
        </a>
        <Popover activateOnClick>
          <Trigger>
            <Translate id="sideBar.footer.more">More Links</Translate>
          </Trigger>
          <Content attachBottom={true}>
            <PopMenu>
              <a href="https://getpocket.com/support/" target="_blank">
                <Translate id="sideBar.footer.help">Get Help</Translate>
              </a>
              <a href="https://getpocket.com/blog/" target="_blank">
                <Translate id="sideBar.footer.blog">Pocket Blog</Translate>
              </a>
              <a href="https://getpocket.com/developer/" target="_blank">
                <Translate id="sideBar.footer.developer">
                  Developer API
                </Translate>
              </a>
              <a href="https://getpocket.com/publisher/" target="_blank">
                <Translate id="sideBar.footer.publisher">Publishers</Translate>
              </a>
              <a href="https://getpocket.com/about" target="_blank">
                <Translate id="sideBar.footer.about">About</Translate>
              </a>
              <a href="https://getpocket.com/tos" target="_blank">
                <Translate id="sideBar.footer.terms">
                  Terms of Service
                </Translate>
              </a>
              <a href="https://getpocket.com/privacy" target="_blank">
                <Translate id="sideBar.footer.privacy">
                  Privacy Policy
                </Translate>
              </a>
            </PopMenu>
          </Content>
        </Popover>
      </SideBarFooter>
    )
  }
}
export const SidebarFooter = withLocalize(SidebarFooterClass)
