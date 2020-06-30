import { COLORS, GRADIENTS, grey20, pine80, pine20, white } from '../../Elements/Themes/colors' // eslint-disable-line
import { hexToRgba } from '../../../Common/helpers'
export const Themes = {
  light: themeObject('light'),
  dark: themeObject('dark'),
  sepia: themeObject('sepia')
}

function themeObject(theme) {
  const color = COLORS[theme]

  const shades = {
    light: {
      base: color.white,
      border: color.gray5,
      shade1: color.gray1,
      shade2: color.gray2,
      shade3: color.gray3,
      shade4: color.gray4,
      shade5: color.gray5,
      shade6: color.gray6,
      shade7: color.gray6,
      shade8: color.gray40,
      stepbtnhover: color.darkTeal.stepbtnhover,
      stepbtninactive: color.gray20
    },
    dark: {
      base: color.gray1,
      border: color.black,
      shade0: color.gray6,
      shade1: color.white,
      shade2: color.gray3,
      shade3: color.gray4,
      shade4: color.gray5,
      shade5: color.gray6,
      shade6: color.black,
      shade7: color.gray7,
      shade8: color.gray40,
      stepbtnhover: color.darkTeal.stepbtnhover,
      stepbtninactive: color.gray80
    },
    sepia: {
      base: color.brown7,
      border: color.brown5,
      shade0: color.brown0,
      shade1: color.brown1,
      shade2: color.brown2,
      shade3: color.brown3,
      shade4: color.brown4,
      shade5: color.brown5,
      shade6: color.brown6,
      shade7: color.brown0,
      shade8: color.brown40,
      stepbtnhover: color.darkTeal.stepbtnhover,
      stepbtninactive: color.brown20
    }
  }

  const {
    base,
    shade1,
    shade2,
    shade3,
    shade4,
    shade5,
    shade6,
    shade7,
    shade8,
    stepbtnhover,
    stepbtninactive,
    border
  } = shades[theme]
  const { coral, blue, teal, amber, mintGreen, darkTeal } = color
  return {
    body: {
      background: base,
      pre: shade6,
      color: shade1,
      subcolor: shade2,
      border: border,
      selection: color.selection,
      highlight: color.highlight,
      link: {
        color: blue.solid,
        hover: blue.hover
      }
    },
    loader: {
      circle: coral.solid,
      triangle: amber.solid,
      square: darkTeal.solid
    },
    brand: {
      color: coral.solid,
      hover: coral.hover
    },
    divider: {
      background: border
    },
    overlay: {
      background: base,
      color: shade1,
      shadow: color.shadow
    },
    modal: {
      header: {
        color: shade1
      },
      content: {
        color: shade3
      },
      shade: {
        background: color.modal
      }
    },
    notifications: {
      neutral: {
        color: color.white,
        background: blue.solid
      },
      success: {
        background: darkTeal.solid,
        color: color.white
      },
      warn: {
        color: color.white,
        background: coral.solid
      }
    },
    navBar: {
      rainbowbar: GRADIENTS.rainbowbar,
      input: {
        background: shade6,
        border: shade5
      },
      siteNav: {
        color: shade1,
        hover: darkTeal.solid
      },
      action: {
        color: shade3,
        hover: {
          color: shade1
        },
        favorite: amber.solid
      },
      top: {
        color: shade1,
        background: base,
        border: border
      },
      bottom: {
        color: shade1,
        background: base,
        border: border
      }
    },
    menu: {
      color: shade3,
      background: base,
      hover: {
        color: darkTeal.solid,
        background: darkTeal.selection
      }
    },
    list: {
      header: {
        color: shade3,
        hover: darkTeal.solid
      },
      empty: {
        figure: shade1,
        accent: coral.solid,
        header: shade1,
        copy: shade3
      }
    },
    buttons: {
      light: {
        background: color.gray6,
        color: shade1,
        border: border,
        hover: {
          background: shade6,
          color: shade1,
          border: border
        },
        active: {
          background: shade6,
          color: shade1,
          border: base
        }
      },
      disabled: {
        background: border,
        color: base,
        border: border,
        hover: {
          background: border,
          color: base,
          border: border
        },
        active: {
          background: border,
          color: base,
          border: base
        }
      },
      neutral: {
        background: base,
        color: shade1,
        border: border,
        hover: {
          background: shade6,
          color: shade1,
          border: border
        },
        active: {
          background: shade6,
          color: shade1,
          border: base
        }
      },
      warn: {
        background: coral.solid,
        color: base,
        border: coral.solid,
        hover: {
          background: coral.hover,
          color: base,
          border: coral.hover
        },
        active: {
          background: coral.hover,
          color: base,
          border: base
        }
      },
      cta: {
        background: blue.solid,
        color: base,
        border: blue.solid,
        hover: {
          background: blue.hover,
          color: base,
          border: blue.hover
        },
        active: {
          background: blue.hover,
          color: base,
          border: base
        }
      },
      toast: {
        background: mintGreen.solid,
        color: shade2,
        border: mintGreen.solid,
        hover: {
          background: mintGreen.hover,
          color: base,
          border: mintGreen.hover
        },
        active: {
          background: mintGreen.hover,
          color: base,
          border: base
        }
      },
      open: {
        background: base,
        color: blue.solid,
        border: blue.solid,
        hover: {
          background: base,
          color: blue.hover,
          border: blue.hover
        },
        active: {
          background: base,
          color: blue.hover,
          border: base
        }
      },
      upgrade: {
        background: color.premium.background,
        color: color.premium.color,
        border: color.premium.background,
        hover: {
          background: color.premium.backgroundActive,
          color: color.premium.color,
          border: color.premium.backgroundActive
        },
        active: {
          background: color.premium.backgroundActive,
          color: color.premium.color,
          border: base
        }
      }
    },
    tags: {
      tag: {
        color: shade3,
        background: shade6,
        selected: {
          color: base,
          background: darkTeal.solid,
          hover: {
            background: darkTeal.hover,
            color: base
          }
        },
        hover: {
          color: shade1,
          background: shade6
        }
      },
      suggested: {
        color: blue.solid,
        background: base,
        border: blue.solid,
        hover: {
          color: blue.hover,
          background: base,
          border: blue.hover
        }
      },
      favorite: {
        color: base,
        background: amber.solid
      },
      webOnly: {
        color: base,
        background: blue.solid
      },
      bestOf: {
        color: coral.solid,
        background: coral.light
      },
      trending: {
        color: color.teal.solid,
        background: color.teal.light
      },
      highlight: {
        color: '#976D28',
        background: color.amber.light,
        icon: '#FFC25E'
      }
    },
    progressBar: {
      background: darkTeal.solid
    },
    sharesheet: {
      color: shade1,
      background: base,
      border: border,
      subHeader: shade6,
      comment: {
        border: border,
        color: shade3
      }
    },
    reportItem: {
      color: shade2,
      selector: {
        color: shade4,
        active: darkTeal.solid
      }
    },
    popovers: {},
    form: {
      placeholder: shade1,
      border: border,
      color: shade2,
      hover: darkTeal.solid,
      input: {
        border: shade6,
        background: shade6,
        placeholder: shade3
      },
      typeahead: {
        hover: 'rgba(211, 211, 211, 0.5)'
      }
    },
    item: {
      bulk: {
        selected: darkTeal.selection
      },
      link: {
        color: shade1,
        hover: blue.solid
      },
      image: {
        border: border,
        fallback: {
          coral: {
            background: coral.touch,
            color: coral.solid
          },
          teal: {
            background: teal.touch,
            color: teal.solid
          },
          blue: {
            background: blue.touch,
            color: blue.solid
          },
          amber: {
            background: amber.touch,
            color: amber.solid
          }
        }
      },
      info: {
        color: shade3,
        hover: blue.solid
      },
      excerpt: {
        color: shade2
      },
      footer: {
        border: border
      },
      menu: {
        background: base,
        favorite: amber.solid,
        button: {
          hover: {
            background: darkTeal.selection,
            color: darkTeal.solid
          },
          color: shade1
        },
        trigger: {
          color: shade3
        }
      },
      video: {
        play: {
          color: color.white,
          background: color.modal
        }
      }
    },
    inbox: {
      background: base,
      strong: shade1,
      color: shade3,
      border: shade5,
      link: {
        color: blue.solid,
        hover: blue.hover
      }
    },
    sidebar: {
      background: base,
      header: shade4,
      border: shade5,
      separator: shade6,
      scrollbar: shade3,
      tag: {
        color: shade3,
        editable: shade6,
        input: {
          color: shade1
        },
        hover: {
          background: darkTeal.navBack,
          color: darkTeal.nav
        },
        actions: {
          delete: {
            color: coral.solid,
            hover: {
              color: coral.hover
            }
          },
          close: {
            color: shade3,
            hover: {
              color: shade2
            }
          },
          edit: {
            color: darkTeal.nav,
            hover: {
              color: darkTeal.hover
            }
          }
        }
      },
      menu: {
        button: {
          primary: {
            color: shade2,
            hover: darkTeal.nav,
            background: darkTeal.navBack
          },
          secondary: {
            color: shade3,
            hover: darkTeal.nav,
            background: darkTeal.navBack
          }
        }
      },
      subMenu: {
        color: shade1,
        hover: blue.hover
      }
    },
    profile: {
      popover: {
        divider: shade6,
        name: {
          color: shade1
        },
        viewprofile: {
          color: shade1,
          hover: darkTeal.solid
        },
        link: {
          hover: darkTeal.solid,
          color: shade1
        }
      }
    },
    settings: {
      active: darkTeal.solid,
      text: {
        header: shade4,
        color: shade3,
        hover: darkTeal.solid,
        inactive: grey20
      },
      premium: {
        color: blue.solid,
        hover: blue.hover,
        base: color.premium.background,
        active: color.premium.backgroundActive,
        border: color.premium.border
      },
      stepper: {
        stepactive: darkTeal.solid,
        stepinactive: shade8,
        stephover: pine20,
        buttonbackground: shade7,
        buttoncolorinactive: stepbtninactive,
        buttonbackgroundhover: stepbtnhover,
        buttonhover: pine80
      },
      border: shade6,
      theme: {
        hover: darkTeal.selection,
        active: darkTeal.solid,
        light: {
          background: COLORS.light.white,
          border: COLORS.light.gray4
        },
        dark: {
          background: COLORS.dark.gray1,
          border: COLORS.dark.gray2
        },
        sepia: {
          background: COLORS.sepia.brown7,
          border: COLORS.sepia.brown4
        }
      }
    },
    article: {
      background: base,
      header: shade1,
      subHeader: shade3
    },
    whatsnew: {
      header: shade1,
      copy: shade2,
      list: shade3,
      color: shade2
    },
    annotations: {
      bright: amber.solid,
      preview: hexToRgba(color.highlight.background, 0.4),
      active: hexToRgba(amber.solid, 0.3),
      border: color.highlight.border,
      borderActive: color.highlight.borderActive,
      gutter: color.highlight.gutter,
      gutterActive: color.highlight.gutterActive,
      metaColor: color.highlight.metaColor
    },
    selectionPopover: {
      background: color.selectionPopover.background
    },
    cta: {
      color: color.cta.color,
      hover: color.cta.hover
    },
    upsell: {
      title: color.upsell.title,
      copy: color.upsell.copy,
      subCopy: color.upsell.subCopy
    },
    toast: {
      success: {
        background: color.toast.success.background,
        color: color.toast.success.color
      },
      neutral: {
        background: color.toast.neutral.background,
        color: color.toast.neutral.color
      },
      warn: {
        background: color.toast.warn.background,
        color: color.toast.warn.color
      }
    }
  }
}
