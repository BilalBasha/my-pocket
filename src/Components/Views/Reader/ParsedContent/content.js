import styled from '@emotion/styled'
import { InlineHighlightStyle } from '../Annotations/annotations.inline'

export const ParsedContent = styled('div')`
  ${InlineHighlightStyle};

  #RIL_domain,
  #RIL_header,
  #RIL_ARTICLE_NOTE {
    display: none;
  }

  #RIL_media {
    text-align: center;

    object,
    embed,
    img {
      margin-bottom: 15px;
    }
  }

  h1,
  h2 {
    line-height: 1.3em;
    font-size: 25px;
    font-size: 1.4em;
    margin: 0 0px 0.7em 0px;
  }
  h3 {
    line-height: 1.3em;
    font-size: 1.3em;
    margin: 0 0px 0.5em 0px;
  }
  h4 {
    line-height: 1.3em;
    font-size: 1.2em;
    margin: 0 0px 0.5em 0px;
  }
  h5,
  h6 {
    font-size: 1.1em;
    font-weight: bold;
    margin: 0 0px 0.4em 0px;
  }

  h3 + .RIL_IMG,
  h4 + .RIL_IMG,
  h5 + .RIL_IMG,
  h6 + .RIL_IMG,
  h3 + .RIL_VIDEO,
  h4 + .RIL_VIDEO,
  h5 + .RIL_VIDEO,
  h6 + .RIL_VIDEO {
    margin-top: 1.1em !important;
  }

  p {
    margin: 0 0 1em 0px;
    text-align: left;
  }
  .hyphenate *[lang] p,
  .hyphenate p[lang] {
    text-align: justify;
    -webkit-hyphens: auto;
  }
  .force_left *[lang] p,
  .force_left p[lang] {
    text-align: left;
  }
  li {
    text-align: left;
  }

  ul,
  ol {
    margin: 1.5em 0px 1.5em 2em;
  }
  li {
    margin: 0px 0px 0.4em 0px;
  }
  ul ul,
  ol ol {
    margin: 0.75em 0 1em 2em;
    min-width: 250px;
  }

  p + h2,
  p + h3,
  p + h4,
  p + h5,
  p + h6 {
    margin-top: 1.7em;
  }

  /* spacing of headers of lists */
  h3 + ul,
  h3 + ol,
  h4 + ul,
  h4 + ol {
    margin-top: 1.1em;
  }

  /* spacing of headers of lists */
  h5 + ul,
  h5 + ol,
  h6 + ul,
  h6 + ol {
    margin-top: 0.8em;
  }

  pre,
  blockquote {
    display: block;
    margin: 1.5em 7% 1.5em 7%;
  }

  pre {
    box-sizing: border-box;
    margin: 15px -5%;
    padding: 10px;
    font-size: 0.8em;
    width: 110%;
    overflow: auto;
    background-color: ${props => props.theme.body.pre};
  }

  /* prevent sup and sub from breaking line-height */
  sup,
  sub {
    vertical-align: baseline;
    position: relative;
    top: -0.4em;
  }
  sub {
    top: 0.4em;
  }

  blockquote,
  aside {
    font-style: italic;
  }

  a {
    cursor: pointer;
    color: ${props => props.theme.body.color};
    text-decoration: none;
    position: relative;
    text-shadow: -1px -1px 0 ${props => props.theme.body.background},
      1px -1px 0 ${props => props.theme.body.background},
      -1px 1px 0 ${props => props.theme.body.background},
      1px 1px 0 ${props => props.theme.body.background};
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 1px,
      ${props => props.theme.body.color} 1px,
      ${props => props.theme.body.color} 2px,
      rgba(0, 0, 0, 0) 2px
    );

    &:hover {
      color: ${props => props.theme.body.link};
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0) 1px,
        ${props => props.theme.body.link} 1px,
        ${props => props.theme.body.link} 2px,
        rgba(0, 0, 0, 0) 2px
      );
    }
  }

  hr {
    margin: 1em 0px;
    border: 0px;
    padding: 0px;
    height: 1px;
    background: ${props => props.theme.body.border};
  }

  figure {
    width: 110%;
    margin: 0 -5%;
    padding-bottom: 1.667em;

    figcaption {
      width: 100%;
      box-sizing: border-box;
      padding: 1.25em 0 0;
      font-size: 0.583em;
      line-height: 1.643;
      color: ${props => props.theme.article.subHeader};
    }
  }

  .RIL_IMG {
    position: relative;
    margin: 0;
    text-align: center;

    &:after {
      content: '.';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    img {
      max-width: 100%;
      border-radius: 8px;
      margin: 0 auto;
    }
    cite {
      width: 100%;
      box-sizing: border-box;
      display: none;
      clear: both;
    }

    a {
      display: block;
      margin: 0px auto;
      border: 0px !important;
      text-decoration: none !important;
      position: relative;
    }
  }

  .RIL_VIDEO {
    width: 110%;
    margin: 0 -5% 1.5em;
  }

  table.ril_dataTable,
  table.ril_layoutTable {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
  }
  table.ril_dataTable td,
  table.ril_layoutTable td {
    width: auto;
    text-align: left;
    padding: 0;
    background: none;
    border: 0;
  }

  .ril_layoutTable td,
  .ril_layoutTable tr,
  .ril_layoutTable th {
    display: block;
  }

  table.ril_dataTable {
    margin: 1.5em 0;
  }
  table.ril_dataTable th {
    font-weight: 600;
    border: 0;
    padding: 0 5px 0.3em !important;
    border-bottom: 2px solid ${props => props.theme.body.border};
    text-align: left;
  }
  table.ril_dataTable td {
    border: 0;
    border-bottom: 1px solid ${props => props.theme.body.border};
    padding: 0.3em 5px !important;
    vertical-align: top;
    font-size: 0.8em;
  }
`
