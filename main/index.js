import { app, BrowserWindow, screen, globalShortcut } from 'electron'
import irpc from 'electron-irpc'
import $ from 'nodobjc'

$.framework('Foundation')
$.framework('AppKit')

app.dock.hide()

const irpcMain = irpc.main()
const { DEV, PORT = '8080' } = process.env
const SHORTCUT_TOGGLE = 'Command+Shift+Alt+Control+U'
const windowUrl = DEV
  ? `http://0.0.0.0:${PORT}/`
  : 'file://' + __dirname + '/index.html'

let mainWindow

// irpcMain.addFunction('getDirectoryContent', getDirectoryContent)

function createWindow () {
  let { width, height } = screen.getPrimaryDisplay().workAreaSize

  globalShortcut.register(SHORTCUT_TOGGLE, () => {
    const pool = $.NSAutoreleasePool('alloc')('init')
    const handle = mainWindow.getNativeWindowHandle()
    const nsView = require('nodobjc/lib/core').wrapValue(handle.readPointer(0), '@')
    const nsWindow = nsView('window')
    const desktopLevel = $.kCGDesktopWindowLevel - 1

    if (nsWindow('level') === desktopLevel) {
      nsWindow('setLevel', 0)
      console.log(nsWindow('level'))
    } else {
      nsWindow('setLevel', desktopLevel)
      console.log(nsWindow('level'))
    }

    pool('drain')
  })

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    show: false,
    frame: false,
    transparent: true,
    hasShadow: false,
    type: 'desktop',
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(windowUrl)
  if (DEV) { mainWindow.webContents.openDevTools() }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', mainWindow.show)
}

app.on('ready', createWindow)

app.on('will-quit', () => {
  globalShortcut.unregister(SHORTCUT_TOGGLE)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

process.on('uncaughtException', ::console.log)
