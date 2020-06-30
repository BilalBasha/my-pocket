import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DOMPurify from 'dompurify'

import { renderToStaticMarkup } from 'react-dom/server'
import { languages } from '../../Containers/App/Localization/localization'
import {
  defaultTranslation,
  getTranslation
} from '../../Containers/App/Localization/localization'
import { withLocalize } from 'react-localize-redux'
import { ErrorAuth } from '../../Components/Views/App/Errors/error.auth'
import { SentryBoundary } from '../../Components/Views/App/Errors/error.boundary'

import { appActions } from './app.state'
import { AppView } from '../../Components/Views/App/app.view'

import { getSize } from '../../Components/Modules/Sizes/sizes'

/* CONTAINER
–––––––––––––––––––––––––––––––––––––––––––––––––– */

class AppContainer extends Component {
  constructor(props) {
    super(props)

    const defaultLanguage = 'en-US'

    // Localization Initialize
    this.props.initialize({
      languages,
      options: {
        renderToStaticMarkup,
        defaultLanguage,
        ignoreTranslateChildren: true,
        onMissingTranslation: this.handleMissing
      }
    })

    const code = 'en-US';
    const translation = getTranslation('en-US');
    console.log(translation, code);

    // Get default translation: en-us
    // getTranslation('en-US').then(({ translation, code }) => {
      // Add said localization file to the app
      this.props.addTranslationForLanguage(translation, code)
    // })

    // Get alternate localization files on demand
    // defaultTranslation().then(({ translation, code }) => {
    //   if (code !== defaultLanguage) {
    //     // Add said localization file to the app
    //     this.props.addTranslationForLanguage(translation, code)
    //     this.props.setActiveLanguage(code)
    //   }
    // })
  }

  handleMissing = ({ defaultTranslation }) => {
    return process.env.NODE_ENV !== 'production'
      ? `🚫${defaultTranslation}`
      : defaultTranslation
  }

  setTitle() {
    const { subset, tag, search, translate } = this.props
    const section = translate(`pageTitles.${subset}`)
    const postfix = (subset === 'tagged' || subset === 'search')
      ? `${section} : ${tag || search}`
      : section
    document.title = section ? `Pocket - ${DOMPurify.sanitize(postfix)}` : 'Pocket'
  }

  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path) {
      window.scrollTo(0, 0)
      if (prevProps.path.indexOf('/read/') !== -1) return this.setTitle()
    }
    if (this.props.subset !== prevProps.subset) return this.setTitle()
    if (this.props.subset === 'tagged' && this.props.tag !== prevProps.tag) {
      this.setTitle()
    }
    if (this.props.search !== prevProps.search) return this.setTitle()
  }

  componentDidMount() {
    // Pass an initial size through when initializing app
    const width = window.innerWidth
    const height = window.innerHeight
    const size = getSize(width)
    this.props.appInitialized({ size, height })
  }

  render() {
    const {
      theme,
      authorized,
      unauthorized,
      listMode,
      forceGrid,
      path
    } = this.props

    return (
      <SentryBoundary>
        {authorized ? (
          <AppView
            theme={theme}
            listMode={listMode}
            forceGrid={forceGrid}
            path={path}
          />
        ) : null}
        {unauthorized ? <ErrorAuth /> : null}
      </SentryBoundary>
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch)
}

function mapStateToProps(state) {
  return {
    unauthorized: state.app.unauthorized,
    authorized: state.app.authorized,
    subset: state.app.sectionPayload.subset,
    tag: state.app.sectionPayload.tag,
    search: state.app.sectionPayload.search,
    path: state.router.location.pathname,
    theme: state.options.theme,
    listMode: state.options.listMode,
    forceGrid: state.router.location.pathname === '/discover'
  }
}

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocalize(AppContainer))
