import React, { Component } from 'react'
import styled from '@emotion/styled'
import { SuggestedTag } from '../../Elements/Tags/tags'
import { Translate, withLocalize } from 'react-localize-redux'
import { Loader } from '../../Elements/Loader/loader'
import TagUpsell from './tag.upsell'

const SuggestedWrapper = styled('div')`
  padding: 10px 0;
  min-height: 50px;
`

const CantFindSuggestions = () => {
  return (
    <Translate id="tagging.errors.noSuggestedTags">We were unable to find any suggested tags for this item</Translate>
  )
}

class TagSuggestionsClass extends Component {
  prevent = event => {
    event.preventDefault()
  }

  get usedTags() {
    return this.props.tags || []
  }

  get suggestedTags() {
    const tags = this.props.suggestedTags || []
    return tags
      .filter(item => !this.usedTags.includes(item))
      .map((tag, index) => {
        return (
          <SuggestedTag
            margin="0 10px 10px 0"
            key={tag + index}
            onClick={() => {
              this.props.addTag(tag)
            }}>
            {tag}
          </SuggestedTag>
        )
      })
  }

  get suggestionsLoader() {
    return (
      <SuggestedWrapper>
        {
          (this.props.suggestedTags === undefined)
            ? <Loader isVisible={true} />
            : this.suggestedTags.length
              ? this.suggestedTags
              : <CantFindSuggestions />
        }
      </SuggestedWrapper>
    )
  }

  render() {
    return (
      (this.props.isPremium)
        ? this.suggestionsLoader
        : <TagUpsell trackClick={this.props.trackClick} />
    )
  }
}

export const TagSuggestions = withLocalize(TagSuggestionsClass)
