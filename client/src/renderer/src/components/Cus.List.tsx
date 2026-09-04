import { useContext } from 'react'
import { btn_md } from './button/btn'
import axios from 'axios'
import toast from 'react-hot-toast'

type Customer = {
  _id: string
  name: string
  model: string
  IMEI: string
  fault: string
}

import CusContext from '@renderer/context/CusContext'
import HostContext from '@renderer/context/HostContext'

export default function CusList(): React.JSX.Element {
  const host = useContext(HostContext)
  const customers = useContext(CusContext)

  const handleDeleteCus = async (id: string): Promise<void> => {
    try {
      const res = await axios.delete(`http://${host}:3010/api/customers/${id}`)
      if (res.data?.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error(`[client] error: `, error)
    }
  }

  return (
    <div>
      {customers &&
        customers.map((customer: Customer, index) => (
          <div key={customer._id} className="flex gap-1.5">
            <span>{index}. </span> {customer?.model}
            <button className={btn_md} onClick={() => handleDeleteCus(customer._id)}>
              delete
            </button>
          </div>
        ))}
    </div>
  )
}
