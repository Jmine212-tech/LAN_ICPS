import { useContext, useEffect, useState } from 'react'
import { input_md } from '../input/input'
import { btn_md } from '../button/btn'
import toast from 'react-hot-toast'
import axios from 'axios'

import HostContext from '@renderer/context/HostContext'
import CusContext from '@renderer/context/CusContext'

export default function AddCusForm(): React.JSX.Element {
  const [name, setName] = useState<string>('user')
  const [model, setModel] = useState<string>('')
  const [IMEI, setIMEI] = useState<string>('')
  const [fault, setFault] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [seNumb, setSeNumb] = useState(1)

  const host = useContext(HostContext)
  const customers = useContext(CusContext)
  const cusSeNumb = customers.map((prev) => prev.seNumb)
  // ------------- fetch data
  useEffect(() => {
    const fetch = (): void => {
      setSeNumb(cusSeNumb[0] + 1)
    }
    fetch()
  }, [customers.length])
  // ------------ submit to create customer list
  const handleSubmit = async (e): Promise<void | string> => {
    e.preventDefault()
    if (model == '' || IMEI == '' || fault == '') return toast.error('Complete data')
    const customer = { name, model, IMEI, fault, price, seNumb }
    try {
      const res = await axios.post(`http://${host}:3010/api/customers`, customer)
      if (res.data?.success) {
        toast.success('success')
        console.log(res.data.message)
        setName('user')
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
  // ------------------ render AddCusForm -----------------------
  return (
    <div className="w-full h-full flex items-center justify-center bg-stone-700 text-white">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
        {/* -- id -- */}
        <label className="flex">
          <p>id: {seNumb} </p>
        </label>
        {/* -- name -- */}
        <label className="flex gap-2.5">
          <input
            type="text"
            className={input_md}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>Name</span>
        </label>
        {/* -- model -- */}
        <label className="flex gap-2.5">
          <input
            type="text"
            className={input_md}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <span>Model</span>
        </label>
        {/* -- IMEI -- */}
        <label className="flex gap-2.5">
          <input
            type="text"
            className={input_md}
            value={IMEI}
            onChange={(e) => setIMEI(e.target.value)}
          />
          <span>IMEI</span>
        </label>
        {/* -- fault -- */}
        <label className="flex gap-2.5">
          <input
            type="text"
            className={input_md}
            value={fault}
            onChange={(e) => setFault(e.target.value)}
          />
          <span>fault</span>
        </label>
        {/* -- prince -- */}
        <label className="flex gap-2.5">
          <input
            type="number"
            className={input_md}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <span>Price</span>
        </label>
        {/* -- submit btn -- */}
        <div className="mt-2">
          <button type="submit" className={btn_md}>
            submit
          </button>
        </div>
      </form>
    </div>
  )
}
