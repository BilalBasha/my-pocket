import React, { useCallback, useState, useRef, PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { TooltipBody } from '../../Elements/Tooltip/tooltip'
import { OverlayBase } from '../../Elements/Overlay/overlay'
import { ZINDEX } from '../../../Common/constants'

const PopoverContent = styled('div')`
  ${OverlayBase};
  width: auto;
  position: absolute;
  top: ${props => (props.attachBottom ? 'initial' : '100%')};
  bottom: ${props => (props.attachBottom ? '100%' : 'initial')};
  right: ${props => (props.collisionLeft ? 'initial' : 0)};
  left: ${props => (props.collisionLeft ? 0 : 'initial')};
  padding: 0;
  z-index: ${ZINDEX.popover};
  ${props => props.tooltip ? TooltipBody : ''};
`

const NullWrapper = styled('div')`
  display: inline-flex;
  position: relative;
  line-height: inherit;
  align-items: center;
  align-content: center;
`

const TriggerWrapper = styled(NullWrapper)`
  cursor: pointer;
`

const InlineWrapper = styled('div')`
  display: inline-block;
`

export const PopoverContext = React.createContext()

export class Cancel extends PureComponent {
  render() {
    return (
      <PopoverContext.Consumer>
        {({ deActivate }) => (
          <InlineWrapper onClick={deActivate}>
            {this.props.children}
          </InlineWrapper>
        )}
      </PopoverContext.Consumer>
    )
  }
}

export class Trigger extends PureComponent {
  render() {
    return (
      <PopoverContext.Consumer>
        {({ toggle, activateOnClick, onHover, offHover, triggerRef }) =>
          activateOnClick ? (
            <TriggerWrapper onClick={toggle} className="trigger" ref={triggerRef}>
              {this.props.children}
            </TriggerWrapper>
          ) : (
            <TriggerWrapper
              ref={triggerRef}
              onMouseOver={onHover}
              onMouseOut={offHover}
              className="trigger">
              {this.props.children}
            </TriggerWrapper>
          )
        }
      </PopoverContext.Consumer>
    )
  }
}

export class Content extends PureComponent {
  render() {
    return (
      <PopoverContext.Consumer>
        {({ on, onHover, offHover, onClick, persist, collisionLeft }) => {
          return on ? (
            <PopoverContent
              attachBottom={this.props.attachBottom}
              collisionLeft={collisionLeft}
              onMouseOver={onHover}
              onMouseOut={persist ? null : offHover}
              onClick={onClick}
              data-positioned>
              {this.props.children}
            </PopoverContent>
          ) : null
        }}
      </PopoverContext.Consumer>
    )
  }
}

export function TooltipContent({ attachBottom, topOffset = 0, leftOffset = 0, children }) {
    const [contentStyle, setContentStyle] = useState({})
    const tooltipTriggerRef = useRef()
    const contentRefCallback = useCallback(node => {
      if(node && tooltipTriggerRef.current) {
        const { scrollWidth } = node
        const { top, left, height } = tooltipTriggerRef.current.getBoundingClientRect()
        setContentStyle({
          top: top + topOffset + height + 10 + 'px',
          left: left + leftOffset,
          width: scrollWidth
        })
      }
    }, [leftOffset, topOffset])
    return ReactDOM.createPortal(
      <PopoverContext.Consumer>
        {({ triggerRef, on, onHover, offHover, onClick, persist, collisionLeft }) => {
          tooltipTriggerRef.current = triggerRef.current
          return on ? (
            <PopoverContent
              ref={contentRefCallback}
              style={contentStyle}
              tooltip={true}  // eslint-disable-line
              attachBottom={attachBottom}
              collisionLeft={collisionLeft}
              onMouseOver={onHover}
              onMouseOut={persist ? null : offHover}
              onClick={onClick}
              data-positioned>
              {children}
            </PopoverContent>
          ) : null
        }}
      </PopoverContext.Consumer>
    , document.body)
  }

export class Popover extends PureComponent {
  constructor(props) {
    super(props)
    this.triggerRef = React.createRef()
    this.containerRef = React.createRef()
    this.state = { on: false }
  }

  toggle = () => (this.state.on ? this.deActivate() : this.activate())

  activate = () => {
    const rect = this.state.rect
      ? this.state.rect
      : this.containerRef.current.getBoundingClientRect()

    const collisionLeft = rect.left < 0
    this.setState({
      on: true,
      collisionLeft,
      rect
    })
  }

  deActivate = () => this.setState({ on: false })

  onHover = () => {
    clearTimeout(this.hoverTimer)
    this.activate()
  }

  offHover = () => {
    this.hoverTimer = setTimeout(() => {
      this.deActivate()
    }, 250)
  }

  onClick = () => {
    if (this.props.closeOnClick) this.deActivate()
  }

  isClickOutside = e => {
    const container = this.containerRef.current
    if (container && container.contains(e.target)) return

    this.setState({ on: false })
    if (this.props.onClose) this.props.onClose()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.isClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.isClickOutside)
  }

  render() {
    return (
      <PopoverContext.Provider
        value={{
          triggerRef: this.triggerRef,
          on: this.state.on,
          toggle: this.toggle,
          onHover: this.onHover,
          offHover: this.offHover,
          onClick: this.onClick,
          deActivate: this.deActivate,
          persist: this.props.persist,
          collisionLeft: this.state.collisionLeft,
          activateOnClick: this.props.activateOnClick,
          attachBottom: this.props.attachBottom
        }}>
        <NullWrapper ref={this.containerRef}>{this.props.children}</NullWrapper>
      </PopoverContext.Provider>
    )
  }
}

Popover.defaultProps = {
  activateOnClick: false,
  persist: false
}
