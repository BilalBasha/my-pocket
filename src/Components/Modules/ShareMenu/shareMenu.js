import React, { Component } from 'react'
import copy from 'clipboard-copy'
import { Menu } from '../../Elements/Menu/menu'
import { SocialItems } from './shareMenu.social'
import { urlWithPocketRedirect, urlWithPermanentLibrary } from '../../../Common/helpers'
import { getBool } from '../../../Common/helpers'

import { withLocalize } from 'react-localize-redux'

class ShareMenuClass extends Component {
  state = {
    copied: false
  }

  copyLink = () => {
    const { url, quote } = this.props
    const str = quote ? `${quote} [${url}]` : url
    copy(str).then(this.setCopied)
  }
  setCopied = () => {
    this.setState({ copied: true })
  }
  sendToRecommend = () => this.props.shareItem('recommend')
  sendToFriend = () => this.props.shareItem()
  onSocialShare = service => this.props.socialShare(service)

  get articleIcons() {
    const { translate } = this.props
    return [
      {
        icon: 'CopyLink',
        copy: this.state.copied
          ? translate('shareMenu.copied')
          : translate('shareMenu.copy'),
        action: () => this.copyLink()
      },
      {
        icon: 'Recommend',
        copy: translate('shareMenu.recommend'),
        action: () => this.sendToRecommend()
      },
      {
        icon: 'Profile',
        copy: translate('shareMenu.sendToFriend'),
        action: () => this.sendToFriend()
      },
      {
        icon: 'Article',
        copy: translate('shareMenu.permanentCopy.copy'),
        aria: translate('shareMenu.permanentCopy.aria'),
        action: () =>
          window.open(urlWithPermanentLibrary(this.props.item_id), '_blank'),
        isPremium: true
      },
      {
        icon: 'WebView',
        copy: translate('shareMenu.viewOriginal'),
        type: 'solid',
        action: () =>
          window.open(urlWithPocketRedirect(this.props.url), '_blank')
      }
    ]
  }

  get menuItems() {
    return getBool(this.props.isPremium)
      ? this.articleIcons
      : this.articleIcons.filter(item => !item.isPremium)
  }

  render() {
    return (
      <Menu
        menuItems={this.menuItems}
        width={200}
        listMode={this.props.listMode}
        addedStyles={this.props.addedStyles}>
        <SocialItems
          url={this.props.url}
          onSocialShare={this.onSocialShare}
          quote={this.props.quote}
        />
      </Menu>
    )
  }
}
export const ShareMenu = withLocalize(ShareMenuClass)
