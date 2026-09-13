import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { input_md } from '../input/input'
import { btn_md } from '../button/btn'
import UpdateCusForm from './Cus.UpdateForm'
import { customer } from '@renderer/env'
import CusContext from '@renderer/context/CusContext'
import HostContext from '@renderer/context/HostContext'
import axios from 'axios'
import Calendar from 'react-calendar'
import { forDate } from '../utils/Format.Date'

type CusGroup = {
  _id: string
  count: number
  success: string
  fail: string
  customers: customer[]
}

export default function CusList(): React.JSX.Element {
  const customers = useContext(CusContext)
  const host = useContext(HostContext)
  const searchMenu = ['id', 'name', 'model', 'IMEI', 'fault', 'repairing']
  const [CusGroup, setCusGroup] = useState<CusGroup[]>([])
  const [selectDate, setSelectDate] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [searchBy, setSearchBy] = useState<string>('id')
  const [search, setSearch] = useState<string>('')
  const [detail, setDetail] = useState<customer | null>(null)
  const [calendar, setCalendar] = useState<boolean>(false)
  // ------------ handle Select Date
  const handleSelectDate = (d): void => {
    const formatDate = forDate(d)
    setSelectDate(formatDate)
  }

  // ------------ handle reset date
  const handleResetDate = (): void => {
    const newDate = new Date()
    const forDate_newDate = forDate(newDate)
    setDate(forDate_newDate)
    setSelectDate('')
    setCalendar(false)
  }
  // ---------- handle cancel select date
  const handleCancelSelectDate = (): void => {
    setSelectDate('')
    setCalendar(false)
  }
  // ------- handle confirm select Date
  const handleConfirmSelectDate = (): void => {
    setDate(selectDate)
    toast.success(`Date: ${selectDate}`)
    setSelectDate('')
    setCalendar(false)
  }
  // ------------ init repair list
  const repairList = CusGroup.find((prev) => prev._id == date) // customer Data
  const repairCount = repairList?.count
  const repairSuccess = repairList?.success
  const repairFail = repairList?.fail
  const repairCus = repairList?.customers || []

  // ------------ handle customer's detail
  const handleDetail = async (cus: customer): Promise<void> => {
    try {
      setDetail({
        _id: cus._id,
        name: cus.name,
        model: cus.model,
        IMEI: cus.IMEI,
        fault: cus.fault,
        price: cus.price,
        expense: cus.expense,
        isFinish: cus.isFinish,
        isTake: cus.isTake,
        seNumb: cus.seNumb,
        createdAt: cus.createdAt
      })
    } catch (error) {
      console.error(`[client] error: `, error)
      toast.error('fail')
    }
  }

  // ----------- search function
  let searchCus
  switch (searchBy) {
    case 'id':
      searchCus = customers.filter((prev) => String(prev.seNumb) == search)
      break
    case 'name':
      searchCus = customers.filter((prev) => prev.name?.includes(search))
      break
    case 'model':
      searchCus = customers.filter((prev) => prev.model?.includes(search))
      break
    case 'IMEI':
      searchCus = customers.filter((prev) => prev.IMEI?.includes(search))
      break
    case 'fault':
      searchCus = customers.filter((prev) => prev.fault?.includes(search))
      break
    case 'repairing':
      searchCus = customers.filter((prev) => prev.isFinish == 'repairing')
      break
  }

  // ------------------ fetch data
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const res = await axios.get(`http://${host}:3010/api/customers/group`)
      if (res.data?.success) {
        setCusGroup(res.data.list)
      }
      const newDate = new Date()
      const DefDate = forDate(newDate)
      setDate(DefDate)
    }
    fetch()
  }, [customers])

  // -------------------- RENDER ------------------------------
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
          <button className={btn_md} onClick={() => setSearch('')}>
            clear
          </button>
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
      {/* -------------------------- main content -------------------------- */}
      <main className="TABLE p-1.5">
        {/* ------------- search customer --------------- */}
        {search !== '' && (
          <ul className="w-full h-80 bg-stone-700 overflow-y-scroll scrollbar-none p-1.5">
            {searchCus.length == 0 && (
              <p className="w-full h-full text-white flex items-center justify-center font-bold text-2xl">
                customer not found
              </p>
            )}
            {searchCus.length > 0 &&
              searchCus.map((cus, index) => (
                <li
                  key={cus._id}
                  onClick={() => handleDetail(cus)}
                  className="text-white hover:bg-stone-500 p-1.5 flex items-center justify-between"
                >
                  <span>{index + 1}. </span>
                  <span>{cus.name}</span>
                  <span>{cus.model}</span>
                  <span>{cus.fault}</span>
                  <span>{cus.seNumb}</span>
                </li>
              ))}
          </ul>
        )}
        {/* --------------- customer's lists -------------------- */}
        {CusGroup?.length == 0 && (
          <p className="w-full h-80 flex items-center justify-center text-4xl font-bold">No Data</p>
        )}
        {CusGroup?.length > 0 && search == '' && (
          <article>
            <section className="flex items-center justify-between font-semibold text-white border-b border-stone-300 pb-1">
              {/* ------------ select date -------------- */}
              <div className="flex gap-1.5 items-center">
                {selectDate == '' && (
                  <button
                    className="bg-stone-500 p-1.5 rounded-xl font-bold"
                    disabled={calendar}
                    onClick={() => (calendar ? setCalendar(false) : setCalendar(true))}
                  >
                    {date}
                  </button>
                )}
                {selectDate !== '' && (
                  <button
                    className="bg-stone-500 p-1.5 rounded-xl font-bold"
                    disabled={calendar}
                    onClick={() => (calendar ? setCalendar(false) : setCalendar(true))}
                  >
                    {selectDate}
                  </button>
                )}
              </div>
              {calendar && (
                <div className="absolute top-0 bg-stone-700 p-2.5 translate-y-35 rounded-xl">
                  <Calendar value={selectDate} onChange={(date) => handleSelectDate(date)} />
                  <div className="flex justify-between items-center p-1.5">
                    {/* -- cancel select date -- */}
                    <button className={`${btn_md}`} onClick={() => handleCancelSelectDate()}>
                      cancel
                    </button>
                    {/* -- confirm select date -- */}
                    <button className={`${btn_md}`} onClick={() => handleConfirmSelectDate()}>
                      Go
                    </button>
                    {/* -- reset to prev date -- */}
                    <button className={`${btn_md}`} onClick={() => handleResetDate()}>
                      reset
                    </button>
                  </div>
                </div>
              )}
              {/* -- count -- */}
              <span className="bg-stone-500 p-1.5 rounded-xl text-center">{repairCount}</span>
              {/* -- repair success -- */}
              <span className="bg-green-500 p-1.5 rounded-xl text-center">{repairSuccess}</span>
              {/* -- repair failt -- */}
              <span className="bg-red-500 p-1.5 rounded-xl text-center">{repairFail}</span>
            </section>

            <section>
              {repairCus?.length == 0 && (
                <p className="w-full h-80 flex items-center justify-center font-bold text-2xl">
                  No Data
                </p>
              )}
              {repairCus?.length > 0 &&
                repairCus.map((cus, index) => (
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
        {detail && <UpdateCusForm data={{ detail, setDetail, host }} />}
      </main>
    </div>
  )
}
