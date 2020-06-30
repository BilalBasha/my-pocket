import React, { Component, memo } from 'react'
import { FixedSizeList as List, areEqual } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { connect } from 'react-redux'
import { Tag } from './Tag/tag.container'
import { TagFilter } from './tags.filter'
import memoizeOne from 'memoize-one'

const Row = memo(
  ({ data, index, style, toggleTagsShown }) => (
    <Tag
      key={data[index]}
      tagKey={data[index]}
      toggleTagsShown={toggleTagsShown}
      style={style}
    />
  ),
  areEqual
)

class TagsConnector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  updateTagFilter = (e) => {
    this.setState({ value: e.target.value })
  }

  get filterTags() {
    const { tags } = this.props
    const { value } = this.state
    return tags.filter(tag => tag.indexOf(value.toLowerCase()) > -1)
  }

  render() {
    const { toggleTagsShown } = this.props
    const tags = this.filterTags
    const verticalSpace = this.props.isOverlay ? 100 : 210
    return (
      <React.Fragment>
        <TagFilter
          value={this.state.value}
          onFilterUpdate={this.updateTagFilter}
        />

        <div style={{ height: `calc(100vh - ${verticalSpace}px` }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                className="List"
                height={height}
                itemCount={tags.length}
                itemData={tags}
                toggleTagsShown={toggleTagsShown}
                itemSize={35}
                width={width}>
                {Row}
              </List>
            )}
          </AutoSizer>
        </div>
      </React.Fragment>
    )
  }
}

/* CONNECT TO STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function tagSorter(tags) {
  return tags.sort((a, b) => {
    // ensures 'untagged-items' at top of list
    if (a === 'untagged-items') return -1
    if (b === 'untagged-items') return 1
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
}

const memoizedTagSorter = memoizeOne(tagSorter)

function mapStateToProps(state) {
  const tags = memoizedTagSorter(Object.keys(state.tags))
  return { tags }
}

export const SidebarTags = connect(
  mapStateToProps,
  null
)(TagsConnector)
