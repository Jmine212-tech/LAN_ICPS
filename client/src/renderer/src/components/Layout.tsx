import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { input_md } from './input/input'
import { btn_md } from './button/btn'
import { NavLink, Outlet } from 'react-router-dom'
import { io } from 'socket.io-client'

import HostContext from '@renderer/context/HostContext'
import CusContext from '@renderer/context/CusContext'

export default function Layout(): React.JSX.Element {
  const NavMenu = [
    { menu: 'main', value: '/' },
    { menu: 'service', value: 'service' },
    { menu: 'dashboard', value: 'dashboard' },
    { menu: 'setting', value: 'setting' }
  ]

  const [host, setHost] = useState(localStorage.getItem('host') || '')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [version, setVersion] = useState('')

  const [menu, setMenu] = useState('main')

  const socket = io(`http://${host}:3010`)

  useEffect((): void => {
    const fetch = async (): Promise<void> => {
      try {
        const res = await axios.get(`http://${host}:3010/api/customers`)
        if (res.data?.success) setCustomers(res.data.data)

        const ver = await window.update.version()
        setVersion(ver)
      } catch (error) {
        console.error(`[Client] error: `, error)
        toast.error('Fail to Load Data')
      }
    }
    fetch()

    socket.on('customer:create', (newCus: Customer) => {
      setCustomers((prev) => {
        // Prevent duplicate additions if the fetch already included this customer
        if (prev.some((c) => c._id === newCus._id)) return prev
        return [newCus, ...prev]
      })
    })
    socket.on('customer:delete', (id: string) => {
      setCustomers((prev) => prev.filter((cus) => cus._id !== id))
    })
    socket.on('customer:update', (updatedCus: Customer) => {
      setCustomers((prev) => prev.map((cus) => (cus._id === updatedCus._id ? updatedCus : cus)))
    })
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
    <div className="w-full h-screen p-1.5 flex flex-col gap-1.5">
      <header className="HEADER w-full h-1/10 flex items-center justify-between border border-stone-500 rounded-xl p-2.5">
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
        <nav className="flex gap-0.5">
          {NavMenu.map((item) => (
            <NavLink
              key={item.menu}
              to={item.value}
              onClick={() => setMenu(item.menu)}
              className={`${btn_md} ${menu == item.menu && `bg-stone-300`}`}
            >
              {item.menu}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="MAIN w-full h-8/10 border border-stone-400 rounded-xl p-2.5">
        <HostContext value={host}>
          <CusContext value={customers}>
            <Outlet />
          </CusContext>
        </HostContext>
      </main>

      <footer className="w-full h-1/10 border border-stone-400 rounded-xl flex items-center p-1.5">
        <p>version: {version}</p>
      </footer>
    </div>
  )
}
