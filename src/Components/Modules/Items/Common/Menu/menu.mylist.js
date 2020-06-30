import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { buttonReset } from '../../../../Elements/Buttons/button'
import { Icon } from '../../../../Elements/Icons/icon'
import { Translate, withLocalize } from 'react-localize-redux'

const ItemMenuPopover = styled('div')`
  box-sizing: border-box;
  padding: 10px 0;
  background: ${props => props.theme.item.menu.background};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  ${props => props.addedStyles};
`
const ItemMenuStyle = props => css`
  ${buttonReset};
  display: grid;
  align-content: center;
  align-items: center;
  grid-template-columns: 32px auto;
  grid-template-rows: 24px;
  padding: 5px 40px 5px 20px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: ${props.theme.item.menu.button.hover.background};
  }
`
const ItemMenuButton = styled('div')`
  ${ItemMenuStyle};
  user-select: none;
  color: ${props => props.theme.item.menu.button.color};
  &:hover {
    color: ${props => props.theme.item.menu.button.hover.color};
  }
`
const ItemMenuLabel = styled('div')`
  display: inline-block;
`

const FavoriteWrapper = styled('div')`
  color: ${props => props.theme.item.menu.favorite};
`

class MyListMenuClass extends Component {
  render() {
    const iconSize = 24
    const archived = this.props.status === '1'
    const favorite = this.props.favorite === '1'

    const { translate } = this.props

    return (
      <ItemMenuPopover
        listMode={this.props.listMode}
        addedStyles={this.props.addedStyles}>
        <ItemMenuButton
          onClick={this.props.toggleShare}
          aria-label={translate('itemCollection.menu.share')}>
          <Icon
            name="IOSShare"
            type="line"
            size={iconSize + 'px'}
            box={iconSize}
          />
          <ItemMenuLabel>
            <Translate id="itemCollection.menu.share">Share</Translate>
          </ItemMenuLabel>
        </ItemMenuButton>

        <ItemMenuButton
          onClick={this.props.delete}
          aria-label={translate('itemCollection.menu.delete')}>
          <Icon
            name="Delete"
            type="line"
            size={iconSize + 'px'}
            box={iconSize}
          />
          <ItemMenuLabel>
            <Translate id="itemCollection.menu.delete">Delete</Translate>
          </ItemMenuLabel>
        </ItemMenuButton>
        {archived ? (
          <ItemMenuButton
            onClick={this.props.reAdd}
            aria-label={translate('itemCollection.menu.reAdd.aria')}>
            <Icon
              name="ReAdd"
              type="line"
              size={iconSize + 'px'}
              box={iconSize}
            />
            <ItemMenuLabel>
              <Translate id="itemCollection.menu.reAdd.copy">Re-Add</Translate>
            </ItemMenuLabel>
          </ItemMenuButton>
        ) : (
          <ItemMenuButton
            onClick={this.props.archive}
            aria-label={translate('itemCollection.menu.archive')}>
            <Icon
              name="Archive"
              type="line"
              size={iconSize + 'px'}
              box={iconSize}
            />
            <ItemMenuLabel>
              <Translate id="itemCollection.menu.archive">Archive</Translate>
            </ItemMenuLabel>
          </ItemMenuButton>
        )}

        <ItemMenuButton
          onClick={this.props.toggleFavorite}
          aria-label={
            favorite
              ? translate('itemCollection.menu.unfavorite')
              : translate('itemCollection.menu.favorite')
          }>
          {favorite ? (
            <FavoriteWrapper>
              <Icon
                name="Favorite"
                type={favorite ? 'solid' : 'line'}
                size={iconSize + 'px'}
                box={iconSize}
              />
            </FavoriteWrapper>
          ) : (
            <Icon
              name="Favorite"
              type={favorite ? 'solid' : 'line'}
              size={iconSize + 'px'}
              box={iconSize}
            />
          )}
          <ItemMenuLabel>
            <Translate id="itemCollection.menu.favorite">Favorite</Translate>
          </ItemMenuLabel>
        </ItemMenuButton>

        <ItemMenuButton
          onClick={this.props.toggleTagging}
          aria-label={translate('itemCollection.menu.tagging.aria')}>
          <Icon
            name="AddTags"
            type="line"
            size={iconSize + 'px'}
            box={iconSize}
          />
          <ItemMenuLabel>
            <Translate id="itemCollection.menu.tagging.copy">Tagging</Translate>
          </ItemMenuLabel>
        </ItemMenuButton>
      </ItemMenuPopover>
    )
  }
}
export const MyListMenu = withLocalize(MyListMenuClass)
