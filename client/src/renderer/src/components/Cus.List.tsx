import { useContext, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import CusContext from '@renderer/context/CusContext'
import HostContext from '@renderer/context/HostContext'
import { input_md } from './input/input'
import { btn_md, btn_md_error, btn_md_success } from './button/btn'
import { ArrowLeft, Pencil, Printer, Trash } from 'lucide-react'

export default function CusList(): React.JSX.Element {
  const host = useContext(HostContext)
  const customers = useContext(CusContext)

  const searchMenu = ['id', 'name', 'model', 'IMEI', 'fault']
  const [searchBy, setSearchBy] = useState('id')
  const [search, setSearch] = useState('')
  const [detail, setDetail] = useState(false)
  // id, name, model, IMEI, fault, price, expense, isFinish, isTake, seNumb
  const [id, setId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [IMEI, setIMEI] = useState<string>('')
  const [fault, setFault] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [expense, setExpense] = useState<number>(0)
  const [isFinish, setIsFinish] = useState<string>('repairing')
  const [isTake, setIsTake] = useState<boolean>(false)
  const [seNumb, setSeNumb] = useState<number>(0)
  const [createDate, setCreateDate] = useState<string>('')

  const handleDeleteCus = async (): Promise<void> => {
    try {
      const res = await axios.delete(`http://${host}:3010/api/customers/${id}`)
      if (res.data?.success) {
        toast.success(res.data.message)
        setDetail(false)
      }
    } catch (error) {
      console.error(`[client] error: `, error)
    }
  }

  const handleDetail = async (cus: Customer): Promise<void> => {
    try {
      setDetail(true)

      setId(cus._id)
      setName(cus.name)
      setModel(cus.model)
      setIMEI(cus.IMEI)
      setFault(cus.fault)
      setPrice(cus.price)
      setExpense(cus.expense)
      setIsFinish(cus.isFinish)
      setIsTake(cus.isTake)
      setSeNumb(cus.seNumb)
      setCreateDate(cus.createdAt)
    } catch (error) {
      console.error(`[client] error: `, error)
      toast.error('fail')
    }
  }

  const handleUpdateCus = async (): Promise<void> => {
    const updateCus = { name, model, IMEI, fault, price, expense, isFinish, isTake }
    try {
      await axios.put(`http://${host}:3010/api/customers/${id}`, updateCus)
      setDetail(false)
      toast.success('success')
    } catch (error) {
      console.error(`[client] error: `, error)
      toast.error('Fail to update')
    }
  }

  return (
    <div className="w-full h-full">
      <header className="flex items-center justify-between p-1">
        <span />
        <label className="search_customer ">
          <input
            type="text"
            className={input_md}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={btn_md}>search</button>
        </label>
        <div className="flex gap-0.5">
          {searchMenu.map((menu) => (
            <button
              key={menu}
              onClick={() => setSearchBy(menu)}
              className={`${btn_md} ${searchBy == menu && `bg-stone-300`}`}
            >
              {menu}
            </button>
          ))}
        </div>
      </header>

      <main className="TABLE p-1.5">
        {customers.length == 0 && (
          <p className="w-full h-80 flex items-center justify-center text-4xl font-bold">No Data</p>
        )}
        {customers.length > 0 && (
          <article>
            <section className="flex items-center justify-between font-semibold text-white border-b border-stone-300 pb-1">
              <span className="bg-stone-300 p-1.5 rounded-xl text-center text-black ">
                Date: 20.1.2020
              </span>
              <span className="bg-stone-500 p-1.5 rounded-xl text-center">2</span>
              <span className="bg-green-500 p-1.5 rounded-xl text-center">2</span>
              <span className="bg-red-500 p-1.5 rounded-xl text-center">2</span>
            </section>

            <section>
              {customers.length > 0 &&
                customers.map((cus, index) => (
                  <div
                    onClick={() => handleDetail(cus)}
                    key={cus._id}
                    className="p-1 flex items-center gap-1.5 hover:bg-stone-300"
                  >
                    <span className="w-1/10">{index + 1}.</span>
                    <span className="w-2/10">{cus.name}</span>
                    <span className="w-2/10">{cus.model}</span>
                    <span className="w-2/10">{cus.IMEI}</span>
                    <span className="w-2/10">{cus.fault}</span>
                    <span className="w-2/10">{cus.seNumb}</span>
                  </div>
                ))}
            </section>
          </article>
        )}

        {/* --------------------------Customer Detail ------------------------ */}
        {detail && (
          <div className="w-full h-full absolute top-0 left-0 bg-stone-700 rounded-xl p-2 text-white">
            <header className="flex items-center justify-between">
              <div>
                <button onClick={() => setDetail(false)} className={btn_md}>
                  <ArrowLeft />
                </button>
              </div>
              <h1 className="text-2xl font-bold font-serif">Customer Detail</h1>
              <span />
            </header>

            <main className="flex gap-2 mt-2 w-full h-80 p-2">
              <article className="w-1/2 h-full border rounded-xl flex items-center justify-center text-4xl">
                soon
              </article>

              <article className="w-1/2 h-full border rounded-xl p-1.5">
                <label className="text-lg font-semibold p-1 flex items-center justify-between">
                  <span>id: {seNumb}</span>
                  <span>{createDate}: data</span>
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="text"
                    className={btn_md}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p>name</p>
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="text"
                    className={btn_md}
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                  <p>model</p>
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="text"
                    className={btn_md}
                    value={IMEI}
                    onChange={(e) => setIMEI(e.target.value)}
                  />
                  <p>IMEI</p>
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="text"
                    className={btn_md}
                    value={fault}
                    onChange={(e) => setFault(e.target.value)}
                  />
                  <p>fault</p>
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="number"
                    className={btn_md}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  <p>price</p>
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="number"
                    className={btn_md}
                    value={expense}
                    onChange={(e) => setExpense(Number(e.target.value))}
                  />
                  <p>expense</p>
                </label>
                <label className="flex items-center gap-2.5 mt-2">
                  <select
                    className="text-black bg-stone-300 mt-1 rounded-lg text-center"
                    value={isFinish}
                    onChange={(e) => setIsFinish(e.target.value)}
                  >
                    <option value="finish">finish</option>
                    <option value="repairing">repairing</option>
                    <option value="fail">fail</option>
                  </select>

                  <div className="flex gap-2">
                    <span
                      className={`w-6 h-6 bg-green-500 rounded-full hover:cursor-pointer ${isTake && `border-2`}`}
                      onClick={() => setIsTake(true)}
                    />
                    <span
                      className={`w-6 h-6 bg-red-500 rounded-full hover:cursor-pointer ${!isTake && `border-2`}`}
                      onClick={() => setIsTake(false)}
                    />
                  </div>
                </label>
              </article>
            </main>

            <footer className="w-full h-20 border rounded-xl flex items-center justify-center">
              <div className="flex gap-2">
                <Link to="/print" className={btn_md_success}>
                  <Printer />
                </Link>
                <button className={btn_md_success} onClick={() => handleUpdateCus()}>
                  <Pencil />
                </button>
                <button className={btn_md_error} onClick={() => handleDeleteCus()}>
                  <Trash />
                </button>
              </div>
            </footer>
          </div>
        )}
      </main>
    </div>
  )
}
