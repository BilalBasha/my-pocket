import { READING_WPM, PERM_LIB_URL, URL_SUBTYPE_MAP } from './constants'

const parseUrl = (string, prop) => {
  const a = document.createElement('a')
  a.setAttribute('href', string)
  const { host, hostname, pathname, port, protocol, search, hash } = a
  const origin = `${protocol}//${hostname}${port.length ? `:${port}` : ''}`
  const fragments = {
    origin,
    host,
    hostname,
    pathname,
    port,
    protocol,
    search,
    hash
  }
  return prop ? fragments[prop] : fragments
}

export function urlWithPermanentLibrary(item_id) {
  return `${PERM_LIB_URL}${item_id}`
}

export function domainForUrl(url) {
  if (!url) return false
  const match = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im
  )
  // const removedTLD = match[1].match(/([a-zA-z0-9]+)/im)
  // return removedTLD[1]
  return match[1]
}

export function baseForUrl(url) {
  return parseUrl(url, 'origin')
}

export function getCurrentLanguageCode() {
  var language = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage

  language = typeof language !== 'undefined' ? language.toLowerCase() : 'en'

  if (language.indexOf('de') === 0) return 'de-DE' // German
  if (language.indexOf('en') === 0) return 'en-US' // English
  if (language.indexOf('es') === 0) return 'es-ES' // Spanish
  if (language.indexOf('es_419') === 0) return 'es-LA' // Spanish (Latin America and Caribbean)
  if (language.indexOf('es-419') === 0) return 'es-LA' // Spanish (Latin America and Caribbean)
  if (language.indexOf('fr_ca') === 0) return 'fr-CA' // French Canadian
  if (language.indexOf('fr-ca') === 0) return 'fr-CA' // French Canadian
  if (language.indexOf('fr') === 0) return 'fr-FR' // French
  if (language.indexOf('it') === 0) return 'it-IT' // Italian
  if (language.indexOf('ja') === 0) return 'ja-JP' // Japanese
  if (language.indexOf('ko') === 0) return 'ko-KR' // Korean
  if (language.indexOf('nl') === 0) return 'nl-NL' // Dutch
  if (language.indexOf('pl') === 0) return 'pl-PL' // Polish
  if (language.indexOf('pt-br') === 0) return 'pt-BR' // Portuguese Brazil
  if (language.indexOf('pt_br') === 0) return 'pt-BR' // Portuguese Brazil
  if (language.indexOf('pt') === 0) return 'pt-PT' // Portuguese Brazil
  if (language.indexOf('pt-pt') === 0) return 'pt-PT' // Portuguese Portugal
  if (language.indexOf('pt_pt') === 0) return 'pt-PT' // Portuguese Portugal
  if (language.indexOf('ru') === 0) return 'ru-RU' // Russian
  if (language.indexOf('zh-cn') === 0) return 'zh-CN' // Chinese Simplified
  if (language.indexOf('zh_cn') === 0) return 'zh-CN' // Chinese Simplified
  if (language.indexOf('zh-tw') === 0) return 'zh-TW' // Chinese Traditional
  if (language.indexOf('zh_tw') === 0) return 'zh-TW' // Chinese Traditional
  return 'en-US' // Default is English
}

export function shallowQueryParams(source) {
  const array = []
  for (let key in source) {
    if (source[key]) {
      let type = Object.prototype.toString
        .call(source[key])
        .match(/\[object (\w+)\]/)[1]
      if (type === 'String' || type === 'Number') {
        array.push(
          encodeURIComponent(key) + '=' + encodeURIComponent(source[key])
        )
      }
    }
  }
  return array.join('&')
}

export function getImageCacheUrl(url, imageSize) {
  if (!url) return
  const resizeParam = imageSize ? `${imageSize.width}x${imageSize.height}` : ''
  const encodedURL = encodeURIComponent(url.replace(/'/g, '%27'))
  const urlParam = `${encodedURL}`
  const cacheURL = 'https://pocket-image-cache.com' //direct'
  return `${cacheURL}/${resizeParam}/filters:no_upscale()/${urlParam}`
}

// https://github.com/nygardk/react-share/blob/master/src/utils/createShareButton.jsx#L7
export const isPromise = obj =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function'

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export function hexToRgba(hex, alpha) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  var opacity = alpha || 1
  var color = result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null

  return color ? `rgba(${color}, ${opacity})` : null
}

export function getBool(value) {
  return (
    value === true ||
    value === 'true' ||
    value === 1 ||
    parseInt(value, 10) === 1
  )
}

// https://stackoverflow.com/questions/4215737/convert-array-to-object
// https://jsperf.com/spread-vs-object-assign-vs-loop/1
export function arrayToObject(arr, key) {
  var arrayObject = {}
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] !== undefined) arrayObject[arr[i][key]] = arr[i]
  }
  return arrayObject
}

export function mergeDedupe(arrayOfArrays) {
  return [...new Set([].concat(...arrayOfArrays))]
}

// Prevent Scrolling
// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily#4770179
function preventDefault(e) {
  e = e || window.event
  if (e.preventDefault) e.preventDefault()
  e.returnValue = false
}

function preventDefaultForScrollKeys(e) {
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

export function disableScroll() {
  if (window.addEventListener)
    // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false)
  window.onwheel = preventDefault // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
  window.ontouchmove = preventDefault // mobile
  document.onkeydown = preventDefaultForScrollKeys

  // Added to stop scrollbar
  // document.body.style.height = '100vh'
  // document.body.style.overflowY = 'hidden'
}

export function enableScroll() {
  if (window.removeEventListener)
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
  window.onmousewheel = document.onmousewheel = null
  window.onwheel = null
  window.ontouchmove = null
  document.onkeydown = null

  // Added to stop scrollbar
  // document.body.style.height = 'initial'
  // document.body.style.overflowY = 'initial'
}

function timeDisplay(timeInMinutes, abbr) {
  const timeType = abbr ? 'min' : 'minute'
  return `${timeInMinutes} ${timeType}`
}

function getReadTime(word_count, abbr) {
  if (typeof parseInt(word_count) !== 'number') return null

  const timeInMinutes = Math.round(parseInt(word_count, 10) / READING_WPM)
  if (timeInMinutes < 1) return null
  return timeDisplay(timeInMinutes, abbr)
}

function getWatchTime(videos, abbr) {
  const timeInSeconds = videos ? videos[Object.keys(videos)[0]].length || 0 : 0

  if (typeof parseInt(timeInSeconds) !== 'number') return null

  if (timeInSeconds < 60) return null
  const timeInMinutes = Math.round(timeInSeconds / 60)
  return timeDisplay(timeInMinutes, abbr)
}

export function getItemTime({ word_count, has_video, videos }, abbr) {
  const isVideo = has_video === '2'
  return isVideo ? getWatchTime(videos, abbr) : getReadTime(word_count, abbr)
}

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export function validateEmail(email) {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function getScrollTop() {
  const doc = document.documentElement
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
}

export function atEndOfScroll(buffer = 0) {
  const doc = document.scrollingElement || document.documentElement
  return doc.scrollHeight - doc.scrollTop <= doc.clientHeight + buffer
}

export function urlWithPocketRedirect(url) {
  return `https://getpocket.com/redirect?url=${encodeURIComponent(url)}`
}

export function openBrowserWindow(
  url,
  { name = '_blank', height = 400, width = 550, ...opts },
  callback
) {
  const left =
    window.outerWidth / 2 +
    (window.screenX || window.screenLeft || 0) -
    width / 2
  const top =
    window.outerHeight / 2 +
    (window.screenY || window.screenTop || 0) -
    height / 2

  const config = {
    height,
    width,
    left,
    top,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    centerscreen: 'yes',
    chrome: 'yes',
    ...opts
  }

  const shareDialog = window.open(
    url,
    name,
    Object.keys(config)
      .map(key => `${key}=${config[key]}`)
      .join(', ')
  )

  if (callback) {
    const interval = window.setInterval(() => {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval)
          callback(shareDialog)
        }
      } catch (e) {
        console.error(e)
      }
    }, 1000)
  }

  return shareDialog
}

export function getListPositionByAttr(attribute) {
  const nodes = document.querySelectorAll(`[${attribute}]`)
  let nodeList = {}
  if (nodes) {
    nodes.forEach(item => {
      let key = Math.round(
        item.getBoundingClientRect().top + window.pageYOffset
      )
      nodeList[key] = item.getAttribute(attribute)
    })
  }
  return nodeList
}

export function validateURL(urlString) {
  // ReEx Pattern from https://gist.github.com/dperini/729294
  // Modified to accept only http(s)
  // Modified to accept assumed protocols: ie (www.example.com)
  // prettier-ignore
  const validURLRegex = /^(?:(?:(?:https?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
  return validURLRegex.test(urlString)
}

export function normalizeURL(urlString) {
  const trimmedURL = urlString.toString().trim()

  const validatedURL = validateURL(trimmedURL)
  if (!validatedURL) return false

  const normalizedURL = !/^https?:\/\//i.test(trimmedURL)
    ? 'http://' + trimmedURL
    : trimmedURL

  return normalizedURL
}

export function inEquality(nextProps, currentProps, label) {
  const changes = Object.keys(nextProps).reduce((accumulator, prop) => {
    const isEqual = nextProps[prop] === currentProps[prop]
    if (isEqual) return accumulator

    return Object.assign({}, accumulator, { [prop]: isEqual })
  }, {})
  if (label) console.group(label)
  console.table(changes)
  if (label) console.groupEnd(label)
}

export function shallowArrayEquality(arrA, arrB) {
  if (arrA === arrB) return true
  if (!arrA || !arrB) return false
  var len = arrA.length
  if (arrB.length !== len) return false
  for (var i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) return false
  }
  return true
}

export function normalizeTag(tag) {
  return tag
    ? tag
        .toString()
        .toLowerCase()
        .replace('_untagged_', 'untagged-items')
        .replace(/\s+/g, '-')
        .replace(/%/g, '%25') // Must be first
        .replace(/#/g, '%23')
        .replace(/\?/g, '%3F')
        .replace(/&/g, '%26')
        .replace(/\//g, '%2F')
    : tag
}

export function encodeListFilterForURL(include) {
  return URL_SUBTYPE_MAP[include] || include
}

export function parseListFilterSubType(include) {
  let parsedInclude
  Object.keys(URL_SUBTYPE_MAP).forEach(key => {
    if (URL_SUBTYPE_MAP[key] === include) {
      parsedInclude = key
    }
  })
  return parsedInclude || include
}
