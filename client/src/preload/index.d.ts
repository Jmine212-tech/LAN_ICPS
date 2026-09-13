import { ElectronAPI } from '@electron-toolkit/preload'
import { SetStateAction } from 'react'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    update: {
      onCheck: () => void
      onDownload: () => void
      version: () => SetStateAction<string>
      onStatus: (callback) => callback
    }
    printer: {
      getPrinter: () => Promise<SetStateAction>
      print: ({ printerName: string, pageSize: string }) => Promise<void>
      sendInfo: (id) => Promise<void> 
      getInfo: () => Promise<void> 
    }
  }
}
