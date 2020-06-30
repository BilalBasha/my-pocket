import { request as apiRequest } from '../_request/api'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function getArticleText(resolved_url) {
  return apiRequest({
    path: '/getItemArticle',
    data: {
      url: resolved_url
    }
  })
}
