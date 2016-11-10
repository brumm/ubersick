import React from 'react'
import css from 'components/App/App.scss'
import ReactGridLayout from 'react-grid-layout'

import 'react-resizable/css/styles.css'

const req = require.context("../../plugins", true, /.ubersick-plugin\/\index\.js/)

export default class App extends React.Component {
  render() {
    const modules = req.keys()

    return (
      <ReactGridLayout
        className={css.container}
        cols={6}
        rowHeight={20}
        margin={[20, 20]}
        width={window.innerWidth}
        verticalCompact={false}
        isResizable={false}
      >
        {modules.map(req).map((Klass, index) => (
          <Klass key={modules[index]} data-grid={{x: 0, y: index, w: 1, h: 1}} />
        ))}
      </ReactGridLayout>
    )
  }
}
