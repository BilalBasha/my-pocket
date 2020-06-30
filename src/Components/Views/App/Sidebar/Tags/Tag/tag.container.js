import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { tagsActions } from '../../../../../../Containers/App/Tags/tags.state'
import { TagView } from './tag.view'
import { KEYS } from '../../../../../../Common/constants'

export class TagContainer extends React.Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.inputRef = React.createRef()
    this.state = { hover: false }
  }

  itemHoverOn = () => this.setState({ hover: true })
  itemHoverOff = () => this.setState({ hover: false })

  /* TAG EDITING
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  editTag = event => {
    // Stop link from firing
    event.preventDefault()
    event.stopPropagation()

    this.props.editTag({ tagKey: this.props.tagKey })
    document.addEventListener('click', this.outsideClickListener)
  }

  outsideClickListener = event => {
    if (this.containerRef.current.contains(event.target)) return

    if (this.props.editable) {
      this.props.cancelTagEdit({ tagKey: this.props.tagKey })
    }
    this.removeClickListener()
  }

  removeClickListener = () => {
    document.removeEventListener('click', this.outsideClickListener)
  }

  componentWillUnmount() {
    if (this.props.editable) {
      this.props.cancelTagEdit({ tagKey: this.props.tagKey })
    }
    document.removeEventListener('click', this.outsideClickListener)
  }

  updateTag = () => {
    const { name } = this.props
    const inputValue = this.inputRef.current.value

    if (!inputValue.length) return this.deleteTag()

    const new_tag = inputValue.toLowerCase()
    this.props.updateTag({ new_tag, old_tag: name })
  }

  deleteTag = () => {
    const { tagKey, name } = this.props
    this.props.deleteTag({ tagKey, name })
  }

  /* INPUT HANDLING
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  handleKeyDown = event => {
    if (event.keyCode === KEYS.ENTER) {
      event.preventDefault()
      this.updateTag()
      return
    }
  }

  handleKeyUp = event => {
    switch (event.keyCode) {
      // Handle intent to exit
      case KEYS.ESCAPE: {
        return this.props.cancelTagEdit({ tagKey: this.props.tagKey })
      }
      default:
        return
    }
  }

  render() {
    return (
      <TagView
        {...this.props}
        containerRef={this.containerRef}
        inputRef={this.inputRef}
        hover={this.state.hover}
        editable={this.props.editable}
        inputValue={this.props.name}
        sortByTag={this.sortByTag}
        itemHoverOn={this.itemHoverOn}
        itemHoverOff={this.itemHoverOff}
        updateTag={this.updateTag}
        deleteTag={this.deleteTag}
        handleChange={this.handleChange}
        handleKeyDown={this.handleKeyDown}
        handleKeyUp={this.handleKeyUp}
        editTag={this.editTag}
      />
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...tagsActions }, dispatch)
}

function mapStateToProps(state, ownProps) {
  const { tag } = state.collection.options
  const { tagKey } = ownProps
  const { tags } = state
  const { name, clean, editable, fixed } = tags[tagKey]
  const active = tag === tagKey
  return { active, name, clean, tagKey, editable, fixed }
}

export const Tag = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagContainer)
