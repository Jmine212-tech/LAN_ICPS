/// <reference types="vite/client" />

import { SetStateAction } from 'react'

interface Window {
  api: unknown
  update: {
    onCheck: () => void
    onDownload: () => void
    onStatus: (msg: unknown) => unknown
    version: () => SetStateAction<string>
  }
  printer: {
    getPrinter: () => Promise<SetStateAction>
    print: ({ printerName: string, pageSize: string }) => Promise<void>
    sendInfo: (id) => unknown
    getInfo: () => unknown
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

interface customer {
  _id: string
  name: string
  model: string
  IMEI: string
  fault: string
  price: number
  expense: number
  isFinish: string
  isTake: boolean
  seNumb: number
  createdAt: string
}
