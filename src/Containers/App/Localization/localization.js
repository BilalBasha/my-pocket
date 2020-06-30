import { getCurrentLanguageCode } from '../../../Common/helpers'
// import manifest from './manifest'
// import release from './release'

export const languages = [
  { name: 'English', code: 'en-US' },
  { name: 'German', code: 'de-DE' },
  { name: 'Spanish', code: 'es-ES' },
  { name: 'Spanish (LA)', code: 'es-LA' },
  { name: 'French Canadian', code: 'fr-CA' },
  { name: 'French', code: 'fr-FR' },
  { name: 'Italian', code: 'it-IT' },
  { name: 'Japanese', code: 'ja-JP' },
  { name: 'Korean', code: 'ko-KR' },
  { name: 'Dutch', code: 'nl-NL' },
  { name: 'Polish', code: 'pl-PL' },
  { name: 'Portuguese Brazil', code: 'pt-BR' },
  { name: 'Portuguese Portugal', code: 'pt-PT' },
  { name: 'Russian', code: 'ru-RU' },
  { name: 'Chinese Simplified', code: 'zh-CN' },
  { name: 'Chinese Traditional', code: 'zh-TW' }
]

const supportedCodes = languages.map(lang => lang.code)

export function defaultTranslation(force) {
  const current = force ? force : getCurrentLanguageCode()
  return getTranslation(current)
}

export function getTranslation(code) {
  return {
    "siteNav": {
      "home": "Home",
      "explore": "Explore",
      "discover": "Discover"
    },
    "topNav": {
      "tooltips": {
        "account": "Account Menu",
        "search": "Search",
        "saveAUrl": "Save a URL",
        "bulkEdit": "Bulk Edit",
        "notifications": "View Inbox"
      }
    },
    "pageTitles": {
      "unread": "My List",
      "tagged": "Tag",
      "archive": "Archive",
      "favorites": "Favorites",
      "highlights": "Highlights",
      "articles": "Articles",
      "videos": "Videos",
      "images": "Images",
      "discover": "Discover",
      "search": "Search"
    },
    "inbox": {
      "empty": {
        "header": "Your Inbox is Empty",
        "recieve": "When someone share items with you using Send to Friend, they will appear here.",
        "send": "You can also use Send to Friend to share items directly to a friend’s Pocket. Look for Send to Friend in the Share menu."
      },
      "unconfirmed": {
        "header": "Confirm Your Email",
        "message": "A friend has shared something with you in Pocket. To view it, please confirm your email: Bilal",
        "resend": "Resend Confirmation"
      },
      "sentBy": "sent you a message",
      "save": "Save",
      "ignore": "Ignore"
    },
    "profileMenu": {
      "viewprofile": "View Profile",
      "premium": "Premium",
      "help": "Help",
      "shortcuts": "Shortcuts",
      "options": "Options",
      "logout": "Logout",
      "whatsnew": "What’s New"
    },
    "whatsNewMenu": {
      "goto": "Go to your list",
      "getPremium": "Get Pocket Premium",
      "upgradeNow": "Upgrade now"
    },
    "upsell": {
      "upgrade": "Upgrade",
      "pocketPremium": "Pocket Premium"
    },
    "search": {
      "placeholder": "Search",
      "cancel": "Cancel",
      "search": "Search"
    },
    "addUrl": {
      "placeholder": "Save a URL",
      "cancel": "Cancel",
      "save": "Save"
    },
    "bulkEdit": {
      "selectItems": "Select items to edit",
      "cancel": "Cancel",
      "done": {
        "copy": "Done",
        "aria": "Close Bulk Edit"
      },
      "itemsSelected": "Bilal Selected",
      "addTags": "Add Tags",
      "favorite": "Favorite",
      "unfavorite":"Remove from Favorites",
      "archive": "Archive",
      "reAdd": "Re-add to List",
      "delete": "Delete"
    },
    "sideBar": {
      "tagsHeader": "Tags",
      "recommendations": "Recommendations",
      "filters": "Filters",
      "close": "Close Sidebar",
      "home": {
        "copy": "My List",
        "aria": "My List"
      },
      "archive": {
        "copy": "Archive",
        "aria": "Archive"
      },
      "favorites": {
        "copy": "Favorites",
        "aria": "Favorites"
      },
      "highlights": {
        "copy": "Highlights",
        "aria": "Highlights"
      },
      "tags": {
        "copy": "Tags",
        "aria": "Tags List",
        "close": "Close Tags List"
      },
      "articles":{
        "copy": "Articles",
        "aria": "Articles Filter"
      },
      "videos":{
        "copy": "Videos",
        "aria": "Videos Filter"
      },
      "upsell": {
        "title": "Get the ultimate Pocket experience",
        "copy": "Secure your saves and discover more features with Pocket Premium.",
        "cta": "Upgrade"
      },
      "footer": {
        "careers": "Careers at Pocket",
        "sponsor": "Become a Sponsor",
        "more": "More Links",
        "help": "Get Help",
        "blog": "Pocket Blog",
        "developer": "Developer API",
        "publisher": "Publishers",
        "about": "About",
        "terms": "Terms of Service",
        "privacy": "Privacy Policy"
      }
    },
    "itemDelete": {
      "single": {
        "header": "Delete Item",
        "warning": "Are you sure you want to delete this item? This cannot be undone."
      },
      "plural": {
        "header": "Delete Items",
        "warning": "Are you sure you want to delete these items? This cannot be undone."
      }
    },
    "tagDelete": {
      "header": "Are you sure?",
      "warning": "Once you delete a tag, you can't undo it!"
    },
    "modalConfirm": {
      "cancel":"Cancel",
      "delete": "Delete Bilal"
    },
    "listHeader":{
      "titles": {
        "archive": "Archive",
        "favorites": "Favorites",
        "highlights": "Highlights",
        "articles": "Articles",
        "videos": "Videos",
        "images": "Images",
        "discover": "Discover"
      },
      "include" : {
        "all" : "All Items",
        "unread" : "in My List",
        "read" : "in Archive",
        "favorite" : "in Favorites"
      },
      "sort": {
        "newest": "Newest",
        "oldest": "Oldest",
        "relevance": "Relevance"
      },
      "menu": {
        "all": {
          "copy": "All Items",
          "aria": "Show all items"
        },
        "unread": {
          "copy": "My List",
          "aria": "Only show items in My List"
        },
        "read": {
          "copy": "Archive",
          "aria": "Only show items in Archive"
        },
        "favorite": {
          "copy": "Favorites",
          "aria": "Only show Favorite items"
        }
      },
      "myList": "My List",
      "taggedAs": "Tagged as ${tag}",
      "searching": "Searching...",
      "search": "Search",
      "searchResult": "${searchResultCount} Search Result",
      "searchResults": "${searchResultCount} Search Results"
    },
    "itemFlag": {
      "bestOf": "Best Of",
      "trending": "Trending"
    },
    "itemDiscover": {
      "menu": {
          "copy": "Copy Link",
          "copied": "Copied!",
          "remove": "Hide Item"
      },
      "save": {
        "save": {
          "copy": "Save",
          "aria": "Save to Pocket"
        },
        "saved": {
          "copy": "Saved",
          "aria": "Saved to Pocket"
        }
      },
      "hide": {
        "whyHide": "Why are you hiding this item?",
        "notInteresting": "This is not interesting",
        "alreadySeen": "I've already seen this",
        "offensive": "This is offensive",
        "spam": "This is spam",
        "cancel": "Cancel",
        "remove": "Remove Item",
        "whyRecommended": "Why was this item recommended to me?"
      }
    },
    "itemCollection": {
      "menu": {
        "menuName": "Item Action Menu",
        "favorite": "Favorite",
        "unfavorite": "Remove from Favorites",
        "tagging": {
          "copy": "Tag",
          "aria": "Edit Tags"
        },
        "share": "Share",
        "delete": "Delete",
        "reAdd": {
          "copy": "Re-add",
          "aria": "Re-add to List"
        },
        "archive": "Archive"
      },
      "empty": {
        "include" : {
          "all" : "Pocket",
          "unread" : "list",
          "read" : "archive",
          "favorite" : "favorites"
        },
        "unreadNew": {
          "header": "Stories you add will appear here",
          "copy": "Interested in suggestions on what to read?",
          "cta": "Go to Discover"
        },
        "unread": {
          "header": "Nice job! You’ve finished reading your list",
          "copy": "Looking for interesting articles to read?",
          "cta": "Discover Stories"
        },
        "archive":{
          "header": "You haven’t archived anything yet",
          "copy": "When you archive an item in your List, it’ll appear here."
        },
        "favorites": {
          "header": "You don’t have any favorites in your ${include} yet",
          "copy": "When you favorite an item from your list, it’ll appear here."
        },
        "highlights": {
          "header": "You don’t have any highlights in your ${include} yet",
          "copy": "When you highlight an item in your List, it’ll appear here."
        },
        "tagged": {
          "header": "You don’t have any ’${tag}’ items in your ${include} yet",
          "copy": "Create tags to assign to your stories—they’ll help you easily search or sort your collection by topic or subject."
        },
        "articles": {
          "header": "You don’t have any articles in your ${include} yet",
          "copy": "Looking for interesting articles to read?",
          "cta": "Discover Stories"
        },
        "videos": {
          "header": "You don’t have any videos in your ${include} yet",
          "copy": "Interested in finding new content to read, watch and listen to?",
          "cta": "Discover Stories"
        },
        "search": {
          "header": "We couldn’t find anything for ’${query}’ in your ${include}",
          "copy": "Try entering a different keyword, publisher, or URL."
        }
      }
    },
    "tagList": {
      "tag": "Bilal tag",
      "untagged": {
        "copy": "untagged items",
        "aria": "items without tags"
      },
      "edit": "Edit tag",
      "delete": "Delete tag"
    },
    "tagging": {
      "errors": {
        "characterLimit": "Tags are limited to 25 characters",
        "validEmail": "Please enter a valid email address",
        "noSuggestedTags": "We were unable to find any suggested tags for this item"
      },
      "modal": {
        "save": "Save",
        "editTags": "Edit tags"
      },
      "upsell": {
        "message": "Tag stories faster than ever—get tag suggestions with",
        "cta": "Pocket Premium"
      }
    },
    "auth": {
      "error": {
        "header": "You’re almost there...",
        "copy": "It looks like your browser is set to block third-party cookies. Please update your privacy settings to accept cookies for app.getpocket.com and try logging in again.",
        "cta": "Learn More"
      }
    },
    "share": {
      "recommend": "Recommend",
      "sendToFriend": "Send to Friend",
      "commentPlaceholder": "Comment",
      "cancelAction": "Cancel",
      "recommendAction": "Recommend",
      "sendAction": "Send"
    },
    "shareMenu": {
      "copy": "Copy Link",
      "copied": "Copied!",
      "recommend": "Recommend",
      "sendToFriend": "Send To Friend",
      "permanentCopy": {
        "copy": "Permanent Copy",
        "aria": "View Permanent Copy"
      },
      "viewOriginal":  "View Original"
    },
    "shareExcerpt": {
      "shareExcerpt": {
        "copy": "Share",
        "aria": "Share selected text"
      },
      "highlight": {
        "copy":"Highlight",
        "aria": "Highlight selected text"
      }
    },
    "appError": {
      "header": "Oops! Somethings gone awry...",
      "copy": "Try refreshing your page and see if that fixes things. If you’re still seeing the issue, please contact our Support Team.",
      "cta": "Contact Support"
    },
    "highlightLimit": {
      "first": "You created your first highlight. Click here to see it alongside other highlights you create in this article.",
      "header": "You’re limited to Bilal highlights per article.",
      "subheader": "Pocket Premium members get unlimited highlights.",
      "cta": "Upgrade",
      "ctaNow": "Upgrade now",
      "dismiss": "Maybe Later"
    },
    "annotations": {
      "tooltip": "Highlights",
      "listHeading": "My Highlights",
      "menu": "Highlight Menu",
      "infoHeading": "You haven’t highlighted anything yet",
      "instructions": "When you select text while you’re reading, it'll appear here.",
      "show": {
        "copy": "Show Highlights",
        "aria": "Show my Highlights"
      },
      "hide": {
        "copy": "Hide Highlights",
        "aria": "Hide my Highlights"
      },
      "scrollTo": "Scroll To Highlight",
      "delete": {
        "copy": "Delete",
        "aria": "Delete Highlight"
      },
      "share": {
        "copy": "Share",
        "aria": "Share Highlight"
      }
    },
    "reader":{
      "topNav": {
        "back": "Back to list",
        "highlights": "Highlights",
        "favorite": "Favorite",
        "unfavorite": "Remove from Favorites",
        "tagging": "Tag",
        "share": "Share Menu",
        "delete": "Delete",
        "reAdd": {
          "copy": "Re-add",
          "aria": "Re-add to List"
        },
        "archive": "Archive",
        "displaySettings": "Display Settings",
        "fontOptions": "Font Options"
      },
      "displaySettings":{
        "plusSize": "Increase Text Size",
        "minusSize": "Decrease Text Size",
        "plusColumnWidth": "Increase Column Widths",
        "minusColumnWidth": "Decrease Column Widths",
        "plusLineHeight": "Increase Line Height ",
        "minusLineHeight": "Decrease Line Height",
        "themeLight": "Light Theme",
        "themeDark": "Dark Theme",
        "themeSepia": "Sepia Theme",
        "sortNewest": "Sort items by newest first",
        "sortOldest": "Sort items by oldest first",
        "listMode": "Display items as a list",
        "tileMode": "Display items in a grid",
        "fontOptions": "Font Options",
        "font": "Bilal Font",
        "unlock": "Unlock more options",
        "upgrade": "Upgrade",
        "back": "Back to Display Settings"
      },
      "premiumFontUpsell": {
        "header": "You are previewing the premium font Bilal.",
        "copy": "Get access to all fonts and more by upgrading to Premium.",
        "upgrade": "Upgrade"
      },
      "premiumBottomUpsell": {
        "library": {
          "title": "Read with purpose",
          "copy": "Build a permanent library of every article you’ve saved with Pocket Premium.",
          "copySm": "Build a permanent library of every article you’ve saved with"
        },
        "search": {
          "title": "Search every word in your Pocket",
          "copy": "Unlock our powerful search tool when you join Pocket Premium.",
          "copySm": "Quickly search every word in your Pocket when you join"
        },
        "focused": {
          "title": "Ditch the ads",
          "copy": "Boost your focus and get an ad-free experience with Pocket Premium.",
          "copySm": "Boost your focus and get an ad-free experience with"
        },
        "type": {
          "title": "Read in your favorite font",
          "copy": "Get access to 8 exclusive fonts when you join Pocket Premium.",
          "copySm": "Customize your Pocket with 8 exclusive fonts when you join"
        },
        "features": {
          "title": "Unlock exclusive features",
          "copy": "Take your reading experience to the next level when you join Pocket Premium.",
          "copySm": "Take your reading experience to the next level when you join"
        },
        "highlights": {
          "title": "Unlock unlimited highlights",
          "copy": "Capture as many ideas as you’d like in every article with Pocket Premium.",
          "copySm": "Unlock unlimited highlights and never lose track of an idea with"
        },
        "tags": {
          "title": "Tag stories faster than ever",
          "copy": "Save time and get helpful tag suggestions with Pocket Premium.",
          "copySm": "Tag stories faster than ever. Get tag suggestions with"
        }
      },
      "tagging":{
        "tagOverflow": "+ Bilal more"
      },
      "header": {
        "by": "By",
        "viewOriginal": "View Original"
      },
      "explore": {
        "exploreBest": "Explore the best from:",
        "readMore": "Read more about:"
      }
    },
    "time": {
      "now": "Just now",
      "addedtoday": "Added Today",
      "addeddayago": "Added Bilal day ago",
      "addeddaysago": "Added Bilal days ago",
      "added": "Added Bilal"
    },
    "toasts": {
      "addUrl": "Saved to Pocket",
      "addUrlFailed": "Please enter a valid URL",
      "archive": "Archived",
      "reAdd": "Added to List",
      "delete": "Deleted",
      "tagAdded": "Tag updated",
      "tagsAdded": "Tags updated",
      "sent": "Sent",
      "recommended": "Sent",
      "socialShare": "Sent",
      "notInList": "This item cannot be found in your list"
    }
  };
  // Validate code and default to english
  // const validCode = supportedCodes.includes(code) ? code : 'en-US'

  // return fetch(`/locales/${manifest[validCode]}.json`, {
  // return fetch(`https://app.getpocket.com/locales/dictwebapp_en-US_2de686f8f076493058da32a4777b37af.json`)
  //   .then(handleErrors)
  //   .then(response => response.json())
  //   .then(response => ({ translation: response, code }))
  //   .catch(console.error)
}

export function getReleaseNotes(force) {
  const code = force ? force : getCurrentLanguageCode()
  // Validate code and default to english
  const validCode = supportedCodes.includes(code) ? code : 'en-US'
console.log('......here.......... bilal');
  // return fetch(`/locales/releaseNotes/${release[validCode]}.md`)
  //   .then(handleErrors)
  //   .then(response => response.text())
  //   .catch(console.error)
}

function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText)
  return response
}
