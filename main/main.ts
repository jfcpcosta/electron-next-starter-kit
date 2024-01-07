import { ipcMain } from 'electron'
import { app, BrowserWindow } from 'electron/main'
import { join } from 'node:path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serve = require('electron-serve')

function createWindow() {
  const window = new BrowserWindow({
    width: 1100,
    height: 700,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  })

  const loadFn = app.isPackaged ? loadPackage : loadDevelopment
  loadFn(window)
}

async function loadPackage(win: BrowserWindow) {
  const appServe = serve({
    directory: join(__dirname, '../out'),
  })

  await appServe(win)
  win.loadURL('app://-')
}

function loadDevelopment(win: BrowserWindow) {
  win.loadURL('http://localhost:3000')

  win.webContents.on('did-fail-load', () => {
    win.webContents.reloadIgnoringCache()
  })

  win.webContents.openDevTools()
}

function handleWindowAllClosed() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

function handleActivate() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}

async function init() {
  await app.whenReady()

  createWindow()

  app.on('window-all-closed', handleWindowAllClosed)
  app.on('activate', handleActivate)
}

init().then(() => {
  console.log('🚀 launched')

  ipcMain.handle('ping', () => '🤖')
})
