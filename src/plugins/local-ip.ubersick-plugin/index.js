import React from 'react'
import css from './style.scss'
import ip from 'ip'

export default class Bar extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <h2>{ip.address()}</h2>
      </div>
    )
  }
}
