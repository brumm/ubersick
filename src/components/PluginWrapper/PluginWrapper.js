import React from 'react'
import isEqual from 'lodash/isEqual'

export default class PluginWrapper extends React.Component {

  shouldComponentUpdate({ style, isInteractive }) {
    return (
      isEqual(style, this.props.style) ||
      isEqual(isInteractive, this.props.isInteractive)
    )
  }

  render() {
    const {
      children,
      isInteractive,
      component,
      ...otherProps
    } = this.props

    otherProps.style = {
      ...otherProps.style,
      display: 'flex',
      alignItems: 'center',
      border: isInteractive ? '1px solid white' : undefined
    }

    return (
      <div {...otherProps}>
        {component}
        {children}
      </div>
    )
  }
}
