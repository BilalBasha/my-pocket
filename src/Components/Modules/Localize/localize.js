import React, { Component, PureComponent } from 'react'
import { withLocalize } from 'react-localize-redux'
import { getTranslation } from '../../../Containers/App/Localization/localization'
import { setDateTranslations } from '../../../Containers/App/Localization/dates'

class LanguageSelector extends PureComponent {
  setLanguage = () => {
    const { lang, setActiveLanguage } = this.props
    if (!this.activeLang) {
      // Get localization file on demand
      getTranslation(lang.code).then(({ translation, code }) => {
        // Add said localization file to the app
        this.props.addTranslationForLanguage(translation, code)
        setActiveLanguage(code)
        setDateTranslations(code)
      })
    }
  }

  get activeLang() {
    const { lang, activeLanguage } = this.props
    return activeLanguage.code === lang.code
  }

  render() {
    const { lang } = this.props
    return (
      <li className={this.activeLang ? 'active' : ''}>
        <button onClick={this.setLanguage}>{lang.name}</button>
      </li>
    )
  }
}

class LanguageToggleClass extends Component {
  render() {
    const {
      languages,
      activeLanguage,
      setActiveLanguage,
      addTranslationForLanguage
    } = this.props

    return (
      <ul>
        {languages.map(lang => (
          <LanguageSelector
            key={lang.code}
            lang={lang}
            activeLanguage={activeLanguage}
            setActiveLanguage={setActiveLanguage}
            addTranslationForLanguage={addTranslationForLanguage}
          />
        ))}
      </ul>
    )
  }
}

export const LanguageToggle = withLocalize(LanguageToggleClass)
