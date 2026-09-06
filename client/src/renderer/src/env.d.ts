/// <reference types="vite/client" />

interface Window {
  api: unknown
  update: {
    onCheck: () => void
    onDownload: () => void
    onStatus: (msg: unknown) => unknown
    version: () => unknowns
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

// id, name, model, IMEI, fault, price, expense, isFinish, isTake, seNumb
type Customer = {
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
