import { autoUpdater } from 'electron-updater'
import { BrowserWindow, ipcMain } from 'electron'

// Disable automatic downloading if you want explicit download control via handleDownload
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

const showMessage = (win: BrowserWindow, msg: Record<string, unknown>): void => {
  win.webContents.send('update:status', msg)
}

export const setupAutoUpdater = (win: BrowserWindow): void => {
  // Register IPC Handlers
  ipcMain.handle('update:check', async () => {
    return await autoUpdater.checkForUpdates()
  })

  ipcMain.handle('update:download', async () => {
    return await autoUpdater.downloadUpdate()
  })

  // Register Event Listeners
  autoUpdater.on('checking-for-update', () => {
    showMessage(win, { status: 'check', message: 'Checking for update...' })
  })

  autoUpdater.on('update-available', (info) => {
    showMessage(win, { status: 'available', message: 'Update available', info })
  })

  autoUpdater.on('update-not-available', (info) => {
    showMessage(win, { status: 'notAvailable', message: 'Update not available', info })
  })

  autoUpdater.on('error', (error) => {
    showMessage(win, {
      status: 'error',
      message: error?.message || 'Error checking for updates',
      error
    })
  })

  autoUpdater.on('download-progress', (progress) => {
    showMessage(win, {
      status: 'progress',
      message: 'Downloading...',
      progress: {
        percent: progress.percent,
        bytesPerSecond: progress.bytesPerSecond,
        total: progress.total,
        transferred: progress.transferred
      }
    })
  })

  autoUpdater.on('update-downloaded', (info) => {
    showMessage(win, { status: 'downloaded', message: 'Download completed', info })
  })
}
