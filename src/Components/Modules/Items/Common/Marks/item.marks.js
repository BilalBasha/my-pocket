import React from 'react'
import { ItemFlag } from './item.flag'
import styled from '@emotion/styled'
import { getBool } from '../../../../../Common/helpers'
import { Favorite, HighlightsTag, WebOnly } from '../../../../Elements/Tags/tags.js'
import { TagList } from '../../../../Modules/TagsList/tags'

const ItemMarkWrapper = styled('div')`
  display: flex;
  justify-content: flex-start;
`

export class ItemMarks extends React.Component {
  render() {
    const { favorite, itemContentType, tags, listMode } = this.props

    const isFavorite = getBool(favorite)
    const webOnly = itemContentType === 'opened_web'

    const { annotations } = this.props
    const hasAnnotations = annotations && annotations.length > 0

    return (
      <ItemMarkWrapper>
        {isFavorite ? <Favorite margin="0 10px 0 0" /> : null}
        {webOnly ? <WebOnly margin="0 10px 0 0" /> : null}
        {hasAnnotations ? (
          <HighlightsTag margin="0 10px 0 0" count={annotations.length} />
        ) : null}
        <ItemFlag {...this.props} />
        {listMode === 'list' ? <TagList tags={tags} /> : null}
      </ItemMarkWrapper>
    )
  }
}
