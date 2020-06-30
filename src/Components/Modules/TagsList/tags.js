import React, { Component } from 'react'
import { Tag } from '../../Elements/Tags/tags'
import TagOverFlowList from './tags.overflow'
import styled from '@emotion/styled'
import { normalizeTag } from '../../../Common/helpers'
import { NavLink } from 'react-router-dom'

const TagContainer = styled('div')`
  margin: 0;
  display: block;
  a {
    text-decoration: none;
  }
`

export class TagList extends Component {
  constructor(props) {
    super(props)
    this.listContainer = React.createRef()
    this.state = {
      list: this.props.tags ? Object.keys(this.props.tags) : [],
      overFlow: [],
      slicePoint: -1
    }
  }

  componentDidMount() {
    if (this.isWordWrapped) this.overflowTagList()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    clearTimeout(this.resizeTimer)
  }

  handleResize = () => {
    clearTimeout(this.resizeTimer)
    this.resizeTimer = setTimeout(() => {
      this.resetList()
    }, 50)
  }

  resetList = () => {
    this.setState({
      list: this.props.tags ? Object.keys(this.props.tags) : [],
      overFlow: [],
      slicePoint: -1
    })
  }

  wrapList = () => {
    if (this.isWordWrapped) this.overflowTagList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tags !== this.props.tags) {
      this.setState({
        list: this.props.tags ? Object.keys(this.props.tags) : [],
        overFlow: []
      })
    }

    if (prevState.overFlow !== this.state.overFlow) {
      this.wrapList()
    }
  }

  get isWordWrapped() {
    if (!this.props.tags) return false
    if (this.props.noWrap) return false

    const listContainer = this.listContainer.current
    if (!listContainer) return false

    const fontStyle = window
      .getComputedStyle(listContainer)
      .getPropertyValue('font-size')
    const fontSize = parseFloat(fontStyle)
    const maxHeight = Math.ceil(fontSize * 2 + fontSize * 0.25)
    return listContainer.offsetHeight > maxHeight
  }

  overflowTagList = () => {
    const { slicePoint } = this.state
    const { tags } = this.props
    const tagsArray = Object.keys(tags)
    const sliceTo = tagsArray.length + slicePoint

    if (sliceTo)
      this.setState({
        list: tagsArray.slice(0, sliceTo),
        overFlow: tagsArray.slice(slicePoint),
        slicePoint: slicePoint - 1
      })
  }

  render() {
    const overFlowCount = this.state.overFlow.length
    return this.props.tags ? (
      <TagContainer ref={this.listContainer}>
        {this.state.list.map(tag => {
          const normalizedTag = normalizeTag(tag)
          return (
            <NavLink to={`/tags/${normalizedTag}`} key={normalizedTag}>
              <Tag margin="0 4px" action="true">
                {tag}
              </Tag>
            </NavLink>
          )
        })}
        {overFlowCount > 0 ? (
          <TagOverFlowList
            tags={this.props.tags}
            overflow={this.state.overFlow}
          />
        ) : null}
      </TagContainer>
    ) : null
  }
}
