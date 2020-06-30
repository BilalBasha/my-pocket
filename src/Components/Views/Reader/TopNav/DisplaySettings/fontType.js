import React from 'react'
import styled from '@emotion/styled'
import { buttonReset } from '../../../../Elements/Buttons/button'
import { FONT_TYPES } from '../../../../../Common/constants'
import { Icon } from '../../../../Elements/Icons/icon'
import { Translate, withLocalize } from 'react-localize-redux'

const FontSelector = styled('div')`
  width: 260px;
  box-sizing: border-box;
  padding: 20px;
`

const FontSelectorHeader = styled('div')`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  padding: 20px;
  color: ${props => props.theme.settings.text.header};
  position: relative;
  button {
    ${buttonReset};
    cursor: pointer;
    display: block;
    position: absolute;
    top: 16px;
    left: 0;
  }
`

const FontTypeButton = styled('button')`
  ${buttonReset};
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 15px 5px;
  text-align: left;
  line-height: 24px;
  cursor: pointer;
  color: ${props => props.theme.settings.text.color};
  span {
    color: ${props => props.theme.settings.premium.color};
    display: inline-block;
    padding-right: 10px;
  }
  &:hover {
    color: ${props => props.theme.settings.text.hover};
  }
  border-top: 1px solid ${props => props.theme.body.border};
`

function FontType({
  fontType,
  clickAction,
  toggleFontSelector,
  isPremium,
  translate
}) {
  return (
    <FontSelector>
      <FontSelectorHeader>
        <button
          onClick={toggleFontSelector}
          aria-label={translate('reader.displaySettings.back')}>
          <Icon name="BackChevron" type="line" size="24px" />
        </button>
        <Translate id="reader.displaySettings.fontOptions">
          Font Options
        </Translate>
      </FontSelectorHeader>
      {Object.keys(FONT_TYPES).map(font => {
        const showPremium = FONT_TYPES[font].premium && !isPremium
        const isActive = fontType === font
        const className = isActive ? 'active' : null
        const click = () => clickAction(font)

        return (
          <FontTypeButton
            key={font}
            className={className}
            onClick={click}
            aria-label={translate('reader.displaySettings.font', {
              fontFamily: FONT_TYPES[font].name
            })}>
            <div>
              {showPremium ? (
                <span>
                  <Icon name="Premium" type="line" size="24px" />
                </span>
              ) : null}
              <svg
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  fill: 'currentColor',
                  height: '24px',
                  width: '120px'
                }}>
                <use
                  href={`/fonts.symbols.svg#${
                    FONT_TYPES[font].selector
                  }`}
                />
              </svg>
            </div>
            {isActive ? (
              <div>
                <Icon name="Check" type="mini" size="16px" />
              </div>
            ) : null}
          </FontTypeButton>
        )
      })}
    </FontSelector>
  )
}

export default withLocalize(FontType)
