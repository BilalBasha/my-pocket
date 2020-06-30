import React from 'react'
import styled from '@emotion/styled'
import { ZINDEX } from '../../../../../Common/constants';

const FooterWrapper = styled('div')`
  display: block;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 20px;
  left: 0;
  z-index: ${ZINDEX.item.footer};
`

const FooterInfo = styled('div')`
  display: flex;
  width: 100%;
  line-height: 24px;
  justify-content: ${props =>
    props.listMode === 'list' ? 'flex-end' : 'space-between'};
  flex-direction: ${props =>
    props.listMode === 'list' ? 'row-reverse' : 'row'};
  align-content: center;
  align-items: center;
`

const FooterDivider = styled('div')`
  border-bottom: 1px solid ${props => props.theme.item.footer.border};
  padding-top: 14px;
  display: block;
`

export class ItemFooter extends React.Component {
  render() {
    const { listMode } = this.props
    return (
      <FooterWrapper>
        <FooterInfo listMode={listMode}>{this.props.children}</FooterInfo>
        <FooterDivider />
      </FooterWrapper>
    )
  }
}
