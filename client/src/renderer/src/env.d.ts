/// <reference types="vite/client" />

interface Window {
  api: unknown
  update: {
    onCheck: () => void
    onDownload: () => void
    onStatus: (msg: unknown) => unknown
  }
}

interface UpdateStatusPayload {
  status: 'check' | 'available' | 'notAvailable' | 'error' | 'downloading' | 'downloaded'
  message: string
  info?: unknown
  error?: unknown
  progress?: {
    percent: number
    bytesPerSecond: number
    total: number
    transferred: number
  }
}
