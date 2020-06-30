export const black = '#000000'
export const cream = '#F5EDDD' //#F8F0DB
export const white = '#FFFFFF'
export const selection1 = '#E5F2F1'
export const selection2 = '#DDE2D2'
export const selection3 = '#162827'
export const brown100 = '#483C28'
export const brown80 = '#6B604C'
export const brown60 = '#968C7A'
export const brown40 = '#B9B09B'
export const brown20 = '#D4CBB6'
export const brown0 = '#E6DDC8'
export const grey100 = '#1A1A1A'
export const grey80 = '#505050'
export const grey60 = '#919191'
export const grey40 = '#B2B2B2'
export const grey20 = '#D3D3D3'
export const grey0 = '#F2F2F2'
export const coral100 = '#8F2634'
export const coral80 = '#EF4056'
export const coral60 = '#F55C6F'
export const coral40 = '#F7A5AF'
export const coral20 = '#FAC3CA'
export const coral0 = '#FDECEE'
export const amber100 = '#976D28'
export const amber80 = '#FCB643'
export const amber60 = '#FFC25E'
export const amber40 = '#FEDDA7'
export const amber20 = '#FEE8C3'
export const amber0 = '#FFF8EC'
export const mint100 = '#397C5B'
export const mint80 = '#5FCF97'
export const mint60 = '#7BE2AE'
export const mint40 = '#B6EAD0'
export const mint20 = '#D1F2E1'
export const mint0 = '#F3FDF8'
export const teal100 = '#116A65'
export const teal80 = '#1CB0A8'
export const teal60 = '#61CDC7'
export const teal40 = '#94DAD6'
export const teal20 = '#B8E6E4'
export const teal0 = '#E8F7F6'
export const pine100 = '#004945'
export const pine80 = '#007A73'
export const pine60 = '#31908A'
export const pine40 = '#86C1BD'
export const pine20 = '#AFD6D3'
export const pine0 = '#E5F2F1'
export const blue100 = '#126795'
export const blue80 = '#1EABF9'
export const blue60 = '#59C3FE'
export const blue40 = '#95D8FC'
export const blue20 = '#B8E5FD'
export const blue0 = '#E8F7FE'
export const purple100 = '#61268F'
export const purple80 = '#A240EF'
export const purple60 = '#BE6FFC'
export const purple40 = '#D3A5F7'
export const purple20 = '#E2C3FA'
export const purple0 = '#F6ECFD'

const tealLightCompliment = '#95D5D2'
const tealDark = '#004D48'
const tealDarkCompliment = pine80

export const COLORS = {
  light: {
    black: black,
    white: white,
    gray1: '#333333',
    gray2: '#4F4F4F',
    gray3: '#828282',
    gray4: '#BDBDBD',
    gray5: '#E0E0E0',
    gray6: grey0,
    gray20: grey20,
    gray40: grey40,
    coral: {
      solid: coral80,
      hover: '#913A44' /* Coral Hover */,
      light: coral0,
      touch: '#FBCFD5' /* Coral Touch */
    },
    amber: {
      solid: amber80 /* Amber */,
      hover: '#97743B' /* Amber Hover */,
      light: amber0,
      touch: '#FEEDD0' /* Amber Touch */
    },
    mintGreen: {
      solid: '#83EDB8' /* Mint Green */,
      hover: '#5B9075' /* Mint Green Hover */,
      light: mint0,
      touch: '#E0FBED' /* Mint Green Touch */
    },
    teal: {
      solid: teal80,
      hover: '#27716D' /* Teal Hover */,
      light: teal0,
      touch: '#BBE7E5' /* Teal Touch */
    },
    darkTeal: {
      solid: pine80,
      hover: '#195653' /* Dark Teal Hover */,
      light: pine0,
      touch: '#BFDDDC' /* Dark Teal Touch */,
      selection: selection1,
      nav: teal100,
      navBack: 'rgba(28,176,168,0.2)',
      stepbtnhover: pine0
    },
    blue: {
      solid: blue80,
      hover: '#286F96' /* Blue Hover */,
      light: blue0,
      touch: '#8FD5FC' /* Blue Touch */
    },
    purple: {
      solid: purple80,
      hover: '#6A3991' /* Purple Hover */,
      light: '#E7CFFB' /* Purple Touch */,
      touch: purple0
    },
    shadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
    modal: 'rgba(51, 51, 51, 0.5)',
    selection: {
      background: selection1,
      color: '#333333'
    },
    selectionPopover: {
      background: white
    },
    highlight: {
      background: amber20,
      color: '#333333',
      border: grey20,
      borderActive: grey80,
      gutter: grey0,
      gutterActive: '#F7F7F7',
      metaColor: grey60
    },
    toast: {
      success: {
        background: pine0,
        color: pine100
      },
      warn: {
        background: coral60,
        color: white
      },
      neutral: {
        background: pine0,
        color: pine100
      }
    },
    premium: {
      background: tealDark,
      backgroundActive: tealDarkCompliment,
      color: white,
      border: grey0
    },
    cta: {
      color: tealDark,
      hover: tealDarkCompliment
    },
    upsell: {
      title: '#333333',
      copy: '#4F4F4F',
      subCopy: grey80
    }
  },
  dark: {
    black: black,
    white: '#E0E0E0',
    gray1: grey100,
    gray2: '#3f3f3f',
    gray3: '#828282',
    gray4: '#BDBDBD',
    gray5: '#E0E0E0',
    gray6: grey0,
    gray7: '#353535',
    gray40: grey40,
    gray80: grey80,
    coral: {
      solid: coral80,
      hover: '#FBCFD5' /* Coral Hover */,
      light: coral0,
      touch: '#913A44' /* Coral Touch */
    },
    amber: {
      solid: amber80,
      hover: '#FEEDD0' /* Amber Hover */,
      light: amber0,
      touch: '#97743B' /* Amber Touch */
    },
    mintGreen: {
      solid: '#83EDB8' /* Mint Green */,
      hover: '#E0FBED' /* Mint Green Hover */,
      light: mint0,
      touch: '#5B9075' /* Mint Green Touch */
    },
    teal: {
      solid: teal80,
      hover: '#BBE7E5' /* Teal Hover */,
      light: teal0,
      touch: '#27716D' /* Teal Touch */
    },
    darkTeal: {
      solid: pine80,
      hover: '#BFDDDC' /* Dark Teal Hover */,
      light: teal80,
      touch: '#195653' /* Dark Teal Touch */,
      selection: selection3,
      nav: teal20,
      navBack: 'rgba(28,176,168,0.2)',
      stepbtnhover: pine100,
      stepbtninactive: grey20
    },
    blue: {
      solid: blue80,
      hover: '#8FD5FC' /* Blue Hover */,
      light: blue0,
      touch: '#286F96' /* Blue Touch */
    },
    purple: {
      solid: purple80,
      hover: '#E7CFFB' /* Purple Hover */,
      light: purple0,
      touch: '#6A3991' /* Purple Light */
    },
    shadow: '0px 3px 10px rgba(0, 0, 0, 0.8)',
    modal: 'rgba(51, 51, 51, 0.5)',
    selection: {
      background: 'rgb(0, 73, 69, 0.99)',
      color: '#E0E0E0'
    },
    selectionPopover: {
      background: grey80
    },
    highlight: {
      background: amber20,
      color: grey100,
      border: grey100,
      borderActive: grey80,
      gutter: black,
      gutterActive: black,
      metaColor: grey60
    },
    toast: {
      success: {
        background: pine80,
        color: white
      },
      warn: {
        background: pine80,
        color: white
      },
      neutral: {
        background: pine80,
        color: white
      }
    },
    premium: {
      background: tealDarkCompliment,
      backgroundActive: tealDark,
      color: white,
      border: '#3F3F3F'
    },
    cta: {
      color: tealLightCompliment,
      hover: tealDarkCompliment
    },
    upsell: {
      title: grey0,
      copy: '#E0E0E0'
    }
  },
  sepia: {
    black: black,
    white: white,
    brown0: brown0,
    brown1: '#3B3934' /* SP-Brown 1 */,
    brown2: '#565248' /* SP-Brown 2 */,
    brown3: '#736C5E' /* SP-Brown 3 */,
    brown4: '#A29B8D' /* SP-Brown 4 */,
    brown5: '#C7C0B2' /* SP-Brown 5 */,
    brown6: '#DFD8CA' /* SP-Brown 6 */,
    brown7: cream,
    brown20: brown20,
    brown40: brown40,
    coral: {
      solid: coral80,
      hover: '#913A44' /* SP-Coral Hover */,
      light: coral0,
      touch: '#F3999C' /* SP-Coral Touch */
    },
    amber: {
      solid: amber80,
      hover: '#97743B' /* SP-Amber Hover */,
      light: amber0,
      touch: '#FAD393' /* SP-Amber Touch */
    },
    mintGreen: {
      solid: '#83EDB8' /* SP-Mint Green */,
      hover: '#5B9075' /* SP-Mint Green Hover */,
      light: mint0,
      touch: '#BEEFCD' /* SP-Mint Green Touch */
    },
    teal: {
      solid: teal80,
      hover: '#27716D' /* SP-Teal Hover */,
      light: teal0,
      touch: '#8AD1C5' /* SP-Teal Touch */
    },
    darkTeal: {
      solid: pine80,
      hover: '#195653' /* SP-Dark Teal Hover */,
      light: teal80,
      touch: '#7CB6AB' /* SP-Dark Teal Touch */,
      selection: selection2,
      nav: teal100,
      navBack: 'rgba(28,176,168,0.2)',
      stepbtnhover: '#DDE2D2'
    },
    blue: {
      solid: blue80,
      hover: '#286F96' /* SP-Blue Hover */,
      light: blue0,
      touch: '#8BCEEE' /* SP-Blue Touch */
    },
    purple: {
      solid: purple80,
      hover: '#6A3991' /* SP-Purple Hover */,
      light: purple0,
      touch: '#CD99E9' /* SP-Purple Touch */
    },
    shadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
    modal: 'rgba(51, 51, 51, 0.5)',
    selection: {
      background: selection2,
      color: '#3B3934'
    },
    selectionPopover: {
      background: cream
    },
    highlight: {
      background: amber40,
      color: '#3B3934',
      border: '#DFD8CA',
      borderActive: brown40,
      gutter: brown0,
      gutterActive: brown20,
      metaColor: grey60
    },
    toast: {
      success: {
        background: pine20,
        color: pine100
      },
      warn: {
        background: pine20,
        color: pine100
      },
      neutral: {
        background: pine20,
        color: pine100
      }
    },
    premium: {
      background: tealDark,
      backgroundActive: tealDarkCompliment,
      color: white,
      border: '#DFD8CA'
    },
    cta: {
      color: tealDark,
      hover: tealDarkCompliment
    },
    upsell: {
      title: '#3B3934',
      copy: '#565248'
    }
  }
}

export const GRADIENTS = {
  rainbow:
    'linear-gradient(90deg, #AFECC3  0%, #84C3C0  34%, #D45A68  67%, #ECBF63  100%)',
  imageFilter: 'radial-gradient(rgba(2,2,2,0.05), rgba(2,2,2,0.15))',
  rainbowbar: `linear-gradient(
    90deg,
    #83edb8 0%,
    #83edb8 0%,
    #83edb8 0.01%,
    #50bcb6 33.15%,
    #ef4056 67.4%,
    #fcb643 100%
  )`
}

export const SOCIAL_COLORS = {
  pocket: COLORS.light.coral.solid,
  facebook: '#3b5998',
  twitter: '#00aced',
  linkedin: '#007bb6',
  tumblr: '#32506d',
  reddit: '#ff4500'
}
