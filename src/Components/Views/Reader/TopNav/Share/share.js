import React, { Component } from 'react'
import styled from '@emotion/styled'
import { ActionIcon, ActionItem } from '../../../../Elements/NavBar/navBar'
import { Popover, Trigger, Content } from '../../../../Modules/Popover/popover'
import { ShareMenu } from '../../../../Modules/ShareMenu/shareMenu'
import { withLocalize } from 'react-localize-redux'

const ShareMenuWrapper = styled('div')`
  text-align: left;
`

class ShareClass extends Component {
  render() {
    const { translate } = this.props
    return (
      <ActionItem>
        <Popover activateOnClick>
          <Trigger>
            <ActionIcon
              icon="IOSShare"
              tooltip={translate('reader.topNav.share')}
              margin={this.props.iconMargin}
            />
          </Trigger>

          <Content>
            <ShareMenuWrapper>
              <ShareMenu
                item_id={this.props.item_id}
                url={this.props.url}
                isPremium={this.props.isPremium}
                shareItem={this.props.shareItem}
                socialShare={this.props.socialShare}
              />
            </ShareMenuWrapper>
          </Content>
        </Popover>
      </ActionItem>
    )
  }
}

export const Share = withLocalize(ShareClass)
