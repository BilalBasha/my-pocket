import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { analyticsActions } from '../../../Containers/App/Analytics/analytics.state'
import styled from '@emotion/styled'
import Tagging from './tagging'
import { TagSuggestions } from './tag.suggestions'
import { Button, buttonReset } from '../../Elements/Buttons/button'
import { Icon } from '../../Elements/Icons/icon'
import { OverlayBase } from '../../Elements/Overlay/overlay'
import facepaint from 'facepaint'
import { Translate, withLocalize } from 'react-localize-redux'

const breakpoints = [375, 768, 1152, 1290]
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

const Panel = styled('div')`
  ${OverlayBase};
  position: relative;
  box-sizing: border-box;
  padding: 20px 0 0;
  ${mq({ width: ['300px', '300px', '400px', '500px'] })};
  > div {
    padding-right: 20px;
    padding-left: 20px;
  }
`

const PanelHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding-bottom: 15px;
`

const TaggingTitle = styled('h3')`
  font-size: 16px;
  line-height: 16px;
  margin: 0;
`
const PanelClose = styled('button')`
  ${buttonReset};
  cursor: pointer;
`

const PanelTagging = styled('div')`
  display: flex;
  align-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`

class TagModalClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      actionable: false,
      tags: props.currentTags ? props.currentTags : []
    }
  }

  setInputRef = input => {
    this.inputRef = input
  }

  setValue = value => {
    this.setState({ value })
  }

  addTag = tag => {
    this.setState({ value: '' })
    if (this.inputRef) this.inputRef.focus()
    if (this.state.tags.includes(tag)) return
    this.setState({ actionable: true, tags: [...this.state.tags, tag] })
  }

  removeTag = tag => {
    if (!this.state.tags.includes(tag)) return
    this.setState({
      actionable: true,
      tags: this.state.tags.filter(current => current !== tag)
    })
  }

  setTags = tags => {
    this.setState({ actionable: true, tags })
  }

  onSubmit = () => {
    const tag = this.state.value
    if (tag) {
      const tags = [...this.state.tags, tag]
      return this.props.confirmModal({ tags })
    }

    this.props.confirmModal({ tags: this.state.tags })
  }

  render() {
    const isActive = this.state.value || this.state.actionable
    const type = isActive ? 'cta' : 'disabled'
    return (
      <Panel>
        <PanelHeader>
          <TaggingTitle>
            <Translate id='tagging.modal.editTags'>Edit Tags</Translate>
          </TaggingTitle>
          <PanelClose onClick={this.props.cancelModal}>
            <Icon name='CloseX' type='mini' size='13px' />
          </PanelClose>
        </PanelHeader>

        <PanelTagging>
          <Tagging
            setInputRef={this.setInputRef}
            value={this.state.value}
            setValue={this.setValue}
            addTag={this.addTag}
            removeTag={this.removeTag}
            setTags={this.setTags}
            tags={this.state.tags}
            typeahead={this.props.typeahead}
          />

          <Button
            type={type}
            onClick={this.onSubmit}
            margin='0 0 0 10px'
            disabled={!isActive}>
            <Translate id='tagging.modal.save'>Save</Translate>
          </Button>
        </PanelTagging>

        <TagSuggestions
          suggestedTags={this.props.suggestedTags}
          tags={this.state.tags}
          addTag={this.addTag}
          isPremium={this.props.isPremium}
          trackClick={this.props.trackClick}
        />
      </Panel>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...analyticsActions
    },
    dispatch
  )
}

export const TagModal = withLocalize(connect(null, mapDispatchToProps)(TagModalClass))
