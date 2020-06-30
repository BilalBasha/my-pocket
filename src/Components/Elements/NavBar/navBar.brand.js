import React, { Component } from 'react'
import styled from '@emotion/styled'
import facepaint from 'facepaint'
import { BREAKPOINTS } from '../../../Common/constants'

const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const BrandWrapper = styled('div')`
  box-sizing: border-box;
  color: ${props => props.theme.body.color};
  padding: 0;
  text-align: left;
  .logo-mini {
    ${mq({ display: ['inline-block', 'none'] })};
  }
  .logo-full {
    ${mq({ display: ['none', 'inline-block'] })};
  }
`

export class Brand extends Component {
  render() {
    return (
      <BrandWrapper>
        <svg
          className="logo-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 693 183"
          height="24px">
          <g fill="none" fillRule="nonzero">
            <path
              fill="#EF4056"
              d="M84.058 83.308L58.54 107.324c-1.313 1.5-3.377 2.065-4.878 2.065-1.876 0-3.752-.564-5.253-2.065L23.266 83.308c-2.627-2.814-3.002-7.505 0-10.507 2.814-2.627 7.505-3.002 10.32 0l20.076 19.325L74.114 72.8c2.627-3.002 7.317-2.627 9.944 0 2.627 3.002 2.627 7.693 0 10.507M97.005 43.53H10.32C4.691 43.53 0 47.846 0 53.475v32.084c0 29.083 24.016 53.288 53.662 53.288 29.458 0 53.287-24.205 53.287-53.288V53.475c0-5.63-4.503-9.945-9.944-9.945"
            />
            <path
              fill="#808285"
              d="M193.822 127.212c-19.326 0-35.462-16.323-35.462-36.212 0-20.077 16.136-36.776 35.462-36.776 19.7 0 35.462 16.7 35.462 36.776 0 19.89-15.761 36.212-35.462 36.212m.187-84.62c-14.635 0-27.581 8.255-36.775 19.325l-.375-13.134c-.188-4.69-2.44-6.942-5.817-6.942-3.565 0-6.004 2.814-6.004 6.754V176.56c0 3.753 2.627 6.38 6.192 6.38 3.753 0 6.004-2.815 6.004-6.568v-55.913c9.194 10.882 22.14 18.388 36.775 18.388 26.644 0 47.659-21.39 47.659-47.846 0-26.456-21.015-48.409-47.66-48.409M300.208 127.212c-19.326 0-35.462-16.323-35.462-36.212 0-20.077 16.136-36.776 35.462-36.776 19.701 0 35.462 16.7 35.462 36.776 0 19.89-15.76 36.212-35.462 36.212m.375-84.62c-27.206 0-48.22 21.952-48.22 48.408s21.014 47.846 48.22 47.846c25.518 0 47.658-21.39 47.658-47.846 0-26.456-22.328-48.409-47.658-48.409M440.18 109.2c-1.689 0-3.565 1.314-4.69 2.815-5.254 6.943-16.512 15.198-29.083 15.198-18.764 0-34.9-14.823-34.9-36.212 0-22.891 16.136-36.588 34.9-36.588 13.696 0 21.202 6.567 27.581 14.26 1.126 1.313 2.814 2.627 4.88 2.627 2.813 0 5.627-2.064 5.627-4.88 0-2.063-1.313-4.127-2.439-5.816-7.692-11.07-20.64-17.45-35.649-17.45-26.08 0-47.47 21.39-47.47 47.847 0 26.08 21.39 47.846 47.47 47.846 16.135 0 30.02-9.382 37.337-19.14 1.314-1.688 2.065-3.376 2.065-4.877 0-3.378-2.44-5.63-5.629-5.63zM495.311 86.248l34.932-31.46c3.19-2.815 3.564-6.943 1.125-9.569-2.627-2.815-6.567-2.064-9.38.562l-47.472 44.534V7.13c0-4.316-1.876-7.13-5.816-7.13-4.316 0-6.38 2.814-6.38 7.13v124.774c0 4.128 2.44 6.942 6.38 6.942 3.564 0 5.816-2.814 5.816-6.942v-26.927l12.16-10.952 38.313 42.57c2.44 2.626 6.566 3.565 9.193 1.125 3.002-2.814 2.065-6.567-.187-9.194l-38.684-42.278zM585.969 42.592c24.58 0 42.968 22.14 42.968 43.155 0 5.44-3.566 8.818-9.946 8.818H551.96c1.598 19.538 16.972 32.648 34.196 32.648 11.07 0 19.139-3.94 27.019-10.882 1.5-1.314 3.378-2.064 5.254-2.064 3.565 0 5.44 2.439 5.44 5.44 0 2.065-1.5 4.129-3.376 6.005-8.443 8.256-21.202 13.135-34.337 13.135-26.456 0-46.72-21.39-46.72-47.846 0-26.456 19.889-48.41 46.533-48.41zM552.29 84.246h64.074c-.751-15.386-12.947-30.021-30.396-30.021-16.372 0-30.92 10.327-33.678 30.02zM687.476 120.646c-1.876 0-3.753 1.126-4.878 2.063-2.627 2.252-5.817 4.503-10.32 4.503-7.693 0-12.008-4.69-12.008-15.384V54.037l23.83.376c3.376 0 5.628-2.064 5.628-5.254 0-3.378-2.252-5.441-5.629-5.441l-23.829.187V24.579c0-3.752-2.627-6.379-5.816-6.379-3.378 0-6.193 2.627-6.193 6.379v19.326l-10.132-.187c-3.189 0-5.44 2.063-5.44 5.441 0 3.002 2.438 5.441 5.44 5.254l10.132-.376v58.166c0 18.2 11.07 26.643 23.83 26.643 7.88 0 13.884-3.002 18.012-7.317 1.313-1.502 2.627-3.191 2.627-5.442 0-3.19-2.065-5.441-5.254-5.441"
            />
          </g>
        </svg>
        <svg
          className="logo-mini"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#EF4056"
            d="M0.9999,10.6312 L0.9999,4.0682 C0.9999,2.9302 1.9309,2.0002 3.0679,2.0002 L20.9329,2.0002 C22.0699,2.0002 22.9999,2.9302 22.9999,4.0682 L22.9999,10.6312 L22.9999,10.6432 C22.9999,16.7182 18.0749,21.6432 11.9999,21.6432 C5.9249,21.6432 0.9999,16.7182 0.9999,10.6432 L0.9999,10.6312 Z M12.0151,12.0203514 L7.86472144,8.02991037 C7.26754166,7.4557433 6.31797743,7.47439879 5.74381037,8.07157856 C5.1696433,8.66875834 5.18829879,9.61832257 5.78547856,10.1924896 L10.9754786,15.1824896 C11.556135,15.7407701 12.474065,15.7407701 13.0547214,15.1824896 L18.2447214,10.1924896 C18.8419012,9.61832257 18.8605567,8.66875834 18.2863896,8.07157856 C17.7122226,7.47439879 16.7626583,7.4557433 16.1654786,8.02991037 L12.0151,12.0203514 Z"
          />
        </svg>
      </BrandWrapper>
    )
  }
}
