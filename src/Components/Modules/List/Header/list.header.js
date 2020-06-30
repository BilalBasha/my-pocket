import React, { Component } from 'react'
import styled from '@emotion/styled'
import { buttonReset } from '../../../Elements/Buttons/button'
import { ZINDEX } from '../../../../Common/constants'
import { IncludeMenu } from './header.includes'
import { SortMenu } from './header.sort'

const ListHeaderWrapper = styled('header')`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: flex-start;
`

const ListHeaderInner = styled('div')`
  padding: 40px 20px 20px;
  grid-column: 1/-1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`

const ListTitle = styled('h1')`
  margin: 0;
  display: inline-block;
  padding: 0;
  font-size: 24px;
  font-weight: 500;
  padding-right: 10px;
`

const IncludeWrapper = styled('div')`
  padding-left: 5px;
  display: inline-flex;
  align-items: center;
  align-content: center;
  position: relative;
  font-weight: 300;
  font-size: 0.9em;
  color: ${props => props.theme.list.header.color};
  cursor: pointer;
  ul {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: ${ZINDEX.popover};
  }
`

const ListActions = styled(IncludeWrapper)``

export const ListHeaderAction = styled('button')`
  ${buttonReset};
  cursor: pointer;
  margin-left: 8px;
`

export class ListHeader extends Component {
  render() {
    const { title, include, isPremium, subset, setInclude, sort } = this.props

    return (
      <ListHeaderWrapper>
        <ListHeaderInner>
          <div>
            <ListTitle>{title}</ListTitle>
            <IncludeMenu
              setInclude={setInclude}
              isPremium={isPremium}
              subset={subset}
              include={include}
              sort={sort}
            />
          </div>
          <ListActions>
            <SortMenu
              include={include}
              setInclude={setInclude}
              isPremium={isPremium}
              subset={subset}
              sort={sort}
            />
          </ListActions>
        </ListHeaderInner>
      </ListHeaderWrapper>
    )
  }
}
