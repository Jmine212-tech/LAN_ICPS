import { customer } from '@renderer/env'
import { createContext } from 'react'

const CusContext = createContext<customer[]>([])

export default CusContext
