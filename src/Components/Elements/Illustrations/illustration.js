import React from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
// import manifest from '../Icons/manifest'

const MissingIllustration = styled('span')`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
  background-color: #f00ba2;
`

const SVGBlock = styled('svg')`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  fill: currentColor;
  height: ${props => props.size};
  width: ${props => props.size};
  padding: 0;
  margin: ${props => props.margin};
`

export class IllustrationElement extends React.PureComponent {
  render() {
    const {
      name,
      size = '200px',
      margin = '0',
      theme
    } = this.props

    const iconFile = 'illustration.symbols.svg';

    return name ? (
      <SVGBlock size={size} margin={margin}>
        <use xlinkHref={`/${iconFile}#${name}-${theme}`} />
      </SVGBlock>
    ) : (
      <MissingIllustration />
    )
  }
}

function mapStateToProps(state) {
  const { theme } = state.options
  return {
    theme
  }
}

export const Illustration = connect(
  mapStateToProps
)(IllustrationElement)
