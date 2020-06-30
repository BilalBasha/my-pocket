import React from 'react'
import styled from '@emotion/styled'
import { buttonReset } from '../../Elements/Buttons/button'
import { TooltipBase } from '../../Elements/Tooltip/tooltip'
import { withLocalize } from 'react-localize-redux'

const ColorModeButton = styled('button')`
  ${buttonReset};
  cursor: pointer;
  border-radius: 60%;
  width: ${props => props.selectSize}px;
  height: ${props => props.selectSize}px;
  border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  div {
    border-radius: 50%;
    width: ${props => props.buttonSize}px;
    height: ${props => props.buttonSize}px;
  }
  &:hover {
    background: ${props => props.theme.settings.theme.hover};
  }
  ${TooltipBase};
`

const LightTheme = styled(ColorModeButton)`
  border-color: ${props =>
    props.activeTheme === 'light'
      ? props.theme.settings.theme.active
      : 'transparent'};
  div {
    background-color: ${props => props.theme.settings.theme.light.background};
    border: 1px solid ${props => props.theme.settings.theme.light.border};
  }
`

const DarkTheme = styled(ColorModeButton)`
  border-color: ${props =>
    props.activeTheme === 'dark'
      ? props.theme.settings.theme.active
      : 'transparent'};
  div {
    background-color: ${props => props.theme.settings.theme.dark.background};
    border: 1px solid ${props => props.theme.settings.theme.dark.border};
  }
`

const SepiaTheme = styled(ColorModeButton)`
  border-color: ${props =>
    props.activeTheme === 'sepia'
      ? props.theme.settings.theme.active
      : 'transparent'};
  div {
    background-color: ${props => props.theme.settings.theme.sepia.background};
    border: 1px solid ${props => props.theme.settings.theme.sepia.border};
  }
`

function ColorMode({
  clickAction,
  activeTheme,
  buttonSize,
  selectSize,
  translate
}) {
  return (
    <React.Fragment>
      <LightTheme
        buttonSize={buttonSize}
        selectSize={selectSize}
        activeTheme={activeTheme}
        aria-label={translate('reader.displaySettings.themeLight')}
        data-tooltip={translate('reader.displaySettings.themeLight')}
        onClick={() => clickAction('light')}>
        <div />
      </LightTheme>
      <DarkTheme
        buttonSize={buttonSize}
        selectSize={selectSize}
        activeTheme={activeTheme}
        aria-label={translate('reader.displaySettings.themeDark')}
        data-tooltip={translate('reader.displaySettings.themeDark')}
        onClick={() => clickAction('dark')}>
        <div />
      </DarkTheme>
      <SepiaTheme
        buttonSize={buttonSize}
        selectSize={selectSize}
        activeTheme={activeTheme}
        aria-label={translate('reader.displaySettings.themeSepia')}
        data-tooltip={translate('reader.displaySettings.themeSepia')}
        onClick={() => clickAction('sepia')}>
        <div />
      </SepiaTheme>
    </React.Fragment>
  )
}

export default withLocalize(ColorMode)
