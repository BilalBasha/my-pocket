import React from 'react'
import styled from '@emotion/styled'

const LinkWrapper = styled('a')`
  font-family: "Graphik Web";
  font-weight: 500;
  line-height: 132%;
  margin: ${props => props.margin};
  color: ${props => props.theme.cta.color};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.cta.hover};
    text-decoration: underline;
  }
`

const IconWrap = styled('span')`
  display: inline-block;
  margin-left: 5px;
  vertical-align: text-bottom;
`

export const ArrowLink = (props) => {
  const {
    href,
    target,
    children,
    margin,
    onClick
  } = props

  return (
    <LinkWrapper
      href={href}
      target={target}
      margin={margin}
      onClick={onClick}>
      { children }
      <IconWrap>
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8466 7.10989L1.59852 7.10989C0.800495 7.10989 0.800495 5.89011 1.59852 5.89011L10.8466 5.89011L6.87096 2.05214C6.27532 1.47713 7.16877 0.614618 7.76441 1.18963L12.8186 6.06874C12.9587 6.20407 13.0014 6.35531 13 6.5C13 6.67375 12.9395 6.81751 12.8186 6.93126C12.8186 6.93126 11.1338 8.55763 7.76441 11.8104C7.16877 12.3854 6.27532 11.5229 6.87096 10.9479L10.8466 7.10989Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </IconWrap>
    </LinkWrapper>
  )
}
