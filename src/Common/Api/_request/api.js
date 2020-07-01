import { API_URL, LOGIN_URL, CONSUMER_KEY } from '../../../Common/constants'
import { getCurrentLanguageCode } from '../../../Common/helpers'

function request(options) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Accept': 'application/json; charset=UTF8 '
  })

  if (options && options.data) {
    options.data['locale_lang'] = getCurrentLanguageCode()
  }

  // TODO: Be smarter about building the request url.
  // Append consumer_key to the url so that the CORS pre-flight request will
  // include the parameter. This is required to validate the Origin of the
  // request with the consumer key.
  options.path = `${API_URL}${
    options.path
  }?enable_cors=1&consumer_key=${CONSUMER_KEY}`

  let fetchData = {
    body: JSON.stringify(options.data),
    cache: 'no-cache',
    headers: headers,
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors'
  }

  return fetch(options.path, fetchData)
    .then(handleErrors)
    .then(checkAuth)
    .then(response => response.json())
    .catch(error => console.error(error))
}

function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}

function checkAuth(response) {
  const authCode = response.headers.get('x-error-code')
  const authAttempted = document.cookie
    .split(';')
    .filter(item => item.includes('auth_attempt=')).length

  if (authAttempted && authCode === '100') {
    console.log('Authed attempted and failed')
    return { json: () => ({ auth_unavailable: true }) }
  }

  if (authCode === '100') return invalidateAndAuthorize(response)
  return response
}

function invalidateAndAuthorize(response) {
  document.cookie = 'auth_attempt=true;max-age=30'

  window.location.replace(`${LOGIN_URL}?route=${document.location}`)
  throw Error(response.headers.get('x-error'))
}

export { request }