import { useContext, useState } from 'react'
import { input_md } from './input/input'
import { btn_md } from './button/btn'
import toast from 'react-hot-toast'
import HostContext from '@renderer/context/HostContext'
import axios from 'axios'

export default function AddCusForm(): React.JSX.Element {
  const host = useContext(HostContext)

  const [name, setName] = useState<string>('user')
  const [model, setModel] = useState<string>('')
  const [IMEI, setIMEI] = useState<string>('')
  const [fault, setFault] = useState<string>('')
  const [price, setPrice] = useState<number>(0)

  const handleSubmit = async (e): Promise<void | string> => {
    e.preventDefault()
    if (model == '' || IMEI == '' || fault == '') return toast.error('Complete data')
    const customer = { name, model, IMEI, fault, price }
    try {
      const res = await axios.post(`http://${host}:3010/api/customers`, customer)
      if (res.data?.success) {
        toast.success('success')
        console.log(res.data.message)
        setName('')
        setModel('')
        setIMEI('')
        setFault('')
        setPrice(0)
      }
    } catch (error) {
      console.error(`[client] error: `, error)
      toast.error('Fail to add List')
    }
  }

  return (
    <div className="">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
        <label>
          <span>Name</span>
          <input
            type="text"
            className={input_md}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Model</span>
          <input
            type="text"
            className={input_md}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <label>
          <span>IMEI</span>
          <input
            type="text"
            className={input_md}
            value={IMEI}
            onChange={(e) => setIMEI(e.target.value)}
          />
        </label>
        <label>
          <span>fault</span>
          <input
            type="text"
            className={input_md}
            value={fault}
            onChange={(e) => setFault(e.target.value)}
          />
        </label>
        <label>
          <span>Price</span>
          <input
            type="text"
            className={input_md}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <div>
          <button type="submit" className={btn_md}>
            submit
          </button>
        </div>
      </form>
    </div>
  )
}
