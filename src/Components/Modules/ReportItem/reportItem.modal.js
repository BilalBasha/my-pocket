import React from 'react'
import styled from '@emotion/styled'
import { ReportItem } from './reportItem'
import { OverlayBase } from '../../Elements/Overlay/overlay'

const Panel = styled('div')`
  ${OverlayBase} position: relative;
  border: none;
`

export class ReportItemModal extends React.Component {
  render() {
    return (
      <Panel>
        <ReportItem
          item_id={this.props.item_id}
          cancelModal={this.props.cancelModal}
          confirmModal={this.props.confirmModal}
        />
      </Panel>
    )
  }
}
