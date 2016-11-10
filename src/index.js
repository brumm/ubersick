import 'css/global'

import React from 'react'
import { render } from 'react-dom'
import Pinky from 'react-pinky-promise'
import idbKeyval from 'idb-keyval'

import App from 'components/App/App'

const persistLayout = layout => (
  idbKeyval.set('layout', layout.reduce((layout, { i, x, y, w, h }) => {
    layout[i] = { x, y, w, h }
    return layout
  }, {}))
)

idbKeyval.get('layout').then((layout = {}) => (
  render(
    <App
      persistLayout={persistLayout}
      layout={layout}
    />,
    document.querySelector('#app')
  )
))
