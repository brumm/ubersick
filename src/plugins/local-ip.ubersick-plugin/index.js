import React from 'react'
import css from './style.scss'
import ip from 'ip'

export default class Bar extends React.Component {
  render() {
    const { _grid, children, ...otherProps } = this.props
    return (
      <div {...otherProps} className={css.container}>
        <h2>{ip.address()}</h2>
        {children}
      </div>
    )
  }
}
