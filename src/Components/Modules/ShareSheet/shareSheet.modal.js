import React from 'react'
import styled from '@emotion/styled'
import { ShareSheet } from './shareSheet'
import { OverlayBase } from '../../Elements/Overlay/overlay'
import { getImageCacheUrl } from '../../../Common/helpers'
import { KEYS } from '../../../Common/constants'

const Panel = styled('div')`
  ${OverlayBase}
  position: relative;
  border: none;
  width: 500px;
`

export class ShareSheetModal extends React.Component {
  handleKeyStroke = e => {
    if (e.keyCode === KEYS.ESCAPE) this.props.cancelModal()
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyStroke)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyStroke)
  }

  onClose = () => this.props.cancelModal()

  render() {
    const thumbnail =
      this.props.images && this.props.images['1']
        ? getImageCacheUrl(this.props.images['1'].src)
        : null

    return (
      <Panel>
        <ShareSheet
          item_id={this.props.item_id}
          quote={this.props.quote}
          title={this.props.resolved_title || this.props.given_title}
          resolved_url={this.props.resolved_url}
          given_url={this.props.given_url}
          thumbnail={thumbnail}
          onClose={this.onClose}
          recommend={this.props.recommend}
          recent_friends={this.props.recent_friends}
          auto_complete_emails={this.props.auto_complete_emails}
          word_count={this.props.word_count}
          has_video={this.props.has_video}
          videos={this.props.videos}
          confirmModal={this.props.confirmModal}
        />
      </Panel>
    )
  }
}
