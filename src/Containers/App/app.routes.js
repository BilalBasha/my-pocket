import React, { Component } from 'react'

import Loadable from 'react-loadable'
import { Loader, LoaderCentered } from '../../Components/Elements/Loader/loader'
import { NoMatch } from '../../Containers/App/NoMatch/noMatch'

// Routing
import { Route, Switch } from 'react-router' // react-router v4

/* LOADABLE COMPONENTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function Loading(props) {
  if (props.error) return `Loading Error: ${props.error}`
  else if (props.pastDelay)
    return (
      <LoaderCentered>
        <Loader isVisible={true} />
      </LoaderCentered>
    )
  else return null
}

const LoadableCollection = Loadable({
  loader: () => import('../../Containers/Collection/collection.container'),
  loading: Loading,
  delay: 600
})

const LoadableTagged = Loadable({
  loader: () => import('../../Containers/Collection/Tagged/tagged.container'),
  loading: Loading,
  delay: 600
})

const LoadableSearch = Loadable({
  loader: () => import('../../Containers/Collection/Search/search.container'),
  loading: Loading,
  delay: 600
})

const LoadableReader = Loadable({
  loader: () => import('../../Containers/Reader/reader.container'),
  loading: Loading,
  delay: 600
})

const LoadableDiscover = Loadable({
  loader: () => import('../../Containers/Discover/discover.container'),
  loading: Loading,
  delay: 600
})

/* ROUTES
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export const routes = [
  {
    path: '/',
    exact: true,
    subset: 'unread',
    type: 'lists',
    main: LoadableCollection
  },
  {
    path: '/archive',
    subset: 'archive',
    type: 'lists',
    main: LoadableCollection
  },
  {
    path: '/favorites/:subType',
    subset: 'favorites',
    type: 'filters',
    hasInclude: true,
    main: LoadableCollection
  },
  {
    path: '/favorites',
    subset: 'favorites',
    type: 'filters',
    hasInclude: true,
    main: LoadableCollection
  },
  {
    path: '/highlights/:subType',
    subset: 'highlights',
    type: 'filters',
    hasInclude: true,
    main: LoadableCollection
  },
  {
    path: '/highlights',
    subset: 'highlights',
    type: 'filters',
    hasInclude: true,
    main: LoadableCollection
  },
  {
    path: '/articles/:subType',
    subset: 'articles',
    type: 'filters',
    hasInclude: true,
    main: LoadableCollection
  },
  {
    path: '/articles',
    subset: 'articles',
    type: 'filters',
    hasInclude: true,
    main: LoadableCollection
  },
  {
    path: '/videos/:subType',
    subset: 'videos',
    type: 'filters',
    hasInclude: true,
    main: LoadableCollection
  },
  {
    path: '/videos',
    subset: 'videos',
    type: 'filters',
    hasInclude: true,
    main: LoadableCollection
  },
  {
    path: '/tags/:tagSlug/:subType',
    type: 'tags',
    hasInclude: true,
    main: LoadableTagged
  },
  {
    path: '/tags/:tagSlug',
    type: 'tags',
    hasInclude: true,
    main: LoadableTagged
  },
  {
    path: '/search/:query',
    type: 'search',
    hasInclude: true,
    main: LoadableSearch
  },
  {
    path: '/search/',
    type: 'search',
    hasInclude: true,
    main: LoadableSearch
  },
  { path: '/discover', main: LoadableDiscover },
  { path: '/read/:item_id', reader: LoadableReader }
]

export class Reader extends Component {
  render() {
    return (
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.reader}
          />
        ))}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

export class Collection extends Component {
  render() {
    return (
      <Switch>
        {routes.map((route, index) => {
          const RouteComponent = route.main

          return route.main ? (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={props => (
                <RouteComponent
                  {...props}
                  subset={route.subset}
                  type={route.type}
                />
              )}
            />
          ) : null
        })}
        <Route component={NoMatch} />
      </Switch>
    )
  }
}
