import React from 'react'
import css from 'components/App/App.scss'
import ReactGridLayout from 'react-grid-layout'
import { ipcRenderer } from 'electron'
import idbKeyval from 'idb-keyval'

import 'react-resizable/css/styles.css'
import PluginWrapper from 'components/PluginWrapper/PluginWrapper'

const req = require.context("../../plugins", true, /.ubersick-plugin\/\index\.js/)

export default class App extends React.Component {
  state = {
    isInteractive: false
  }

  componentDidMount() {
    this.interval = setInterval(::this.forceUpdate, 1000 * 60)
    ipcRenderer.on('interactive-mode', (event, isInteractive) => (
      this.setState({ isInteractive })
    ))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    ipcRenderer.removeAllListeners()
  }

  render() {
    const modules = req.keys()
    const { isInteractive } = this.state
    const { layout } = this.props

    return (
      <ReactGridLayout
        className={css.container}
        cols={6}
        rowHeight={window.innerHeight / 50}
        containerPadding={[20, 20]}
        width={window.innerWidth}
        verticalCompact={false}
        isResizable={isInteractive}
        isDraggable={isInteractive}
        onLayoutChange={this.props.persistLayout}
      >
        {modules.map(req).map((Komponent, index) => (
          <PluginWrapper
            key={modules[index]}
            component={<Komponent />}
            isInteractive={isInteractive}
            data-grid={layout[modules[index]]}
          />
        ))}
      </ReactGridLayout>
    )
  }
}
