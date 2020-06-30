import React, { Component } from 'react'
import { normalizeURL } from '../../../../Common/helpers'
import { BarActions } from '../../../Elements/NavBar/navBar'
import { ActionList, ActionIcon } from '../../../Elements/NavBar/navBar'
import { NavBarInput } from '../../../Elements/NavBar/navBar'
import { NavClamp } from '../../../Elements/NavBar/navBar.clamp'
import { Brand } from '../../../Elements/NavBar/navBar.brand'
import styled from '@emotion/styled'
import { Button } from '../../../Elements/Buttons/button'
import { KEYS } from '../../../../Common/constants'
import { ANALYTICS_KEYS } from '../../../../Common/constants'
import facepaint from 'facepaint'
import { BREAKPOINTS, SIDEBAR_WIDTH } from '../../../../Common/constants'
import { Translate, withLocalize } from 'react-localize-redux'

const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const { UI, VIEW, LIST_MODE } = ANALYTICS_KEYS

const NavClampFull = styled(NavClamp)`
  ${mq({
    gridTemplateColumns: [
      '30px auto 205px',
      '30px auto 205px',
      `${SIDEBAR_WIDTH + 10}px auto 205px`
    ]
  })};
`

const NavClampMin = styled(NavClamp)`
  grid-template-columns: auto 32px;
`
class NavAddUrlClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  onChange = event => {
    event.preventDefault()
    this.setState({ value: event.target.value })
  }

  onKeyUp = event => {
    switch (event.keyCode) {
      // Handle intent to exit
      case KEYS.ESCAPE: {
        this.setState({ value: '' })
        return
      }

      case KEYS.ENTER: {
        this.handleSave()
        return
      }

      default:
        return
    }
  }

  handleSave = () => {
    const { itemAdd, listMode, subset, since, offset, sort } = this.props

    if (!this.state.value) return this.props.exitAddUrlMode()

    const url = normalizeURL(this.state.value)

    itemAdd({
      url,
      subset,
      since,
      offset,
      sort,
      analytics: {
        [VIEW]: 'list',
        [UI]: 'url',
        [LIST_MODE]: listMode
      }
    })
    this.props.exitAddUrlMode()
  }

  /* Render
  ------------------------------------------------------- */
  render() {
    const { exitAddUrlMode, hasSidebar, translate } = this.props

    const NavLayout = hasSidebar ? NavClampFull : NavClampMin

    return (
      <NavLayout hasSidebar={hasSidebar}>
        {hasSidebar ? (
          <ActionList>
            <Brand hasSidebar={hasSidebar} />
          </ActionList>
        ) : null}
        <NavBarInput>
          <input
            placeholder={` ${translate('addUrl.placeholder')} https://...`}
            autoFocus={true}
            value={this.state.value}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
        </NavBarInput>
        <BarActions>
          {hasSidebar ? (
            <React.Fragment>
              <Button
                onClick={exitAddUrlMode}
                type="neutral"
                margin="0 8px 0 0">
                <Translate id="addUrl.cancel">Cancel</Translate>
              </Button>
              <Button onClick={this.handleSave} type="cta">
                <Translate id="addUrl.save">Save</Translate>
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ActionIcon
                icon="CloseX"
                action={exitAddUrlMode}
                tooltip="exit"
                type="line"
                size="24px"
                margin="0 0 0 8px"
              />
            </React.Fragment>
          )}
        </BarActions>
      </NavLayout>
    )
  }
}

export const NavAddUrl = withLocalize(NavAddUrlClass)
