import React from 'react'
import { SizeContext } from './sizes'

export function withSizes(Component) {
  return function contextComponent(props) {
    return (
      <SizeContext.Consumer>
        {context => <Component {...props} {...context} />}
      </SizeContext.Consumer>
    )
  }
}
