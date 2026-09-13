import { useEffect, useState } from 'react'
import { ArrowLeft, Pencil, Printer, Trash } from 'lucide-react'
import { btn_md, btn_md_error, btn_md_success } from '../button/btn'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function UpdateCusForm({
  data
}: {
  data: { detail; setDetail; host }
}): React.JSX.Element {
  const { detail, setDetail, host } = data
  // id, name, model, IMEI, fault, price, expense, isFinish, isTake, seNumb

  const [id, setId] = useState<string>(detail._id)
  const [name, setName] = useState<string>(detail.name)
  const [model, setModel] = useState<string>(detail.model)
  const [IMEI, setIMEI] = useState<string>(detail.IMEI)
  const [fault, setFault] = useState<string>(detail.fault)
  const [price, setPrice] = useState<number>(detail.price)
  const [expense, setExpense] = useState<number>(detail.expense)
  const [isFinish, setIsFinish] = useState<string>(detail.isFinish)
  const [isTake, setIsTake] = useState<boolean>(detail.isTake)
  const [seNumb, setSeNumb] = useState<number>(detail.seNumb)
  const [createdAt, setCreatedAt] = useState(detail.createdAt)

  // navigate
  const navigate = useNavigate()

  // ------------ handle delete customer's list
  const handleDeleteCus = async (): Promise<void> => {
    try {
      const res = await axios.delete(`http://${host}:3010/api/customers/${id}`)
      if (res.data?.success) {
        toast.success(res.data.message)
      }
      toast.success('deleted', id)
    } catch (error) {
      console.error(`[client] error: `, error)
    } finally {
      setDetail(null)
    }
  }

  // -------------- handle update customer
  const handleUpdateCus = async (): Promise<void> => {
    const updateCus = { name, model, IMEI, fault, price, expense, isFinish, isTake }
    try {
      await axios.put(`http://${host}:3010/api/customers/${id}`, updateCus)
      toast.success('updated')
      setId('')
      setName('')
      setModel('')
      setIMEI('')
      setFault('')
      setPrice(0)
      setExpense(0)
      setIsFinish('')
      setIsTake(false)
      setSeNumb(0)
      setCreatedAt('')
    } catch (error) {
      console.error(`[client] error: `, error)
      toast.error('Fail to update')
    } finally {
      setDetail(null)
    }
  }
  // ----------------------- handle customer info to InvoiceView file
  const handleToPrint = async (): Promise<void> => {
    console.log(createdAt)
    try {
      navigate('/print', {
        state: {
          cusInfo: {
            id,
            name,
            model,
            IMEI,
            fault,
            price,
            expense,
            isFinish,
            isTake,
            seNumb,
            createdAt
          }
        }
      })
    } catch (error) {
      console.error(`[handleCusToInvoiceView] error: `, error)
    }
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-stone-700 rounded-xl p-2 text-white">
      <header className="flex items-center justify-between">
        <div>
          <button onClick={() => setDetail(false)} className={btn_md}>
            <ArrowLeft />
          </button>
        </div>
        <h1 className="text-2xl font-bold font-serif">Detail of customer</h1>
        <span />
      </header>

      <main className="flex gap-2 mt-2 w-full h-80 p-2">
        <article className="w-1/2 h-full border rounded-xl flex items-center justify-center text-4xl">
          soon
        </article>

        <article className="w-1/2 h-full border rounded-xl p-1.5">
          <label className="text-lg font-semibold p-1 flex items-center justify-between">
            <span>id: {seNumb}</span>
            <span>{createdAt}: data</span>
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
          <button className={btn_md_success} onClick={() => handleToPrint()}>
            <Printer />
          </button>
          <button className={btn_md_success} onClick={() => handleUpdateCus()}>
            <Pencil />
          </button>
          <button className={btn_md_error} onClick={() => handleDeleteCus()}>
            <Trash />
          </button>
        </div>
      </footer>
    </div>
  )
}
