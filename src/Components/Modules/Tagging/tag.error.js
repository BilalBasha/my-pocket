import React from 'react'
import styled from '@emotion/styled'
import { ZINDEX } from '../../../Common/constants'
import { withLocalize } from 'react-localize-redux'

const TagErrorWrapper = styled('div')`
  background: #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  left: 0;
  margin-top: 0.7em;
  padding: 0.5em 0.7em;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: ${ZINDEX.typeahead};
  & > div {
    transition: width 0.1s linear;
  }
`
const TagError = ({ email, translate }) => {
  const msg = !email
    ? translate('tagging.errors.tagLimit')
    : translate('tagging.errors.validEmail')

  return <TagErrorWrapper>{msg}</TagErrorWrapper>
}

export default withLocalize(TagError)
