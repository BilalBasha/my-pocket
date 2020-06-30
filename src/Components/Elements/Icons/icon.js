import React from 'react'
import styled from '@emotion/styled'
// import manifest from './manifest'

const MissingIcon = styled('span')`
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
  padding: ${props => props.padding};
  margin: ${props => props.margin};
`

export class Icon extends React.PureComponent {
  render() {
    const {
      name,
      size = '1em',
      padding = '0',
      type = 'mini',
      margin = 0
    } = this.props

    // const iconFile = manifest[type]
    let iconFile = 'line.symbols.svg';
    if(type=='mini')
      iconFile = 'mini.symbols.svg';
      
    return name ? (
      <SVGBlock size={size} padding={padding} margin={margin}>
        <use xlinkHref={`/${iconFile}#${name}`} />
      </SVGBlock>
    ) : (
      <MissingIcon />
    )
  }
}
