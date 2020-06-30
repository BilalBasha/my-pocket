import React from 'react'
import styled from '@emotion/styled'
import facepaint from 'facepaint'
import { SendToFriend } from './shareSheet.sendtofriend'
import { Button } from '../../Elements/Buttons/button'
import { OverlayBase } from '../../Elements/Overlay/overlay'
import { ItemInfo } from '../../Modules/Items/Common/Info/item.info'
import { Translate, withLocalize } from 'react-localize-redux'
import { validateEmail } from '../../../Common/helpers'

const breakpoints = [576, 768, 992, 1200]
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

const ShareContainer = styled('div')`
  ${OverlayBase};
  padding: 20px 0;
  max-width: 575px;
  color: ${props => props.theme.sharesheet.color};
  h2,
  h3 {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 1em;
    line-height: 1.5em;
  }
  h3 {
    text-transform: uppercase;
    padding-bottom: 1.5em;
  }
`
const ShareHeader = styled('div')`
  font-weight: 600;
  padding: 0 1em 1em;
  border-bottom: 1px solid ${props => props.theme.sharesheet.comment.border};
`
const ShareDetails = styled('div')`
  padding: 1em;
  display: grid;
  ${mq({ gridTemplateColumns: ['1fr', 'auto 120px'] })};
  ${mq({ gridColumnGap: ['0', '20px'] })};
  cite {
    color: ${props => props.theme.sharesheet.color};
    display: block;
    font-weight: 300;
    font-style: normal;
  }
`

const ShareQuote = styled('div')`
  margin: 5px 25px 25px;
  padding: 0 15px;
  border-left: 1px solid ${props => props.theme.menu.color};
  color: ${props => props.theme.menu.color};
  font-style: italic;
`

const ShareThumbnail = styled('div')`
  ${mq({ display: ['none', 'block'] })};
  background-size: cover;
  background-image: url(${props => props.image});
  width: 100%;
  height: 100px;
  border-radius: 4px;
`

const ShareComment = styled('div')`
  padding: 0 1em 1em;
  textarea {
    border: 1px solid ${props => props.theme.sharesheet.comment.border};
    border-radius: 4px;
    box-sizing: border-box;
    color: ${props => props.theme.sharesheet.comment.color};
    font-size: 0.875em;
    padding: 0.8em;
    resize: none;
    width: 100%;
  }
`

const ShareAction = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1em 0.25em;
  button {
    margin-left: 10px;
  }
`

class ShareSheetClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      email: '',
      friends: [],
      emails: []
    }
  }

  onFriendUpdate = email => {
    if (this.state.friends.indexOf(email) > -1) {
      this.removeEmail(email)
    } else {
      this.addEmail(email)
    }
  }

  onSocialShare = () => {
    const { email, emails } = this.state
    const validEmails =
      email && validateEmail(email) ? [...emails, email] : emails
    const recipients = validEmails.map(email => {
      return { email }
    })

    const shareData = {
      item_id: this.props.item_id
    }

    if (this.state.comment) shareData.comment = this.state.comment
    if (this.props.quote) shareData.quote = this.props.quote
    if (recipients.length > 0) shareData.to = recipients
    if (this.props.recommend) shareData.channels = ['public_profile']

    this.props.confirmModal(shareData)
    this.props.onClose()
  }

  handleCommentChange = event => {
    this.setState({ comment: event.target.value })
  }

  handleEmailChange = email => {
    this.setState({ email })
  }

  addEmail = email => {
    this.setState({ email: '' })
    if (this.state.emails.includes(email)) return
    this.setState({ emails: [...this.state.emails, email] })
    this.addFriend(email)
  }

  removeEmail = email => {
    if (!this.state.emails.includes(email)) return
    this.setState({
      emails: this.state.emails.filter(current => current !== email)
    })
    this.removeFriend(email)
  }

  addFriend = friend => {
    const friends = [...this.state.friends, friend]
    this.setState({ friends })
  }

  removeFriend = friend => {
    const friends = this.state.friends.filter(email => email !== friend)
    this.setState({ friends })
  }

  setEmails = emails => {
    this.setState({ emails })
  }

  get canSend() {
    if (this.props.recommend === 'recommend') return true
    if (this.state.friends.length > 0) return true
    if (this.state.emails.length > 0) return true
    if (validateEmail(this.state.email)) return true
    return false
  }

  render() {
    const {
      title,
      recommend,
      quote,
      recent_friends,
      auto_complete_emails,
      thumbnail,
      translate
    } = this.props

    const isRecommend = recommend === 'recommend'

    return (
      <ShareContainer>
        <ShareHeader>
          {isRecommend
            ? translate('share.recommend')
            : translate('share.sendToFriend')}
        </ShareHeader>
        <ShareDetails>
          <header>
            <h2>{title}</h2>
            <ItemInfo {...this.props} noLink={true} />
          </header>
          {thumbnail ? <ShareThumbnail image={thumbnail} /> : null}
        </ShareDetails>

        {quote ? <ShareQuote>{quote}</ShareQuote> : null}

        <ShareComment>
          <textarea
            value={this.state.comment}
            onChange={this.handleCommentChange}
            placeholder={translate('share.commentPlaceholder')}
          />
        </ShareComment>

        {!recommend ? (
          <SendToFriend
            selectedFriends={this.state.friends}
            recent_friends={recent_friends}
            auto_complete_emails={auto_complete_emails}
            onFriendUpdate={this.onFriendUpdate}
            addEmail={this.addEmail}
            removeEmail={this.removeEmail}
            setEmails={this.setEmails}
            emails={this.state.emails}
            value={this.state.email}
            setValue={this.handleEmailChange}
          />
        ) : null}

        <ShareAction>
          <Button
            type="neutral"
            onClick={this.props.onClose}
            aria-label={translate('share.cancelAction')}>
            <Translate id="share.cancelAction">Cancel</Translate>
          </Button>
          <Button
            type={this.canSend ? 'cta' : 'disabled'}
            disabled={!this.canSend}
            onClick={this.onSocialShare}
            aria-label={
              isRecommend
                ? translate('share.recommendAction')
                : translate('share.sendAction')
            }>
            {isRecommend
              ? translate('share.recommendAction')
              : translate('share.sendAction')}
          </Button>
        </ShareAction>
      </ShareContainer>
    )
  }
}

export const ShareSheet = withLocalize(ShareSheetClass)
