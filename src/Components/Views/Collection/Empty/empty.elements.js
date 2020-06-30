import React from 'react'
import styled from '@emotion/styled'
import {
  blue80,
  mint80,
  purple80,
  teal80,
  coral80,
  amber80
} from '../../../Elements/Themes/colors'

const ParticleWrapper = styled('div')`
  position: absolute;
  top: 10px;
  left: 50%;
  svg {
    display: block;
    width: 8px;
    height: 8px;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
  }
  .circle1 svg {
    width: 6px;
    height: 6px;
    fill: ${blue80};
  }
  .circle2 svg {
    fill: ${purple80};
  }
  .triangle1 svg {
    width: 10px;
    height: 10px;
    fill: ${coral80};
  }
  .triangle2 svg {
    width: 8px;
    height: 8px;
    fill: ${amber80};
  }
  .square1 svg {
    fill: ${teal80};
  }
  .square2 svg {
    width: 7px;
    height: 7px;
    fill: ${mint80};
  }
`

export function Particles() {
  return (
    <ParticleWrapper>
      <div className="circle1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
          <circle cx="3" cy="3" r="3" />
        </svg>
      </div>
      <div className="circle2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
          <circle cx="3" cy="3" r="3" />
        </svg>
      </div>
      <div className="triangle1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M24 22H0L12 2z" />
        </svg>
      </div>
      <div className="triangle2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M24 22H0L12 2z" />
        </svg>
      </div>
      <div className="square1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
          <path d="M0 0h6v6H0z" />
        </svg>
      </div>
      <div className="square2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
          <path d="M0 0h6v6H0z" />
        </svg>
      </div>
    </ParticleWrapper>
  )
}
