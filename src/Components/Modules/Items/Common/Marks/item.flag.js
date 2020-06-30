import React from 'react'
import { TrendingTag, BestOfTag } from '../../../../Elements/Tags/tags.js'
import { withLocalize } from 'react-localize-redux'

export class ItemFlagClass extends React.PureComponent {
  render() {
    const { translate, badge_group_id } = this.props
    const flags = {
      1: <BestOfTag>{translate('itemFlag.bestOf')}</BestOfTag>,
      2: <TrendingTag>{translate('itemFlag.trending')}</TrendingTag>
    }
    return badge_group_id ? flags[badge_group_id] : null
  }
}

export const ItemFlag = withLocalize(ItemFlagClass)
