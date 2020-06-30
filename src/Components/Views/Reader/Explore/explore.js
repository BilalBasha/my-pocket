import React from 'react'
import styled from '@emotion/styled'
import { NavBarBottom, NavClamp } from '../../../Elements/NavBar/navBar'
import { Button } from '../../../Elements/Buttons/button'
import { ZINDEX } from '../../../../Common/constants'
import { Translate, withLocalize } from 'react-localize-redux'

const BarWrapper = styled('div')`
  display: block;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: ${ZINDEX.navBar};
  transform: translateY(60px);
  transition: transform 350ms ease-in-out;
  font-size: 16px;
  font-weight: 400;
`

const ExploreBlock = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const ExploreReadMore = ({ topics }) => {
  return topics.map((topic, index) => {
    const { name, url } = topic
    return (
      <Button type="open" key={index} href={url} margin="0 0 0 20px ">
        {name}
      </Button>
    )
  })
}

const ExploreBestOf = withLocalize(({ domain }) => {
  const { name, url } = domain
  return (
    <div>
      <Translate id="reader.explore.exploreBest">
        Explore the best from:
      </Translate>
      <Button type="open" href={url} margin="0 0 0 20px ">
        {name}
      </Button>
    </div>
  )
})

const MoreTopics = withLocalize(({ topics }) => {
  return (
    <div>
      <Translate id="reader.explore.readMore">Read more about:</Translate>
      <ExploreReadMore topics={topics} />
    </div>
  )
})

export const ExploreBar = ({ show, list }) => {
  if (!list) return null
  const { topics, domain } = list

  return (topics && topics.length > 0) || domain ? (
    <BarWrapper
      style={{ transform: show ? 'translateY(0)' : 'translateY(60px)' }}>
      <NavBarBottom>
        <NavClamp>
          <ExploreBlock>
            {topics.length > 0 && <MoreTopics topics={topics} />}
            {domain && <ExploreBestOf domain={domain} />}
          </ExploreBlock>
        </NavClamp>
      </NavBarBottom>
    </BarWrapper>
  ) : null
}
