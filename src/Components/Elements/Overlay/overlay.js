import { css } from '@emotion/core'

export const OverlayBase = props => css`
  background-color: ${props.theme.overlay.background};
  color: ${props.theme.overlay.color};
  box-shadow: ${props.theme.overlay.shadow};
  border-radius: 4px;
`
