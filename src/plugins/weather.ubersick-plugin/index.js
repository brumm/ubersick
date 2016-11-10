import React from 'react'
import css from './style.scss'
import weather from 'weather-js'
import Pinky from 'react-pinky-promise'
import isEqual from 'lodash/isEqual'

const fetchWeather = search => (
  new Promise((resolve, reject) => (
    weather.find({ search, degreeType: 'C'}, function(err, result) {
      if(err) reject(err)
      resolve(result)
    })
  ))
)

export default class Bar extends React.Component {

  shouldComponentUpdate({ style }) {
    return isEqual(style, this.props.style)
  }

  render() {
    const { _grid, children, ...otherProps } = this.props
    return (
      <div {...otherProps} className={css.container}>
        <Pinky promise={fetchWeather('Cologne, Germany')}>
          {({ pending, resolved, rejected }) => resolved ? (
            <div>
              <div>{resolved[0].current.skytext}, feels like {resolved[0].current.feelslike}º</div>
            </div>
            ) : (
            <div>Loading...</div>
          )}
        </Pinky>
        {children}
      </div>
    )
  }
}
