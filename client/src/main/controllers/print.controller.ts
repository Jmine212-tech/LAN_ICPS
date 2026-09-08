import { is } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

export const handlePrint = (): void => {
  // Register the print handler in the Main process
  ipcMain.handle('get-pdf-preview', async (event, { route, filename }) => {
    console.log('route: ', route, 'and', 'filename: ', filename)

    const printWin = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    })

    const baseUrl = `http://localhost:5173/#${route}`

    await printWin.loadURL(baseUrl)

    printWin.webContents.executeJavaScript('document.fonts.ready')

    await printWin.webContents
      .printToPDF({
        pageSize: 'A5',
        printBackground: true,
        margins: {
          marginType: 'none'
        }
      })
      .then((info) => console.log('success', info))

    printWin.destroy()
  })
}
