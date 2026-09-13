import { io } from 'socket.io-client'
import CusList from '../components/customerList/Cus.List'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { btn_md } from '@renderer/components/button/btn'
import AddCusForm from '@renderer/components/customerList/AddCusForm'
import HostContext from '@renderer/context/HostContext'
import CusContext from '@renderer/context/CusContext'
import { customer } from '@renderer/env'

export default function MainPage(): React.JSX.Element {
  const host = useContext(HostContext)
  const [toggleForm, setToggleForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [customers, setCustomers] = useState([])

  const handleToggleForm = (): void => {
    if (toggleForm) {
      setToggleForm(false)
    } else {
      setToggleForm(true)
    }
  }

  const socket = io(`http://${host}:3010`)
  // ------------ fetch data ---------------------
  useEffect((): void => {
    const fetch = async (): Promise<void> => {
      try {
        const res = await axios.get(`http://${host}:3010/api/customers`)
        if (res.data?.success) setCustomers(res.data.data)
      } catch (error) {
        console.error(`[Client] error: `, error)
        toast.error('Fail to Load Data')
      } finally {
        setLoading(false)
      }
    }
    fetch()
    // --------------- CRUD listener ----------------
    socket.on('customer:create', (newCus: customer) => {
      setCustomers((prev: any) => {
        // Prevent duplicate additions if the fetch already included this customer
        if (prev.some((c: customer) => c._id === newCus._id)) return prev
        return [newCus, ...prev]
      })
    })
    socket.on('customer:delete', (id: string) => {
      setCustomers((prev) => prev.filter((cus: customer) => cus._id !== id))
    })
    socket.on('customer:update', (updatedCus: customer) => {
      setCustomers((prev: any) =>
        prev.map((cus: customer) => (cus._id === updatedCus._id ? updatedCus : cus))
      )
    })
  }, [])

  return (
    <div className="w-full h-full relative">
      <header className="sticky top-0 p-1.5 flex justify-between bg-stone-700 rounded-xl text-stone-200">
        <span />
        <h1 className="text-2xl text-center font-serif font-bold">CUSTOMER LIST</h1>
        <nav className="flex items-center justify-center">
          <button
            className={`${btn_md} ${toggleForm && `bg-stone-300 text-black`}`}
            onClick={() => {
              handleToggleForm()
            }}
          >
            Add
          </button>
        </nav>
      </header>
      {/* ------------------------------ main content --------------------- */}
      {loading && (
        <p className="w-full h-full text-2xl font-bold flex items-center justify-center">
          Loading...
        </p>
      )}
      {!loading && (
        <HostContext value={host}>
          <main className="w-full h-100 mt-2 border overflow-scroll scrollbar-none rounded-xl">
            <CusContext value={customers}>
              {toggleForm && <AddCusForm />}
              {!toggleForm && <CusList />}
            </CusContext>
          </main>
        </HostContext>
      )}
    </div>
  )
}
