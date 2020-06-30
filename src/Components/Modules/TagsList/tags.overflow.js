import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Tag } from '../../Elements/Tags/tags'
import { OverlayBase } from '../../Elements/Overlay/overlay'
import { Translate, withLocalize } from 'react-localize-redux'
import { normalizeTag } from '../../../Common/helpers'
import { NavLink } from 'react-router-dom'
import { ZINDEX } from '../../../Common/constants'

const OverFlowContainer = styled('div')`
  ${OverlayBase};
  position: absolute;
  bottom: 100%;
  right: 0;
  max-width: 80%;
  z-index: ${ZINDEX['modal']};
`

const TagOverflow = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  list-style-type: none;
  margin: 0;
  padding: 1em 1.7em;
  padding-left: 1.4em;
  border-radius: 4px;
  margin-top: -6px;
  & > a > div {
    margin-top: 6px;
  }
`

class TagOverFlowList extends Component {
  state = { hover: false }

  onHover = () => {
    clearTimeout(this.hoverTimer)
    this.setState({ hover: true })
  }

  offHover = () => {
    this.hoverTimer = setTimeout(() => {
      this.setState({ hover: false })
    }, 250)
  }

  componentWillUnmount() {
    clearTimeout(this.hoverTimer)
  }

  render() {
    const overFlowCount = this.props.overflow.length
    const { hover } = this.state

    return (
      <React.Fragment>
        <span
          onMouseOver={this.onHover}
          onMouseOut={this.offHover}
          onBlur={this.offHover}
          onFocus={this.onHover}>
          <Tag action="true">
            <Translate id="reader.tagging.tagOverflow" data={{ overFlowCount }}>
              +{overFlowCount} more
            </Translate>
          </Tag>
        </span>
        {hover ? (
          <OverFlowContainer
            onMouseOver={this.onHover}
            onMouseOut={this.offHover}
            onBlur={this.offHover}
            onFocus={this.onHover}>
            <TagOverflow>
              {this.props.overflow.map(tag => {
                const normalizedTag = normalizeTag(tag)
                return (
                  <NavLink to={`/tags/${normalizedTag}`} key={normalizedTag}>
                    <Tag margin="0 4px" action="true">
                      {tag}
                    </Tag>
                  </NavLink>
                )
              })}
            </TagOverflow>
          </OverFlowContainer>
        ) : null}
      </React.Fragment>
    )
  }
}

export default withLocalize(TagOverFlowList)
