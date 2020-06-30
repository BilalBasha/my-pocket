import React, { Component } from 'react'
import { BarActions } from '../../../Elements/NavBar/navBar'
import { ActionList, ActionIcon } from '../../../Elements/NavBar/navBar'
import { NavClamp } from '../../../Elements/NavBar/navBar.clamp'
import styled from '@emotion/styled'
import { Button, buttonReset } from '../../../Elements/Buttons/button'
import { BulkSelectTag } from '../../../Elements/Tags/tags'
import { Icon } from '../../../Elements/Icons/icon'
import { Brand } from '../../../Elements/NavBar/navBar.brand'
import { ANALYTICS_KEYS } from '../../../../Common/constants'
import facepaint from 'facepaint'
import { BREAKPOINTS, SIDEBAR_WIDTH } from '../../../../Common/constants'
import { Translate, withLocalize } from 'react-localize-redux'
import { TooltipBase } from '../../../Elements/Tooltip/tooltip'

const mq = facepaint(BREAKPOINTS.map(bp => `@media (min-width: ${bp}px)`))

const { UI, VIEW, LIST_MODE } = ANALYTICS_KEYS

const BulkTitle = styled('div')`
  color: ${({ theme }) => theme.body.color};
  padding-right: 8px;
`

const BulkCount = styled('div')``

const CancelWrapper = styled('button')`
  ${buttonReset};
  display: block;
  cursor: pointer;
  ${TooltipBase};
`
const NavClampFull = styled(NavClamp)`
  ${mq({
    gridTemplateColumns: [
      '0 auto 260px',
      '0 auto 260px',
      `${SIDEBAR_WIDTH + 10}px auto 260px`
    ]
  })};
`

const NavClampMin = styled(NavClamp)`
  grid-template-columns: auto 38px;
`

class NavBulkEditClass extends Component {
  bulkDelete = () => {
    this.props.itemsDelete({
      items: this.props.bulkEdit,
      analytics: {
        [UI]: 'bulk_edit',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      },
      confirmAction: this.props.clearBulkEdit
    })
  }

  bulkArchive = () => {
    this.props.itemsArchive({
      items: this.props.bulkEdit,
      analytics: {
        [UI]: 'bulk_edit',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })

    this.props.clearBulkEdit()
  }

  bulkReAdd = () => {
    this.props.itemsReAdd({
      items: this.props.bulkEdit,
      analytics: {
        [UI]: 'bulk_edit',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })

    this.props.clearBulkEdit()
  }

  bulkFavorite = () => {
    this.props.itemsFavorite({
      items: this.props.bulkEdit,
      analytics: {
        [UI]: 'bulk_edit',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })
    this.props.updateBulkEdit({
      items: this.props.bulkEdit,
      type: 'favorite'
    })
  }

  bulkUnfavorite = () => {
    this.props.itemsUnfavorite({
      items: this.props.bulkEdit,
      analytics: {
        [UI]: 'bulk_edit',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })
    this.props.updateBulkEdit({
      items: this.props.bulkEdit,
      type: 'unfavorite'
    })
  }

  bulkTag = () => {
    this.props.itemsTagging({
      items: this.props.bulkEdit,
      analytics: {
        [UI]: 'bulk_edit',
        [VIEW]: 'list',
        [LIST_MODE]: this.props.listMode
      }
    })
  }

  get allFavorites() {
    const { bulkEdit } = this.props
    const bulkIds = Object.keys(bulkEdit)
    const favorites = bulkIds.filter(itemID => {
      return bulkEdit[itemID].favorite === '1'
    }).length
    return bulkIds.length === favorites
  }

  get allArchived() {
    const { bulkEdit } = this.props
    const bulkIds = Object.keys(bulkEdit)
    const archived = bulkIds.filter(itemID => {
      return bulkEdit[itemID].archive
    }).length
    return bulkIds.length === archived
  }

  /* Render
  ------------------------------------------------------- */
  render() {
    const {
      exitBulkEditMode,
      bulkEdit,
      hasSidebar,
      subset,
      translate
    } = this.props
    const bulkIds = Object.keys(bulkEdit)
    const bulkCount = bulkIds.length
    const isArchive = subset === 'archive'
    const NavLayout = hasSidebar ? NavClampFull : NavClampMin
    return (
      <NavLayout>
        {hasSidebar ? <Brand /> : null}
        <ActionList>
          {Boolean(bulkCount) ? (
            <React.Fragment>
              <ActionIcon
                icon="AddTags"
                tooltip={translate('bulkEdit.addTags')}
                action={this.bulkTag}
                type="line"
                size="24px"
              />
              {this.allFavorites ? (
                <ActionIcon
                  icon="Favorite"
                  tooltip={translate('bulkEdit.unfavorite')}
                  action={this.bulkUnfavorite}
                  type="solid"
                  size="24px"
                />
              ) : (
                <ActionIcon
                  icon="Favorite"
                  tooltip={translate('bulkEdit.favorite')}
                  action={this.bulkFavorite}
                  type="line"
                  size="24px"
                />
              )}
              {this.allArchived || isArchive ? (
                <ActionIcon
                  icon="ReAdd"
                  tooltip={translate('bulkEdit.readd')}
                  action={this.bulkReAdd}
                  type="line"
                  size="24px"
                />
              ) : (
                <ActionIcon
                  icon="Archive"
                  tooltip={translate('bulkEdit.archive')}
                  action={this.bulkArchive}
                  type="line"
                  size="24px"
                />
              )}

              <ActionIcon
                icon="Delete"
                tooltip={translate('bulkEdit.delete')}
                action={this.bulkDelete}
                type="line"
                size="24px"
              />
              <BulkCount>
                <BulkSelectTag>
                  <Translate id="bulkEdit.itemsSelected" data={{ bulkCount }}>
                    {bulkCount} items
                  </Translate>
                </BulkSelectTag>
              </BulkCount>
            </React.Fragment>
          ) : (
            <BulkTitle>
              <Translate id="bulkEdit.selectItems">
                Select Items to Edit
              </Translate>
            </BulkTitle>
          )}
        </ActionList>

        <BarActions>
          {hasSidebar ? (
            <Button
              type="neutral"
              onClick={exitBulkEditMode}
              data-tooltip={translate('bulkEdit.done.aria')}
              aria-label={translate('bulkEdit.done.aria')}>
              <Translate id="bulkEdit.done.copy">Done</Translate>
            </Button>
          ) : (
            <CancelWrapper
              onClick={exitBulkEditMode}
              data-tooltip={translate('bulkEdit.done.aria')}
              aria-label={translate('bulkEdit.done.aria')}>
              <Icon name="CloseX" type="line" size="24px" />
            </CancelWrapper>
          )}
        </BarActions>
      </NavLayout>
    )
  }
}
export const NavBulkEdit = withLocalize(NavBulkEditClass)
