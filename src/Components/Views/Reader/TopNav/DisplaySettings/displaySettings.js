/* eslint  react/jsx-no-target-blank: 0*/
import React, { Component } from 'react'
import styled from '@emotion/styled'
import FontSize from './fontSize'
import FontType from './fontType'
import ColumnWidths from './columnWidths'
import LineHeight from './lineHeight'
import ThemeSelector from '../../../../Modules/ThemeSelector/themeSelector'
import { ActionIcon, ActionItem } from '../../../../Elements/NavBar/navBar'
import { Popover, Trigger, Content } from '../../../../Modules/Popover/popover'
import { FONT_TYPES } from '../../../../../Common/constants'
import { PREMIUM_URL, PREMIUM_ENTRY_POINTS } from '../../../../../Common/constants'
import { Icon } from '../../../../Elements/Icons/icon'
import { buttonReset } from '../../../../Elements/Buttons/button'
import { TooltipBase } from '../../../../Elements/Tooltip/tooltip'
import { Translate, withLocalize } from 'react-localize-redux'

const DisplaySettingsDropdown = styled('div')`
  box-sizing: border-box;
  padding: 0;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(${props => (props.isPremium ? '5' : '4')}, 1fr);
  height: ${props => props.isPremium ? '324px' : '259px'};
  width: 288px;
  align-items: center;
  justify-items: stretch;
`

const TriggerWrapper = styled('button')`
  ${buttonReset};
  cursor: pointer;
  color: ${props => props.theme.navBar.action.color};
  &:hover {
    ${props => props.theme.navBar.action.hover};
  }
  ${TooltipBase};
`

const Wrapper = styled('div')`
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(3, 95px);
  &:after {
    content: ' ';
    width: 240px;
    height: 1px;
    background: ${({ theme }) => theme.settings.border};
    grid-column: 1 / span 3;
  }
`

const FontStyleWrapper = styled(Wrapper)`
  justify-content: center;
  width: 100%;
  .font-options {
    grid-column: 1 / span 3;
    font-size: 18px;
    height: 64px;
    width: 220px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const LastFontStyleWrapper = styled(FontStyleWrapper)`
  height: 72px;
  &:after {
    height: 0px;
  }
`

const ThemeWrapper = styled(Wrapper)`
  &:after {
    position: relative;
    top: 10px;
  }
`

const UnlockMessage = styled('div')`
  grid-column: 1/-1;
  a.unlock {
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    display: block;
    padding: 20px 0;
    color: ${props => props.theme.settings.premium.color};
    &:hover {
      color: ${props => props.theme.settings.premium.hover};
    }
  }
`

class DisplaySettingsClass extends Component {
  state = { displayFonts: false }

  toggleFontSelector = () => {
    this.setState(state => {
      return { displayFonts: !state.displayFonts }
    })
  }

  closeFontSelector = () => {
    this.setState({ displayFonts: false })
  }

  render() {
    const { translate } = this.props
    return (
      <ActionItem>
        <Popover persist activateOnClick onClose={this.closeFontSelector}>
          <Trigger>
            <TriggerWrapper
              aria-label={translate('reader.topNav.displaySettings')}
              data-tooltip={translate('reader.topNav.displaySettings')}>
              <Icon
                name="TextStyle"
                type="solid"
                size="24px"
                margin="0 10px 0 0"
              />
              <Icon type="mini" name="DownChevron" size="12px" margin="0" />
            </TriggerWrapper>
          </Trigger>

          <Content>
            {this.state.displayFonts ? (
              <FontType
                toggleFontSelector={this.toggleFontSelector}
                fontType={this.props.fontType}
                clickAction={this.props.fontTypeChange}
                isPremium={this.props.isPremium}
              />
            ) : (
              <DisplaySettingsDropdown isPremium={this.props.isPremium}>
                <FontStyleWrapper onClick={this.toggleFontSelector}>
                  <div
                    className='font-options'
                    data-tooltip={translate('reader.topNav.fontOptions')}>
                    {FONT_TYPES[this.props.fontType].name}
                    <ActionIcon
                      type="line"
                      icon="ForwardChevron"
                      size="18px"
                      margin="0"
                    />
                  </div>
                </FontStyleWrapper>

                <ThemeWrapper>
                  <ThemeSelector
                    selectSize={44}
                    buttonSize={32}
                    clickAction={this.props.themeChange}
                    activeTheme={this.props.activeTheme}
                  />
                </ThemeWrapper>

                <FontStyleWrapper>
                  <FontSize
                    current={this.props.fontSize}
                    clickAction={this.props.fontSizeChange}
                  />
                </FontStyleWrapper>

                {this.props.isPremium ? (
                  <React.Fragment>
                    <FontStyleWrapper>
                      <LineHeight
                        current={this.props.lineHeight}
                        clickAction={this.props.lineHeightChange}
                      />
                    </FontStyleWrapper>

                    <LastFontStyleWrapper>
                      <ColumnWidths
                        current={this.props.columnWidth}
                        clickAction={this.props.columnWidthChange}
                      />
                    </LastFontStyleWrapper>
                  </React.Fragment>
                ) : (
                  <UnlockMessage>
                    <a
                      className="unlock"
                      href={`${PREMIUM_URL}${PREMIUM_ENTRY_POINTS.DISPLAY}`}
                      target="_blank">
                      <Icon
                        name="Premium"
                        type="line"
                        size="24px"
                        margin="0 8px 0 0"
                      />{' '}
                      <Translate id="reader.displaySettings.unlock">
                        Unlock more options
                      </Translate>
                    </a>
                  </UnlockMessage>
                )}
              </DisplaySettingsDropdown>
            )}
          </Content>
        </Popover>
      </ActionItem>
    )
  }
}

export const DisplaySettings = withLocalize(DisplaySettingsClass)
