import { ipcMain, BrowserWindow } from 'electron'

export const handlePrint = (): void => {
  ipcMain.handle('printer:print', (event, options = {}) => {
    const printWin = BrowserWindow.fromWebContents(event.sender)
    if (!printWin) return { success: false, error: 'target window not found!' }

    return new Promise((resolve) => {
      printWin.webContents.print(
        {
          silent: options.silent ?? true, // true = no dialog; false = system dialog
          printBackground: true, // preserve CSS colors & backgrounds
          deviceName: options.printerName || '', // target specific printer, or empty for default
          color: options.color ?? true,
          copies: options.copies || 1,
          pageSize: options.pageSize || 'A5',
          landscape: options.landscape || false,
          margins: {
            marginType: 'none' // 'default', 'none', or 'printableArea'
          }
        },
        (success, failureReason) => {
          if (!success) {
            resolve({ success: false, error: failureReason })
          } else {
            resolve({ success: true })
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
