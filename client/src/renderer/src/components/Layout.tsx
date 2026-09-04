import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { input_md } from './input/input'
import { btn_md } from './button/btn'
import { Outlet } from 'react-router-dom'

import HostContext from '@renderer/context/HostContext'
import CusContext from '@renderer/context/CusContext'

export default function Layout(): React.JSX.Element {
  const DefaultHost = localStorage.getItem('host')
  const [host, setHost] = useState(DefaultHost || '')
  const [customers, setCustomers] = useState([])

  useEffect((): void => {
    const fetch = async (): Promise<void> => {
      try {
        const res = await axios.get(`http://${host}:3010/api/customers`)
        if (res.data?.success) setCustomers(res.data.data)
      } catch (error) {
        console.error(`[Client] error: `, error)
        toast.error('Fail to Load Data')
      }
    }
    fetch()
  }, [])

  const handleSetUrl = async (): Promise<void> => {
    try {
      localStorage.setItem('host', host)
      toast.success(`Set url: ${host}`)
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (error) {
      console.error(`[client] error: `, error)
      toast.error('Fail to set Url')
    }
  }

  return (
    <div>
      <header className="flex items-center p-1.5 border-b border-stone-300 gap-2.5">
        <h1 className="LOGO text-2xl font-bold font-serif">LAN_ICPS</h1>
        <div>
          <input
            type="text"
            className={input_md}
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
          <button className={btn_md} onClick={() => handleSetUrl()}>
            Url
          </button>
        </div>
      </header>

      <main>
        <HostContext value={host}>
          <CusContext value={customers}>
            <Outlet />
          </CusContext>
        </HostContext>
      </main>
    </div>
  )
}
