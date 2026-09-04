import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

const update = {
  onCheck: () => ipcRenderer.invoke('update:check'),
  onDownload: () => ipcRenderer.invoke('update:download'),
  onStatus: (callback: (msg) => void) => {
    const listener = (_, msg): void => callback(msg)
    ipcRenderer.on('update:status', listener)
    return () => ipcRenderer.off('update:status', listener)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('update', update)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.update = update
}
