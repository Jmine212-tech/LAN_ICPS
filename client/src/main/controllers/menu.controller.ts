import { app, BrowserWindow, Menu } from 'electron'

export const createMenu = (window: BrowserWindow): void => {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === 'darwin' ? undefined : 'app',
        type: 'submenu',
        submenu: [
          {
            label: 'DevTools',
            click: () => window.webContents.openDevTools()
          },
          {
            label: 'Quit',
            click: app.quit
          }
        ]
      }
    ])
  )
}
