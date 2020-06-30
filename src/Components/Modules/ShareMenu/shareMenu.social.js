import React, { Component } from 'react'
import {
  MenuItemButton,
  MenuItemBlock,
  IconWrapper
} from '../../Elements/Menu/menu.item'
import { Icon } from '../../Elements/Icons/icon'
import { BufferShareButton } from './shareMenu.buffer'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TumblrShareButton
} from 'react-share'

export class SocialItems extends Component {
  render() {
    return (
      <React.Fragment>
        <li>
          <FacebookShareButton
            onShareWindowClose={() => this.props.onSocialShare('facebook')}
            quote={this.props.quote || ''}
            url={this.props.url}>
            <MenuItemButton>
              <IconWrapper>
                <Icon name="Facebook" type="solid" size="24px" />
              </IconWrapper>
              Facebook
            </MenuItemButton>
          </FacebookShareButton>
        </li>
        <li>
          <TwitterShareButton
            onShareWindowClose={() => this.props.onSocialShare('twitter')}
            url={this.props.url}>
            <MenuItemButton>
              <IconWrapper>
                <Icon name="Twitter" type="solid" size="24px" />
              </IconWrapper>
              Twitter
            </MenuItemButton>
          </TwitterShareButton>
        </li>
        <li>
          <LinkedinShareButton
            onShareWindowClose={() => this.props.onSocialShare('linkedin')}
            description={this.props.quote || ''}
            url={this.props.url}>
            <MenuItemButton>
              <IconWrapper>
                <Icon name="LinkedIn" type="solid" size="24px" />
              </IconWrapper>
              LinkedIn
            </MenuItemButton>
          </LinkedinShareButton>
        </li>
        <li>
          <RedditShareButton
            onShareWindowClose={() => this.props.onSocialShare('reddit')}
            url={this.props.url}>
            <MenuItemButton>
              <IconWrapper>
                <Icon name="Reddit" type="solid" size="24px" />
              </IconWrapper>
              Reddit
            </MenuItemButton>
          </RedditShareButton>
        </li>
        <li>
          <TumblrShareButton
            onShareWindowClose={() => this.props.onSocialShare('tumblr')}
            caption={this.props.quote || ''}
            url={this.props.url}>
            <MenuItemButton>
              <IconWrapper>
                <Icon name="Tumblr" type="solid" size="24px" />
              </IconWrapper>
              Tumblr
            </MenuItemButton>
          </TumblrShareButton>
        </li>
        <li>
          <BufferShareButton
            onShareWindowClose={() => this.props.onSocialShare('buffer')}
            text={this.props.quote || ''}
            url={this.props.url}>
            <MenuItemBlock>
              <IconWrapper>
                <Icon name="Buffer" type="solid" size="24px" />
              </IconWrapper>
              Buffer
            </MenuItemBlock>
          </BufferShareButton>
        </li>
      </React.Fragment>
    )
  }
}
