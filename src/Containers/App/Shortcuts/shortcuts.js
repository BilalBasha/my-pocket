import Mousetrap from 'mousetrap'
import { goBack } from 'connected-react-router'

import { MODE_CHANGE } from '../../../actions'
import { TOGGLE_DEV_MODE } from '../../../actions'
import { UPDATE_THEME } from '../../../actions'
import { SHORTCUT_FONT_INCREASE } from '../../../actions'
import { SHORTCUT_FONT_DECREASE } from '../../../actions'
import { ENTER_LIST_MODE } from '../../../actions'
import { ENTER_GRID_MODE } from '../../../actions'
import { GOTO_UNREAD } from '../../../actions'
import { GOTO_ARCHIVE } from '../../../actions'
import { GOTO_FAVORITES } from '../../../actions'
import { GOTO_ARTICLES } from '../../../actions'
import { GOTO_VIDEOS } from '../../../actions'
import { SHORTCUT_SELECT_NEXT } from '../../../actions'
import { SHORTCUT_ESC } from '../../../actions'
import { SHORTCUT_SELECT_PREV } from '../../../actions'
import { SHORTCUT_SELECT_OPEN } from '../../../actions'
import { SHORTCUT_SELECT_ARCHIVE } from '../../../actions'
import { SHORTCUT_SELECT_DELETE } from '../../../actions'
import { SHORTCUT_SELECT_FAVORITE } from '../../../actions'
import { SHORTCUT_SELECT_VISIT } from '../../../actions'
import { SHORTCUT_SELECT_TAG } from '../../../actions'
import { SORT_BY_OLDEST } from '../../../actions'
import { SORT_BY_NEWEST } from '../../../actions'

export function addKeyboardShortcuts({ dispatch }) {
  // Enter dev mode
  Mousetrap.bind('q a', function() {
    dispatch({ type: TOGGLE_DEV_MODE })
  })

  // go to my list
  Mousetrap.bind('g l', function() {
    dispatch({ type: GOTO_UNREAD })
  })

  // go to archive
  Mousetrap.bind('g a', function() {
    dispatch({ type: GOTO_ARCHIVE })
  })

  // go to favorites
  Mousetrap.bind('g f', function() {
    dispatch({ type: GOTO_FAVORITES })
  })

  // content filter - articles
  Mousetrap.bind('g r', function() {
    dispatch({ type: GOTO_ARTICLES })
  })

  // content filter - videos
  Mousetrap.bind('g v', function() {
    dispatch({ type: GOTO_VIDEOS })
  })

  // switch focus to search field
  Mousetrap.bind(['g s', '/'], function(e) {
    e.preventDefault()
    dispatch({ type: MODE_CHANGE, payload: 'search' })
  })

  // switch focus to add url
  Mousetrap.bind('g u', function() {
    dispatch({ type: MODE_CHANGE, payload: 'addUrl' })
  })

  // toggle bulk edit mode
  Mousetrap.bind('g b', function(e) {
    dispatch({ type: MODE_CHANGE, payload: 'bulkEdit' })
  })

  // jump to list view
  Mousetrap.bind('v l', function() {
    dispatch({ type: ENTER_LIST_MODE })
  })

  // jump to tile view
  Mousetrap.bind('v t', function() {
    dispatch({ type: ENTER_GRID_MODE })
  })

  // change to light theme
  Mousetrap.bind('v w', function() {
    dispatch({ type: UPDATE_THEME, payload: { theme: 'light' } })
  })

  // change to dark theme
  Mousetrap.bind('v d', function() {
    dispatch({ type: UPDATE_THEME, payload: { theme: 'dark' } })
  })

  // change to sepia theme
  Mousetrap.bind('v s', function() {
    dispatch({ type: UPDATE_THEME, payload: { theme: 'sepia' } })
  })

  // move forward to next item in queue or next article if in reader
  Mousetrap.bind(['j', 'right'], function() {
    dispatch({ type: SHORTCUT_SELECT_NEXT })
  })

  // move back to previous item in queue
  Mousetrap.bind(['k', 'left'], function() {
    dispatch({ type: SHORTCUT_SELECT_PREV })
  })

  // open currently selected item in queue, confirm deletion dialog
  Mousetrap.bind(['return'], function() {
    dispatch({ type: SHORTCUT_SELECT_OPEN })
  })

  // archive/unarchive selected item in queue, item in reader
  Mousetrap.bind('a', function(e) {
    dispatch({ type: SHORTCUT_SELECT_ARCHIVE })
  })

  // delete selected item in queue, item in reader
  Mousetrap.bind('d', function(e) {
    dispatch({ type: SHORTCUT_SELECT_DELETE })
  })

  // favorite/unfavorite selected item in queue, item in reader
  Mousetrap.bind('f', function(e) {
    dispatch({ type: SHORTCUT_SELECT_FAVORITE })
  })

  // go back
  Mousetrap.bind('b', function(e) {
    dispatch(goBack())
  })

  // open original item in browser
  Mousetrap.bind('o', function(e) {
    dispatch({ type: SHORTCUT_SELECT_VISIT })
  })

  // tag selected item
  Mousetrap.bind('t', function(e) {
    e.preventDefault()
    dispatch({ type: SHORTCUT_SELECT_TAG })
  })
  // leave bulk edit move, leave from overlay
  Mousetrap.bind('esc', function(e) {
    dispatch({ type: SHORTCUT_ESC })
  })

  // decrease font size in reader
  Mousetrap.bind(['command+-', 'control+-'], function(e) {
    e.preventDefault()
    dispatch({ type: SHORTCUT_FONT_DECREASE })
  })

  // increase font size in reader
  Mousetrap.bind(['command+=', 'control+='], function(e) {
    e.preventDefault()
    dispatch({ type: SHORTCUT_FONT_INCREASE })
  })

  // sort by newest
  Mousetrap.bind('s n', function(e) {
    e.preventDefault()
    dispatch({ type: SORT_BY_NEWEST })
  })

  // sort by oldest
  Mousetrap.bind('s o', function(e) {
    e.preventDefault()
    dispatch({ type: SORT_BY_OLDEST })
  })

  // FUTURE ADD - PENDING UX ADJUSTMENTS

  // WAITING ON DESIGN FOR THIS
  // help overlay
  // Mousetrap.bind(['shift+/'], function() {})

  // WONT ADD
  // distraction free/full screen mode in reader
  // Mousetrap.bind('d', function(e) { })

  // Adjusted spacebar based scrolling in reader
  // Mousetrap.bind(['space'], function(e) {})
}
