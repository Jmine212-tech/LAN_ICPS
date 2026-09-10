import { ElectronAPI } from '@electron-toolkit/preload'
import { SetStateAction } from 'react'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    update: unknown
    printer: {
      getPrinter: () => Promise<SetStateAction>
      print: ({ printerName: string, pageSize: string }) => Promise<void>
    }
  }
}
