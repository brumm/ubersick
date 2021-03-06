import React from 'react'
import css from './style.scss'
import weather from 'weather-js'
import Pinky from 'react-pinky-promise'

const fetchWeather = search => (
  new Promise((resolve, reject) => (
    weather.find({ search, degreeType: 'C'}, function(err, result) {
      if(err) reject(err)
      resolve(result)
    })
  ))
)

export default class Bar extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <Pinky promise={fetchWeather('Cologne, Germany')}>
          {({ resolved: forecast = this.forecast }) => {
            this.forecast = forecast
            return forecast ? (
              <div>{forecast[0].current.skytext}, feels like {forecast[0].current.feelslike}º</div>
            ) : null
          }}
        </Pinky>
      </div>
    )
  }
}
