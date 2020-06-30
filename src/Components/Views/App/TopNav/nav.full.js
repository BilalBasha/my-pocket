/* eslint  react/jsx-no-target-blank: 0*/
import React, { Component } from 'react'
import { ActionList, ActionIcon, BarActions } from '../../../Elements/NavBar/navBar'
import { Brand } from '../../../Elements/NavBar/navBar.brand'
import { NavClamp } from '../../../Elements/NavBar/navBar.clamp'
import { Profile } from '../../../Views/App/TopNav/Profile/profile'
import { Inbox } from '../../../Views/App/TopNav/Inbox/inbox.container'
import { SiteNav } from '../../../Views/App/TopNav/SiteNav/siteNav'
import { ButtonLink } from '../../../Elements/Buttons/button'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../../Common/constants'
import styled from '@emotion/styled'
import { withLocalize, Translate } from 'react-localize-redux'

import facepaint from 'facepaint'
import { BREAKPOINTS, SIDEBAR_WIDTH } from '../../../../Common/constants'
const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const NavClampFull = styled(NavClamp)`
  ${mq({
    gridTemplateColumns: [
      '10px auto 193px',
      '10px auto 193px',
      `${SIDEBAR_WIDTH}px auto 193px`
    ]
  })};
`
const NavLayout = NavClampFull

class NavFullClass extends Component {
  trackPremiumClick = () => {
    this.props.trackClick({
      view: 'web',
      section: '/premium',
      page: 'list',
      identifier: 'click_upsell_top_nav'
    })
  }

  /* Render
  ------------------------------------------------------- */
  render() {
    const {
      isPremium,
      profile_uid,
      profile_avatar,
      profile_first_name,
      profile_username,
      activeTheme,
      themeChange,
      enterSearchMode,
      enterBulkEditMode,
      enterAddUrlMode,
      setSortByOldest,
      setSortByNewest,
      enterListMode,
      enterGridMode,
      openWhatsNew,
      translate,
      listMode,
      sort
    } = this.props
    return (
      <NavLayout>
        <Brand hasSidebar={true} />
        <ActionList>
          <SiteNav />
        </ActionList>
        <BarActions>
          <ActionIcon
            icon="Search"
            action={enterSearchMode}
            tooltip={translate('topNav.tooltips.search')}
            type="line"
            size="24px"
          />
          <ActionIcon
            icon="Plus"
            action={enterAddUrlMode}
            tooltip={translate('topNav.tooltips.saveAUrl')}
            type="line"
            size="24px"
          />
          {this.props.isDiscover ? null : (
            <ActionIcon
              icon="Pencil"
              action={enterBulkEditMode}
              tooltip={translate('topNav.tooltips.bulkEdit')}
              type="line"
              size="24px"
            />
          )}
          <Inbox />
          {isPremium ? null : (
            <ButtonLink
              onClick={this.trackPremiumClick}
              href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.TOP_NAV}`}
              target="_blank"
              style={{ margin: '0 10px', fontSize: '14px' }}
              type="upgrade">
              <Translate id="upsell.upgrade">Upgrade</Translate>
            </ButtonLink>
          )}
          <Profile
            tooltip={translate('topNav.tooltips.account')}
            isPremium={isPremium}
            profile_uid={profile_uid}
            profile_avatar={profile_avatar}
            profile_first_name={profile_first_name}
            profile_username={profile_username}
            activeTheme={activeTheme}
            themeChange={themeChange}
            enterListMode={enterListMode}
            enterGridMode={enterGridMode}
            openWhatsNew={openWhatsNew}
            setSortByOldest={setSortByOldest}
            setSortByNewest={setSortByNewest}
            sort={sort}
            listMode={listMode}
          />
        </BarActions>
      </NavLayout>
    )
  }
}

export const NavFull = withLocalize(NavFullClass)
