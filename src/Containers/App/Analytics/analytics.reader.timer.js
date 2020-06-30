import { select } from 'redux-saga/effects'
import { sendAnalytics } from '../../../Common/Api'
import { ANALYTICS_KEYS } from '../../../Common/constants'
const { VIEW, LIST_MODE } = ANALYTICS_KEYS

const getStateOptions = state => state.options

let listenersAdded = false
let session_id = null
let previousTime = null
let itemId = null
let timeSpent = 0
let pulseDecay = null
let pulseTimer = null
let pulseClone = null
let pulseInt = 0
let timerRemaining = 0
let timerStartTime = null
let stateOptions = null

const pulseIntervals = [
  { time: 10, inc: 6 }, // Pulse every 10 seconds, do it 6 times
  { time: 20, inc: 6 }, // every 20 seconds, 6 times
  { time: 30, inc: 14 }, // every 30 seconds, 14 times
  { time: 60, inc: 50 } // every 60 seconds, 50 times
]
const timeoutLimit = 3 // Length session will keep if not focus: Minutes

export function* startSession({ trigger, view, listMode, item_id }) {
  stateOptions = yield select(getStateOptions)
  session_id = getTimeInSeconds()
  previousTime = session_id
  itemId = item_id
  timeSpent = 0
  pulseDecay = null
  pulseTimer = null
  pulseInt = 0
  pulseClone = JSON.parse(JSON.stringify(pulseIntervals))
  timerRemaining = 0

  const data = {
    trigger_event: trigger,
    [VIEW]: view,
    [LIST_MODE]: listMode
  }

  sendEvent(data, 'item_session_start')

  addListeners()
  startTimer()
}

export function endSession(trigger) {
  const data = {
    trigger_event: trigger,
    time_spent: caclulateTimeSpent(),
    [VIEW]: 'reader'
  }

  sendEvent(data, 'item_session_end')
  stopTimer()

  session_id = null
  pulseClone = null
  pulseInt = 0
  itemId = null
}

/* HELPERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function getTimeInSeconds() {
  return Math.round(Date.now() / 1000) // Needs to be in seconds
}

function addListeners() {
  if (listenersAdded) return

  document.addEventListener(
    'visibilitychange',
    function() {
      if (session_id) {
        handleVisibilityChange()
      }
    },
    false
  )

  window.addEventListener('popstate', function(e) {
    endSession('browser_back')
  })

  listenersAdded = true
}

function handleVisibilityChange() {
  if (document.hidden && session_id) {
    pulseDecay = getTimeInSeconds()
    pauseTimer('lost_tab_focus')
  } else if (session_id) {
    let elapsed = getTimeInSeconds() - pulseDecay

    if (timeoutLimit * 60 - elapsed > 0) {
      pulseDecay = null
      resumeTimer('regained_tab_focus')
    } else {
      pulseDecay = null
      startSession('regained_tab_focus', 'reader', itemId)
    }
  }
}

function caclulateTimeSpent() {
  let oldTime = previousTime
  previousTime = getTimeInSeconds()

  return (timeSpent += previousTime - oldTime)
}

function hasPulse() {
  return pulseClone && pulseClone[pulseInt]
}

function startPulse(time) {
  timerStartTime = getTimeInSeconds()

  pulseTimer = setTimeout(function() {
    sendPulse()
    startTimer()
  }, time * 1000)
}

function startTimer() {
  if (!hasPulse()) stopTimer()
  if (pulseClone[pulseInt].inc !== null) {
    if (pulseClone[pulseInt].inc === 0) {
      pulseInt += 1
    }

    if (!pulseClone[pulseInt]) return

    pulseClone[pulseInt].inc -= 1
  }

  let time = pulseClone[pulseInt].time
  startPulse(time)
}

function pauseTimer(trigger) {
  const data = {
    trigger_event: trigger,
    time_spent: caclulateTimeSpent(),
    [VIEW]: 'reader'
  }

  timerRemaining += getTimeInSeconds() - timerStartTime

  sendEvent(data, 'item_session_pause')
  stopTimer()
}

function resumeTimer(trigger) {
  const data = {
    trigger_event: trigger,
    [VIEW]: 'reader'
  }

  sendEvent(data, 'item_session_continue')
  startPulse(timerRemaining)
}

function stopTimer() {
  clearTimeout(pulseTimer)
}

function sendPulse() {
  const data = {
    [VIEW]: 'reader'
  }

  sendEvent(data, 'item_session_pulse')
}

function sendEvent(options, action) {
  if (session_id && action && itemId) {
    sendAnalytics([
      {
        sid: session_id,
        item_id: itemId,
        time: getTimeInSeconds(),
        item_session_id: session_id,
        theme: stateOptions.theme,
        action,
        ...options
      }
    ])
  }
}
