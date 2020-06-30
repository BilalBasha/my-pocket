import React, { useRef, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { TagActions } from './tag.actions'
import { BREAKPOINTS, SIDEBAR_WIDTH, SIDEBAR_OVERLAY_WIDTH } from '../../../../../../Common/constants'
import { NavLink } from 'react-router-dom'
import { withLocalize } from 'react-localize-redux'
import { Popover, Trigger, TooltipContent } from '../../../../../Modules/Popover/popover'
import facepaint from 'facepaint'

const TAG_COPY_WIDTH_MOBILE = SIDEBAR_OVERLAY_WIDTH - 10 + 'px'
const TAG_COPY_WIDTH = SIDEBAR_WIDTH - 36 + 'px'
const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

export const TagWrapper = styled('div')`
  cursor: pointer;
  display: flex;
  align-content: center;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  ${mq({ fontSize: ['16px', '16px', '14px'] })};
  font-weight: 400;
  line-height: 40px;
  color: ${props => props.theme.sidebar.tag.color};
  border-radius: 4px;
  position: relative;
  background-color: ${props =>
    props.editable
      ? props.theme.sidebar.tag.editable
      : props.active
      ? props.theme.sidebar.tag.hover.background
      : 'transparent'};

  input {
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    text-align: left;
    color: ${props => props.theme.sidebar.tag.input.color};
  }
  &:hover {
    color: ${props => props.theme.sidebar.tag.hover.color};
  }
  a {
    display: block;
    width: 100%;
    text-decoration: none;
    color: ${props =>
      props.active
        ? props.theme.sidebar.tag.hover.color
        : props.theme.sidebar.tag.color};
    &:hover {
      color: ${props => props.theme.sidebar.tag.hover.color};
    }
  }
`

export const TagCopy = styled('div')`
  display: block;
  ${mq({ width: [TAG_COPY_WIDTH_MOBILE, TAG_COPY_WIDTH_MOBILE, TAG_COPY_WIDTH] })};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const InputWrapper = styled('div')`
  display: block;
  ${mq({ width: [TAG_COPY_WIDTH_MOBILE, TAG_COPY_WIDTH_MOBILE, TAG_COPY_WIDTH] })};
  input {
    border-radius: 4px;
    line-height: 18px;
    padding: 2px 0 4px;
  }
`

function TagViewClass(props) {
  const tagRef = useRef(null)
  const tagRefCallback = useCallback(node => {
    if(node) {
      const { scrollWidth, offsetWidth } = node
      setHasEllipsis(scrollWidth > offsetWidth)
    }
    tagRef.current = node
  }, [])
  const [hasEllipsis, setHasEllipsis] = useState(false)
  const { active, name, tagKey, clean, inputValue, style } = props
  const { deleteTag, editTag, editable, hover } = props
  const { itemHoverOn, itemHoverOff, translate } = props
  const { handleKeyDown, handleKeyUp, fixed } = props

  return (
    <TagWrapper
      style={style}
      ref={props.containerRef}
      active={active}
      onMouseEnter={itemHoverOn}
      onMouseLeave={itemHoverOff}
      editable={editable}>
      {editable ? (
        <InputWrapper>
          <input
            ref={props.inputRef}
            autoFocus={true} // eslint-disable-line
            type="text"
            defaultValue={name}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
        </InputWrapper>
      ) : (
        <NavLink
          to={`/tags/${tagKey}`}
          aria-label={translate('tagList.tag', { tagName: name })}>
            <Popover>
              <Trigger>
                <TagCopy ref={tagRefCallback}>{name}</TagCopy>
              </Trigger>
              { hasEllipsis && <TooltipContent topOffset={-12}>{name}</TooltipContent> }
            </Popover>
        </NavLink>
      )}

      {(hover || editable) && !fixed ? (
        <TagActions
          actionKey={tagKey}
          clean={clean}
          tag={name}
          deleteTag={deleteTag}
          editable={editable}
          editTag={editTag}
          inputValue={inputValue}
        />
      ) : null}
    </TagWrapper>
  )
}
export const TagView = withLocalize(TagViewClass)
