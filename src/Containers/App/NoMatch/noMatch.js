import React, { Component } from 'react'

export class NoMatch extends Component {
  render() {
    const { pathname } = this.props.location
    return (
      <div>
        <h3>
          No match for <code>{pathname}</code>
        </h3>
      </div>
    )
  }
}
