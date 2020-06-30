import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LanguageToggle } from '../../../../Components/Modules/Localize/localize'
import { appActions } from '../../../../Containers/App/app.state'
import { buttonReset } from '../../../Elements/Buttons/button'
import { getBool } from '../../../../Common/helpers'
import styled from '@emotion/styled'

const DevMenu = styled('div')`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 99999;
  div,
  ul {
    list-style-type: none;
    padding: 10px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
  }
  button {
    ${buttonReset};
    box-sizing: border-box;
    width: 100%;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #ff1493;
    }
  }
  li.active button {
    background-color: grey;
    color: white;
  }
`

export class DevToolsConnector extends PureComponent {
  render() {
    const { devMode, isPremium } = this.props
    return devMode ? (
      <DevMenu>
        <div>
          <button onClick={this.props.togglePremium}>
            {isPremium ? 'Premium' : 'Not Premium'}
          </button>
          <button onClick={this.props.resetActiveHighlights}>
            {'Reset Highlight 1st Time'}
          </button>
          <button onClick={this.props.resetAppVersion}>
            {'Reset App Version'}
          </button>
        </div>
        <LanguageToggle />
      </DevMenu>
    ) : null
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...appActions }, dispatch)
}

function mapStateToProps(state) {
  const { devMode } = state.options
  const isPremium = getBool(state.app.isPremium)
  return { devMode, isPremium }
}

export const DevTools = connect(
  mapStateToProps,
  mapDispatchToProps
)(DevToolsConnector)
