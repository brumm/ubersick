import React from 'react'
import css from 'components/App/App.scss'
import ReactGridLayout from 'react-grid-layout'
import { ipcRenderer } from 'electron'
import isEqual from 'lodash/isEqual'
import idbKeyval from 'idb-keyval'

import 'react-resizable/css/styles.css'

const req = require.context("../../plugins", true, /.ubersick-plugin\/\index\.js/)

class PluginWrapper extends React.Component {

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

export default class App extends React.Component {
  state = {
    isInteractive: false
  }

  componentDidMount() {
    ipcRenderer.on('interactive-mode', (event, isInteractive) => (
      this.setState({ isInteractive })
    ))
  }

  componentWillUnmount() {
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
