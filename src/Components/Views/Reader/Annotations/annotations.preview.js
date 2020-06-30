/* eslint  react/jsx-no-target-blank: 0*/
import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Translate, withLocalize } from 'react-localize-redux'
import { MAX_ANNOTATIONS_DEFAULT } from '../../../../Common/constants'
import { FONT_DEFAULTS } from '../../../../Common/constants'
import { ButtonLink } from '../../../Elements/Buttons/button'
import { CardWrapper } from './annotations.card'
import { Icon } from '../../../Elements/Icons/icon'
import { KEYS } from '../../../../Common/constants'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../../Common/constants'

const Tic = styled('div')`
  position: fixed;
  top: 0;
  transform: translateY(${props => props.top}px);
  left: 0;
  padding: 3px 0;
  width: 40px;
  z-index: 100;
  cursor: pointer;
  opacity: 1;
  transition: opacity 200ms ease-in-out;
  &.loading {
    opacity: 0;
  }
`

const Anchor = styled('div')`
  position: relative;
  width: calc(100% - 6px);
  height: 3px;
  background-color: ${props => props.theme.annotations.active};
  border-radius: 0 4px 4px 0;
`

const FlyAway = styled('div')`
  position: absolute;
  transform: translate(50px, -30px);
`

const PreviewCard = props => css`
  width: 260px;
  border-top-color: ${props.theme.settings.premium.base} !important;
  box-shadow: ${props.theme.overlay.shadow};
  font-family: ${FONT_DEFAULTS['sans'].family};
  padding: 20px 20px 30px;
`

const Title = styled('h4')`
  font-weight: 500;
  margin: 0;
  font-size: 16px;
  line-height: 22px;
  padding-right: 40px;
`

const Subheader = styled('p')`
  font-size: 16px;
  line-height: 22px;
  margin: 0 0 25px;
  color: ${({ theme }) => theme.body.subcolor};
`

const IconWrapper = styled('div')`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  font-size: ${props => (props.size ? props.size : 16)}px;
  display: block;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: ${({ theme }) => theme.body.link.color};
  }
`

export class AnnotationPreviewClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  handleKeyStroke = e => {
    if (e.keyCode === KEYS.ESCAPE) this.props.closeModal()
  }

  componentDidMount() {
    this.sendTrackClick('view_cl_hlr_upsell')
    this.setState({ loading: false })
    window.addEventListener('keydown', this.handleKeyStroke)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyStroke)
  }

  sendTrackClick = (identifier) => {
    this.props.trackClick({
      view: 'web',
      section: '/premium',
      page: 'reader',
      identifier
    })
  }

  trackPremiumClick = () => {
    this.sendTrackClick('click_cl_hlr_upsell')
  }

  render() {
    const {
      docHeight,
      closeModal
    } = this.props

    const screenHeight =
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0) -
      93 // 63 for navbar height
    const el = document.getElementsByClassName('highlight-preview')[0]
    if (!el) return null
    const elPosition = Math.round(
      el.getBoundingClientRect().top + window.pageYOffset
    )

    let percent = elPosition / docHeight
    let top = Math.round(percent * screenHeight) + 78 // 63 for navbar height

    const className = this.state.loading ? 'loading' : ''

    return (
      <Tic top={top} className={className}>
        <Anchor>
          <FlyAway>
            <CardWrapper addedStyles={PreviewCard} arrow show>
              <IconWrapper onClick={closeModal}>
                <Icon name="CloseX" size="16px" type="mini" />
              </IconWrapper>
              <Title>
                <Translate
                  id="highlightLimit.header"
                  data={{ MAX_ANNOTATIONS_DEFAULT }}>
                  You’re limited to {MAX_ANNOTATIONS_DEFAULT}{' '}
                  highlights per article.
                </Translate>
              </Title>
              <Subheader>
                <Translate id="highlightLimit.subheader">
                  Pocket Premium members get unlimited highlights.
                </Translate>
              </Subheader>

              <ButtonLink
                href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.ANNOTATIONS}`}
                target="_blank"
                onClick={this.trackPremiumClick}
                type="upgrade">
                <Translate id="highlightLimit.cta">Get Premium</Translate>
              </ButtonLink>
            </CardWrapper>
          </FlyAway>
        </Anchor>
      </Tic>
    )
  }
}

export const AnnotationPreview = withLocalize(AnnotationPreviewClass)
