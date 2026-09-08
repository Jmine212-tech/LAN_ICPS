import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    update: unknown
    getPreview: () => Promise<{ success: boolean; url?: string; error?: string }>
  }
}
