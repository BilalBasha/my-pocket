import React from 'react'
import styled from '@emotion/styled'
import { DivideDot } from '../../../../Elements/Divider/divider'
import { getItemTime } from '../../../../../Common/helpers'

const TimeWrapper = styled('div')`
  display: block;
  color: ${props => props.theme.item.info.time};
`

export const ItemTime = props => {
  const { word_count, has_video, videos } = props
  const timeDisplay = getItemTime({ word_count, has_video, videos }, true)

  return timeDisplay ? (
    <React.Fragment>
      <DivideDot />
      <TimeWrapper>{timeDisplay}</TimeWrapper>
    </React.Fragment>
  ) : null
}
