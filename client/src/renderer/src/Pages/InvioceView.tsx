import { btn_md } from '@renderer/components/button/btn'
import { NavLink, useLocation } from 'react-router-dom'
import { Check, PhoneIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

export default function InvoiceView(): React.JSX.Element {
  const location = useLocation()
  const cusInfo = location.state?.cusInfo

  const cus = cusInfo?.name ?? ''
  const model = cusInfo?.model ?? ''
  const fault = cusInfo?.fault ?? ''
  const price = cusInfo?.price ?? 0
  const seNumb = cusInfo?.seNumb ?? 0
  const createdAt = cusInfo?.createdAt ?? ''

  const [sim, setSim] = useState(false)
  const [cover, setCover] = useState(false)
  const [engNotice, setEngNotice] = useState(true)

  // submit print
  const handlePrint = async (): Promise<void> => {
    try {
      await window.printer.print({ pageSize: 'A5' })
    } catch (error) {
      console.error(`[print] error: `, error)
      toast.error('something wrong')
    }
  }
  // --------------- fetch data
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      //@ts-ignore
      const res = await window.printer.getPrinter()
      console.log(res)
    }
    fetch()
  }, [])
  // ----------------- render content ------------------
  return (
    <div className={`min-w-[148mm] min-h-[210mm] m-0 flex flex-col items-center`}>
      <div className="print:hidden flex justify-center gap-2.5 sticky top-0 bg-black text-white w-full p-1">
        <NavLink className={`${btn_md} print:hidden`} to={'/'}>
          Back
        </NavLink>
        <button className={`${btn_md} print:hidden`} onClick={() => handlePrint()}>
          print
        </button>
      </div>
      <main className={`w-[135mm] h-[180mm] border p-1.5 rounded-2xl`}>
        {/* -------------------- header ------------------------- */}
        <header className="flex items-center justify-between pb-2.5 border-b border-stone-400">
          <span />
          <h1 className="w-80 bg-black text-white text-center font-bold rounded-xl font-serif text-2xl">
            ICPS
          </h1>
          <div className="flex gap-2.5 pr-5">
            <span className="w-4 h-4 bg-black rounded-full" />
            <span className="w-4 h-4 bg-black rounded-full" />
            <span className="w-4 h-4 bg-black rounded-full" />
          </div>
        </header>
        {/* ----------------- MAIN content -------------------- */}
        <div id="CONTENT" className="w-full border-stone-300 pl-2 pr-2">
          <section className="flex items-center justify-between p-1.5">
            <p className="text-lg">
              date: <span className="font-bold">{createdAt}</span>
            </p>
            {/* -- seNumb -- */}
            <p className="text-lg border border-stone-400 p-1.5 rounded-2xl">
              id: <span className="font-bold">{seNumb}</span>
            </p>
          </section>
          <section className="w-full h-50 border border-stone-300 rounded-xl">
            <p className="h-1/5 text-center font-semibold text-lg font-serif">Customer - Info</p>
            <label className="w-full h-4/5 p-2">
              {/* -- name & model -- */}
              <div className="border-b border-dotted pt-1 pl-2 pr-2 flex justify-between">
                <p className="font-bold flex gap-4">
                  name: <span className="font-normal">{cus}</span>
                </p>
                <p className="font-bold flex gap-4">
                  model: <span className="font-normal">{model}</span>
                </p>
              </div>
              {/* -- fault & other -- */}
              <div className="border-b border-dotted pt-1 pl-2 pr-2 flex justify-between">
                <p className="font-bold flex gap-4">
                  fault: <span className="font-normal">{fault}</span>
                </p>
              </div>
              {/* -- options -- */}

              <div className="pt-1.5 pl-2 pr-2 grid grid-flow-row grid-cols-3">
                <p className="font-bold flex gap-4">
                  Sim:{' '}
                  <span
                    className="w-5 h-5 border rounded-full flex items-center"
                    onClick={() => (sim ? setSim(false) : setSim(true))}
                  >
                    {' '}
                    {sim && <Check />}{' '}
                  </span>
                </p>
                <p className="font-bold flex gap-4">
                  cover:{' '}
                  <span
                    className="w-5 h-5 border rounded-full flex items-center"
                    onClick={() => (cover ? setCover(false) : setCover(true))}
                  >
                    {' '}
                    {cover && <Check />}{' '}
                  </span>
                </p>
                <p className="w-35 h-10 border rounded-2xl"></p>
              </div>
            </label>
          </section>
          {/* ---- price ---- */}
          <section className="w-full mt-1 flex items-center justify-end">
            <p className="border border-stone-400 p-2.5 rounded-2xl">
              Total:{' '}
              {price == 0 ? <span>...............................</span> : <span>{price}ks</span>}
            </p>
          </section>

          {/* ------ confirm payment ---------- */}
          <section className="w-full h-15 border border-dotted border-stone-400 mt-1 rounded-xl flex items-center justify-center">
            <p className="text-stone-400 font-bold">CONFIRM</p>
          </section>

          {/* ------ contact us -------- */}
          <section className="mt-1">
            <p className="text-center">------------ Contact us ---------------</p>
            <div className="flex items-center p-1.5">
              <p className="text-sm flex gap-2">
                <PhoneIcon /> <span className="font-bold">09 448 080 507</span>
              </p>
            </div>
          </section>
        </div>
        {/* -------------------- footer --------------------- */}
        <footer className=" w-full border-t border-stone-700 border-dotted text-sm">
          <button
            className="text-lg font-semibold border-b active:text-red-500 hover:cursor-pointer"
            onClick={() => (engNotice ? setEngNotice(false) : setEngNotice(true))}
          >
            Notice:{' '}
          </button>
          {/* -- notice in eng -- */}
          {!engNotice && (
            <div className="pl-2 text-sm">
              <p>1. When coming to collect your phone, please bring the receipt with you</p>
              <p>
                2. We will not be responsible at all for phones left uncollected for more than one
                month
              </p>
              <p>
                3. We will only be responsible for the issue/problem that was reported and repaired
              </p>
              <p>
                4. If there is any important data stored on your phone, please inform us in advance.
              </p>
            </div>
          )}
          {/* -- notice in Mya -- */}
          {engNotice && (
            <div className="pl-2 text-sm flex flex-col">
              <p>၁. ဖုန်းလာရောက်ရွေးယူပါက ဘောင်ချာယူလာပေးပါရန်</p>
              <p>၂. (၁)လ ကျော်ဖုန်းများအား (လုံးဝ) တာဝန်မယူပါ</p>
              <p>၃. လာရောက်ပြုပြင်သောပြစ်ချက်ကိုသာ တာဝန်ယူမည်</p>
              <p>၄. မိမိဖုန်းအတွင်းရှိ အရေးကြီးသော Data ရှိလျှင် ကြိုတင် သတိပေးပါရန်</p>
            </div>
          )}
        </footer>
      </main>
    </div>
  )
}
