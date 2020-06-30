import React from 'react'
import styled from '@emotion/styled'
import { Icon } from '../../../../../Elements/Icons/icon'
import { withLocalize } from 'react-localize-redux'
import { buttonReset } from '../../../../../Elements/Buttons/button'

const EditActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  position: absolute;
  padding: 4px 0;
  box-sizing: border-box;
  right: 4px;
  top: 0;
  height: 100%;
  background-color: ${props =>
    props.editable ? props.theme.sidebar.tag.editable : 'transparent'};
`

const Action = styled('button')`
  ${buttonReset};
  cursor: pointer;
  margin: 0 ${props => (props.isOverlay ? '12px' : '4px')};
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  color: ${props => props.theme.sidebar.tag.actions[props.type].color};
  &:hover {
    color: ${props => props.theme.sidebar.tag.actions[props.type].hover.color};
  }
`

class TagActionsClass extends React.Component {
  render() {
    const { editable, editTag, deleteTag, actionKey, isOverlay } = this.props
    const { translate } = this.props

    const iconProps = isOverlay
      ? {
          type: 'line',
          size: '24px'
        }
      : {
          type: 'mini',
          size: '16px'
        }
    return editable ? (
      <EditActions editable={editable}>
        <Action
          aria-label={translate('tagList.delete')}
          editable={editable}
          isOverlay={isOverlay}
          key={actionKey + 'delete'}
          onClick={deleteTag}
          type="delete">
          <Icon name="Delete" {...iconProps} margin="0 4px 0 0" />
        </Action>
      </EditActions>
    ) : (
      <EditActions editable={editable}>
        <Action
          aria-label={translate('tagList.edit')}
          editable={editable}
          key={actionKey + 'edit'}
          onClick={editTag}
          type="edit">
          <Icon name="Pencil" {...iconProps} />
        </Action>
      </EditActions>
    )
  }
}

export const TagActions = withLocalize(TagActionsClass)
