import React from 'react'
import { Icon } from '../../../../Elements/Icons/icon'

export class BulkSelect extends React.Component {
  render() {
    const { bulkEditSelected } = this.props
    return (
      <React.Fragment>
        {bulkEditSelected ? (
          <Icon
            name="CheckFilled"
            type="solid"
            size="24px"
            margin="0 8px 0 0"
          />
        ) : (
          <Icon name="CheckOpen" type="line" size="24px" margin="0 8px 0 0" />
        )}
      </React.Fragment>
    )
  }
}
