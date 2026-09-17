import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { input_md } from './input/input'
import { btn_md } from './button/btn'
import { NavLink, Outlet } from 'react-router-dom'

import HostContext from '@renderer/context/HostContext'

export default function Layout(): React.JSX.Element {
  const NavMenu = [
    { menu: 'main', value: '/' },
    { menu: 'service', value: 'service' },
    { menu: 'dashboard', value: 'dashboard' },
    { menu: 'setting', value: 'setting' }
  ]

  const [host, setHost] = useState(localStorage.getItem('host') || '127.0.0.1')
  const [menu, setMenu] = useState('main')

  // ------------ Edit Ui
  const [mainLogo, setMainLogo] = useState('Client')

  const Ui = {
    logo: { mainLogo, setMainLogo },
    HOST: { host, setHost }
  }

  // -------------- handle set Url ---------------
  const handleSetUrl = async (): Promise<void> => {
    try {
      localStorage.setItem('host', host)
      toast.success(`Set url: ${host}`)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error(`[client] error: `, error)
      toast.error('Fail to set Url')
    }
  }

  // ------------- fetch data
  useEffect(() => {
    const fetch = (): void => {
      setMainLogo(localStorage.getItem('mainLogo') || 'Client')
    }
    fetch()
  }, [])

  // -------------- layout -----------------------
  return (
    <div className="w-full h-screen p-1.5 flex flex-col gap-1.5">
      <header className="HEADER w-full h-1/10 flex items-center justify-between border border-stone-500 rounded-xl p-2.5">
        <h1 className="LOGO text-2xl font-bold font-serif">{mainLogo}</h1>
        {/* -- url input -- */}
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
        {/* -- outlet path -- */}
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
      {/* ---------------------------- outlet ------------------------ */}
      <main className="MAIN w-full h-8/10 border border-stone-400 rounded-xl p-2.5">
        <HostContext value={host}>
          <Outlet context={Ui} />
        </HostContext>
      </main>
      {/* -------------------- footer ------------------------- */}
      <footer className="w-full h-1/10 rounded-xl flex items-center justify-center p-1.5 bg-stone-700"></footer>
    </div>
  )
}
