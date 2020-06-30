import React, { Component } from 'react'

import { Collection, Reader } from '../../../../Containers/App/app.routes'
import { Sidebar } from '../../../../Components/Views/App/Sidebar/sidebar.connector'
import { TopNav } from '../../../../Components/Views/App/TopNav/nav.top.connector'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../../../../store';

// Styling
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { Themes } from '../../../../Components/Elements/Themes/themes'
import { SizeProvider } from '../../../Modules/Sizes/sizes'
import facepaint from 'facepaint'
import { BREAKPOINTS, SIDEBAR_WIDTH } from '../../../../Common/constants'

// Components
import { DevTools } from '../../../../Components/Views/App/DevTools/devTools'
import { Modal } from 'Containers/App/Modal/modal.container'
import { Toasts } from 'Containers/App/Toasts/toasts.container'

const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const CollectionWrapper = styled('div')`
  ${mq({
    maxWidth: ['375px', '768px', '1152px', '1290px'],
    padding: ['63px 0px 0', '63px 0px 0', '63px 20px 0'],
    gridTemplateColumns: ['0 auto', '0 auto', `${SIDEBAR_WIDTH}px auto`]
  })};
  box-sizing: border-box;
  margin: 0 auto;
  display: grid;
`

const AppWrapper = styled('div')`
  box-sizing: border-box;
  min-height: 100vh;
  background-color: ${props => props.theme.body.background};
  color: ${props => props.theme.body.color};
`

export class AppView extends Component {
  get isDiscover() {
    return /^\/discover\/?(.+)?/.test(this.props.path)
  }

  get isReader() {
    return /^\/read\/?(.+)?/.test(this.props.path)
  }

  render() {
    const { theme, listMode, forceGrid } = this.props
    return (
      <ThemeProvider theme={Themes[theme]}>
        <SizeProvider listMode={listMode} forceGrid={forceGrid}>
          <AppWrapper>
            <ConnectedRouter history={history}>
              <React.Fragment>
                {this.isReader ? (
                  <Reader />
                ) : (
                  <React.Fragment>
                    <TopNav />
                    <CollectionWrapper>
                      <Sidebar />
                      <Collection />
                    </CollectionWrapper>
                  </React.Fragment>
                )}
              </React.Fragment>
            </ConnectedRouter>
            <DevTools />
            <Modal />
            <Toasts />
          </AppWrapper>
        </SizeProvider>
      </ThemeProvider>
    )
  }
}
