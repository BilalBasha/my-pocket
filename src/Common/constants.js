export const APP_VERSION = '7.0.0'
export const GET_TEXT_URL = 'https://dev.text.readitlater.com/v3beta/text'
export const API_URL = 'https://getpocket.com/v3'
export const LOGIN_URL = 'https://getpocket.com/login'
export const PREMIUM_URL = 'https://getpocket.com/premium?ep='
export const PREMIUM_SETTINGS_URL = 'https://getpocket.com/premium_settings'
export const PERM_LIB_URL = 'https://getpocket.com/library/?pl_i='
export const CONSUMER_KEY = '78809-9423d8c743a58f62b23ee85c'
export const FIRST_LOAD_COUNT = 24
export const LOAD_COUNT = 48
export const EMPTY_STATE_DELAY = 1000
export const LOADER_DELAY = 600
export const LOADER_MINIMUM = 800

// prettier-ignore
export const COLUMN_WIDTH_RANGE = [531, 574, 632, 718, 826, 933, 1041]
// prettier-ignore
export const LINE_HEIGHT_RANGE = [1.2,1.3,1.4,1.5,1.65,1.9,2.5]
// prettier-ignore
export const FONT_RANGE = [16, 19, 22, 25, 28, 32, 37]

export const DEFAULT_FONT_SIZE = 3
export const DEFAULT_LINEHEIGHT = 3
export const DEFAULT_COLUMN_WIDTH = 3

export const FONT_TYPES = {
  blanco: {
    family: 'Blanco',
    src: 'font.blanco.css',
    name: 'Blanco',
    selector: 'Blanco',
    size: '1em'
  },
  graphik: {
    family: 'Graphik Web',
    src: 'font.graphik.css',
    name: 'Graphik',
    selector: 'Graphik',
    size: '0.9em'
  },
  ideal: {
    premium: true,
    family: 'IdealSans',
    src: 'font.ideal.css',
    name: 'Ideal Sans',
    selector: 'Ideal_Sans',
    size: '0.85em'
  },
  inter: {
    premium: true,
    family: 'Inter',
    src: 'font.inter.css',
    name: 'Inter',
    selector: 'Inter',
    size: '0.9em'
  },
  plex: {
    premium: true,
    family: 'IBM Plex Sans',
    src:
      'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,600,600i',
    name: 'Plex Sans',
    selector: 'Plex_Sans',
    size: '0.95em'
  },
  sentinel: {
    premium: true,
    family: 'Sentinel',
    src: 'font.sentinel.css',
    name: 'Sentinel',
    selector: 'Sentinel',
    size: '0.85em'
  },
  tiempos: {
    premium: true,
    family: 'Tiempos',
    src: 'font.tiempos.css',
    name: 'Tiempos',
    selector: 'Tiempos',
    size: '0.9em'
  },
  vollkorn: {
    premium: true,
    family: 'Vollkorn',
    src: 'https://fonts.googleapis.com/css?family=Vollkorn:400,400i,700,700i',
    name: 'Vollkorn',
    selector: 'Vollkorn',
    size: '0.95em'
  },
  whitney: {
    premium: true,
    family: 'Whitney',
    src: 'font.whitney.css',
    name: 'Whitney',
    selector: 'Whitney',
    size: '0.85em'
  },
  zilla: {
    premium: true,
    family: 'Zilla Slab',
    src: 'https://fonts.googleapis.com/css?family=Zilla+Slab:400,400i,600,600i',
    name: 'Zilla Slab',
    selector: 'Zilla_Slab',
    size: '0.95em'
  }
}

export const FONT_DEFAULTS = {
  sans: { ...FONT_TYPES['graphik'] },
  serif: { ...FONT_TYPES['blanco'] }
}

export const FONT_RATIOS = {
  sans: 0.898,
  serif: 1
}

export const MAX_ANNOTATIONS_DEFAULT = 3

export const KEYS = {
  BACKSPACE: 8,
  COMMA: 44,
  TAB: 9,
  ENTER: 13,
  DELETE: 46,
  ESCAPE: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}

export const ZINDEX = {
  toast: 22,
  modal: 21,
  shade: 20,
  toolTipArrow: 19,
  toolTip: 18,
  notification: 17,
  typeahead: 16,
  popover: 15,
  sideBarOverlay: 8,
  progressBar: 7,
  navBar: 6,
  sideBar: 5,
  upsell: 4,
  item: {
    menu: 3,
    footer: 2,
    readLink: 1
  }
}
export const READING_WPM = 220

export const URL_SUBTYPE_MAP = {
  'unread': 'list',
  'read': 'archive',
  'favorite': 'favorites'
}

export const ANALYTICS_KEYS = {
  UI: 'cxt_ui',
  VIEW: 'cxt_view',
  INDEX: 'cxt_index',
  LIST_MODE: 'cxt_list_view'
}

export const PREMIUM_ENTRY_POINTS = {
  PROFILE: 2, // Pocket account drop-down menu in logged-in state
  DISPLAY: 3, // User clicks Premium upsell in Reader display settings
  FONT: 4, // User clicks through Upgrade button in banner at top of Reader when previewing a Premium font
  ANNOTATIONS: 5, // User clicks 'Get Premium' after attempting to highlight a 4th time in an article and seeing the upsell
  WHATSNEW: 6, // User clicks 'Get Pocket Premium' in the What’s New modal
  TOP_NAV: 10, // Upgrade button by Profile Button on List
  SIDE_TOP_NAV: 10, // Upgrade button on top of sidebar overlay on List
  SIDEBAR: 11, // Upgrade link in upsell in full sidebar on List
  READER: 12, // Upgrade link in upsell at bottom of Reader
  SUGGESTED_TAGS: 13, // Upgrade link where suggested tags live
  SIDE_ANNOTATIONS: 14, // Upgrade link at bottom of annotations list in Reader
}

export const BREAKPOINTS = [768, 1152, 1290]
export const SIDEBAR_WIDTH = 193
export const SIDEBAR_OVERLAY_WIDTH = 320

export const SIZES = {
  LARGE: {
    HAS_SIDEBAR: true,
    MAX_WIDTH: 1290,
    LIST: {
      COLUMN_COUNT: 1,
      HEIGHT: 165,
      IMAGE_HEIGHT: 84,
      IMAGE_WIDTH: 125,
      TITLE_SIZE: 20,
      TITLE_LINE: 1.2,
      TITLE_CLAMP: 2,
      TITLE_MAX: 2.4
    },
    GRID: {
      COLUMN_COUNT: 3,
      WIDTH: 342,
      HEIGHT: 485,
      IMAGE_HEIGHT: 220,
      TITLE_SIZE: 18,
      TITLE_LINE: 1.2,
      TITLE_CLAMP: 3,
      TITLE_MAX: 3.6
    }
  },
  MEDIUM: {
    HAS_SIDEBAR: true,
    MAX_WIDTH: 1152,
    LIST: {
      COLUMN_COUNT: 1,
      HEIGHT: 165,
      IMAGE_HEIGHT: 84,
      IMAGE_WIDTH: 125,
      TITLE_SIZE: 20,
      TITLE_LINE: 1.2,
      TITLE_CLAMP: 2,
      TITLE_MAX: 2.4
    },
    GRID: {
      COLUMN_COUNT: 3,
      WIDTH: 342,
      HEIGHT: 445,
      IMAGE_HEIGHT: 170,
      TITLE_SIZE: 18,
      TITLE_LINE: 1.2,
      TITLE_CLAMP: 3,
      TITLE_MAX: 3.6
    }
  },
  SMALL: {
    HAS_SIDEBAR: false,
    MAX_WIDTH: 768,
    LIST: {
      COLUMN_COUNT: 1,
      HEIGHT: 165,
      IMAGE_HEIGHT: 84,
      IMAGE_WIDTH: 125,
      TITLE_SIZE: 20,
      TITLE_LINE: 1.2,
      TITLE_CLAMP: 2,
      TITLE_MAX: 2.4
    },
    GRID: {
      COLUMN_COUNT: 3,
      WIDTH: 342,
      HEIGHT: 425,
      IMAGE_HEIGHT: 136,
      TITLE_SIZE: 18,
      TITLE_LINE: 1.2,
      TITLE_CLAMP: 3,
      TITLE_MAX: 3.6
    }
  },
  MINI: {
    HAS_SIDEBAR: false,
    MAX_WIDTH: 375,
    LIST: {
      COLUMN_COUNT: 1,
      HEIGHT: 240,
      IMAGE_HEIGHT: 60,
      IMAGE_WIDTH: 0,
      TITLE_SIZE: 20,
      TITLE_LINE: 1.2,
      TITLE_CLAMP: 3,
      TITLE_MAX: 3.6
    },
    GRID: {
      COLUMN_COUNT: 1,
      WIDTH: 342,
      HEIGHT: 485,
      IMAGE_HEIGHT: 220,
      TITLE_SIZE: 20,
      TITLE_LINE: 1.2,
      TITLE_CLAMP: 3,
      TITLE_MAX: 3.6
    }
  }
}

export const READER_PADDING = 40
