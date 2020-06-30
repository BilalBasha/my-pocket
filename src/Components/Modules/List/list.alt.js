import React, { Component } from 'react'
import { getScrollTop, atEndOfScroll } from '../../../Common/helpers'
import { ListWrapper, ListBlock, Ruler } from './list.elements'
import { shallowArrayEquality } from '../../../Common/helpers'
import { withSizes } from '../../Modules/Sizes/sizes.hoc'

export { ListWrapper } // Keep old calls from breaking until this is sorted

class ListClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      availableHeight: 0,
      startIndex: -1,
      endIndex: -1
    }

    this.latestKnownScrollY = 0
    this.requestTick = this.requestTick.bind(this)
  }

  requestTick() {
    cancelAnimationFrame(this.raf)
    this.raf = requestAnimationFrame(this.checkRange)
  }

  handleScroll = () => {
    this.latestKnownScrollY = window.scrollY
    this.requestTick()

    const listEnd = atEndOfScroll(this.state.availableHeight * 1.8)
    const { subset, tagTitle, searchQuery } = this.props
    const { collectionEndTrigger } = this.props

    if (listEnd && !this.endTriggered) {
      this.endTriggered = true
      collectionEndTrigger({ subset, tagTitle, searchQuery })
    }
  }

  checkRange = () => {
    // Get scroll direction.
    const top = getScrollTop()
    const { HEIGHT, COLUMN_COUNT } = this.props

    const itemOnScreen = 24
    const naturalStart = Math.floor(top / HEIGHT) * COLUMN_COUNT
    const startIndex = Math.max(naturalStart - COLUMN_COUNT * 2, 0)
    const endIndex = startIndex + itemOnScreen

    this.setState(prevState => {
      if (prevState.startIndex === startIndex) return
      return { startIndex, endIndex }
    })
  }

  handleResize = () => {
    const availableHeight = this.node.clientHeight
    this.setState({ availableHeight })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list.length !== this.props.list.length) {
      this.endTriggered = false
      this.checkRange()
    }
  }

  componentDidMount() {
    this.checkRange()
    this.setState({ availableHeight: this.node.clientHeight })
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Keep sizes up to date
    if (nextProps.COLUMN_COUNT !== this.props.COLUMN_COUNT) return true
    if (nextProps.HEIGHT !== this.props.HEIGHT) return true

    // Keep our slice index up to date
    if (nextState.startIndex !== this.state.startIndex) return true

    // Keep scrolling up to date
    if (nextState.fastScroll !== this.state.fastScroll) return true

    // List is just a hash table.  Shallow compare is cheap
    const arrayEquality = shallowArrayEquality(nextProps.list, this.props.list)
    if (arrayEquality) return false

    return true
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { list, listMode, Item, HEIGHT, COLUMN_COUNT } = this.props
    const { startIndex, endIndex } = this.state
    const listSlice = list.slice(startIndex, endIndex + 1)

    const paddingTop = (this.state.startIndex / COLUMN_COUNT) * HEIGHT || 0
    const remainder = list.length % 3
    const buffer = remainder ? 3 - remainder : 0
    const listHeight = ((list.length + buffer) / COLUMN_COUNT) * HEIGHT
    const blockStyle = {
      paddingTop,
      height: `${listHeight}px`
    }

    return listSlice ? (
      <ListBlock
        columns={COLUMN_COUNT}
        style={blockStyle}
        item_height={HEIGHT}
        role="main">
        {listSlice.map((item_id, index) => {
          return (
            <Item
              item_id={item_id}
              key={item_id}
              itemIndex={this.state.startIndex + index}
              listMode={listMode}
              tag={this.props.tag}
              subset={this.props.subset}
              include={this.props.include}
              height={HEIGHT}
            />
          )
        })}
        <Ruler ref={node => (this.node = node)} />
      </ListBlock>
    ) : null
  }
}

export const List = withSizes(ListClass)
