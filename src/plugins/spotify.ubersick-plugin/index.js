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

  render() {
    return (
      <div className={css.container}>
        <Pinky promise={fetchSpotifyStatus()}>
          {({ pending, resolved, rejected }) => resolved ? (
            <div>
              <div>
                {`${resolved.track.artist_resource.name} — ${resolved.track.track_resource.name}`}
              </div>
            </div>
            ) : (
            <div>Loading...</div>
          )}
        </Pinky>
      </div>
    )
  }
}
