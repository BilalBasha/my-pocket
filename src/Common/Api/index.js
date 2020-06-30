import { initialize, authError } from './initialize/initialize'

import { getItems, fetchItems } from './items/items'
import { getArticleText } from './article/article'
// import { getSuggestedTopics } from './article/article'
import { getSuggestedTags } from './article/tags'
import { getUser } from './auth/auth'
import { sendAnalytics } from './analytics/analytics'
import { renameStoredTag, deleteStoredTag } from './tags/tags'
import { fetchStoredTags, fetchStoredTagChanges } from './tags/tags'
import { getFeed, reportItem } from './feed/feed'
import { getShares, addShare, ignoreShare } from './inbox/shares'
import { resendConfirmation } from './inbox/shares'
import { saveRecentSearch } from './search/search'
import { getSettings, setReleaseVersion } from './settings/settings'
export {
  initialize,
  getItems,
  fetchItems,
  fetchStoredTags,
  fetchStoredTagChanges,
  renameStoredTag,
  deleteStoredTag,
  getArticleText,
  // getSuggestedTopics,
  getSuggestedTags,
  getUser,
  sendAnalytics,
  getFeed,
  reportItem,
  getShares,
  addShare,
  ignoreShare,
  resendConfirmation,
  saveRecentSearch,
  authError,
  getSettings,
  setReleaseVersion
}
