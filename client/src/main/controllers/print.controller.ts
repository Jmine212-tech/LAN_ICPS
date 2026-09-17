import { ipcMain, BrowserWindow } from 'electron'

export const initPrint = (): void => {
  ipcMain.handle('printer:print', async (event, options = {}) => {
    const printWin = BrowserWindow.fromWebContents(event.sender)
    if (!printWin) return { success: false, error: 'target window not found!' }

    return new Promise((resolve, reject) => {
      printWin.webContents.print(
        {
          deviceName: options.deviceName ?? '',
          silent: options.silent ?? false,
          printBackground: true,
          pageSize: options.pageSize ?? 'A5',
          landscape: options.landscape ?? false,
          margins: {
            marginType: 'none'
          }
        },
        (success, failureReason) => {
          if (!success) {
            reject(`[print] error: ${failureReason}`)
          } else {
            resolve('success')
          }
        }
      )
    }) 
  })

  // Optional: Retrieve available system printers
  ipcMain.handle('printer:getPrinter', async (event) => {
    const printWin = BrowserWindow.fromWebContents(event.sender)
    if (!printWin) return []

    return await printWin.webContents.getPrintersAsync()
  })
}
