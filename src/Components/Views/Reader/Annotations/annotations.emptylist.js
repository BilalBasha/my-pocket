import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Illustration } from '../../../Elements/Illustrations/illustration'
import { Translate, withLocalize } from 'react-localize-redux'

const List = styled('div')`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - 50px);
`

const Heading = styled('h4')`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  margin: 0 0 4px;
  padding: 0 20px;
`

const Info = styled('p')`
  font-family: 'Graphik Web';
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin: 0;
  padding: 0 20px;
`

class EmptyListClass extends Component {
  render() {
    return (
      <List>
        <Illustration name="HighlightsAlt" size="120px" margin="0 auto" />
        <Heading>
          <Translate id="annotations.infoHeading">
            You haven’t highlighted anything yet
          </Translate>
        </Heading>
        <Info>
          <Translate id="annotations.instructions">
            When you select text while you’re reading, it'll appear here.
          </Translate>
        </Info>
      </List>
    )
  }
}

export const EmptyList = withLocalize(EmptyListClass)
