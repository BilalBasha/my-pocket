import React from 'react'
import styled from '@emotion/styled'
import { FONT_DEFAULTS } from '../../../../../Common/constants'

const FallbackContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140%;
  height: 140%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme, color }) =>
    theme.item.image.fallback[color].background};
  color: ${({ theme, color }) => theme.item.image.fallback[color].color};
`

const FallbackLetter = styled('div')`
  text-align: center;
  display: block;
  font-size: ${({ isList }) => (isList ? '12em' : '30em')};
  line-height: 1em;
  font-family: ${FONT_DEFAULTS['serif'].family};
  position: absolute;
  ${({ position }) => position};
`

function getFirstLetter(word) {
  const firstLetterRegEx = /^(\W?)(\w)?/gu
  const firstLetter = firstLetterRegEx.exec(word)[2]
  return firstLetter ? firstLetter.toUpperCase() : false
}

export class ImageFallback extends React.Component {
  get colorFromId() {
    const colorArray = [
      'coral',
      'amber',
      'teal',
      'blue',
      'coral',
      'amber',
      'teal'
    ]
    const idInt = parseInt(this.props.item_id, 10) //! Item Id may not be an int
    const colorIndex = idInt % colorArray.length
    return colorArray[colorIndex || 0]
  }

  get positionFromId() {
    const positionArray = [
      'top:0; right:0',
      'bottom:0; left:0',
      'bottom:0; right:0',
      'top:0; left:0',
      'top:0; left:0',
      'bottom:0; right:0',
      'top:0; right:0'
    ]
    const idInt = parseInt(this.props.item_id, 10) //! Item Id may not be an int
    const positionIndex = idInt % positionArray.length
    return positionArray[positionIndex]
  }

  render() {
    const { title, isList } = this.props
    const letterToRender = getFirstLetter(title)
    const colorFromID = this.colorFromId
    const positionFromID = this.positionFromId
    return (
      <FallbackContainer color={colorFromID}>
        {letterToRender ? (
          <FallbackLetter isList={isList} position={positionFromID}>
            {letterToRender.toUpperCase()}
          </FallbackLetter>
        ) : null}
      </FallbackContainer>
    )
  }
}
