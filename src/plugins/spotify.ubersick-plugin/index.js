import React from 'react'
import css from './style.scss'
import Pinky from 'react-pinky-promise'
import nodeSpotifyWebHelper from 'node-spotify-webhelper'

const spotify = new nodeSpotifyWebHelper.SpotifyWebHelper()

const fetchSpotifyStatus = () => (
  new Promise((resolve, reject) => (
    spotify.getStatus((err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  ))
)

export default class Bar extends React.Component {
  status = {
    track: {
      artist_resource: { name: 'Artist' },
      track_resource: { name: 'Track' },
    }
  }

  render() {
    return (
      <div className={css.container}>
        <Pinky promise={fetchSpotifyStatus()}>
          {({ resolved: status = this.status }) => {
            this.status = status
            return (
              <div>{`${status.track.artist_resource.name} — ${status.track.track_resource.name}`}</div>
            )
          }}
        </Pinky>
      </div>
    )
  }
}
