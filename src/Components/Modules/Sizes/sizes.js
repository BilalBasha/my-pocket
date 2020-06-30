import React, { Component } from 'react'
import { SIZES } from '../../../Common/constants'

export const SizeContext = React.createContext()

export function getSize(width) {
  // 1290 // 1152 // 768
  if (width >= 1290) return 'LARGE'
  if (width >= 1152) return 'MEDIUM'
  if (width >= 768) return 'SMALL'
  return 'MINI'
}

export class SizeProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 'LARGE'
    }
  }
  componentWillMount() {
    this.avatar = localStorage.getItem('avatar')
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    if (!this.checking) requestAnimationFrame(this.update)
    this.checking = true
  }

  update = () => {
    this.checking = false
    const width = window.innerWidth
    const size = getSize(width)
    if (this.state.size !== size) this.setState({ size })
  }

  get sizes() {
    return SIZES[this.state.size]
  }

  render() {
    const sizes = this.sizes
    const { LIST, GRID, ...rest } = sizes
    const listMode = this.props.forceGrid ? 'grid' : this.props.listMode
    const dimensions = listMode === 'grid' ? sizes['GRID'] : sizes['LIST']
    return (
      <SizeContext.Provider value={{ ...dimensions, ...rest }}>
        {this.props.children}
      </SizeContext.Provider>
    )
  }
}
