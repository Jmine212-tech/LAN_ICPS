import { btn_md } from '@renderer/components/button/btn'
import { NavLink, useLocation } from 'react-router-dom'
import { PhoneIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function InvoiceView(): React.JSX.Element {
  const location = useLocation()
  const cusInfo = location.state?.cusInfo

  const cus = cusInfo?.name ?? ''
  const model = cusInfo?.model ?? ''
  const fault = cusInfo?.fault ?? ''
  const price = cusInfo?.price ?? 0
  const seNumb = cusInfo?.seNumb ?? 0
  const createdAt = cusInfo?.createdAt ?? ''

  // submit print
  const handlePrint = async (): Promise<void> => {
    try {
      await window.printer.print({ silent: false })
    } catch (error) {
      console.error(`[print] error: `, error)
      toast.error('something wrong')
    }
  }

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
        <div id="CONTENT" className="w-full h-130 border-stone-300 pl-2 pr-2">
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
                  Sim: <span className="w-5 h-5 border rounded-full" />
                </p>
                <p className="font-bold flex gap-4">
                  cover: <span className="w-5 h-5 border rounded-full" />
                </p>
                <p className="w-35 h-10 border rounded-2xl"></p>
              </div>
            </label>
          </section>
          {/* ---- price ---- */}
          <section className="w-full mt-2 flex items-center justify-end">
            <p className="border border-stone-400 p-2.5 rounded-2xl">
              Total:{' '}
              {price == 0 ? <span>...............................</span> : <span>{price}ks</span>}
            </p>
          </section>

          {/* ------ confirm payment ---------- */}
          <section className="w-full h-30 border border-dotted border-stone-400 mt-2.5 rounded-xl flex items-center justify-center">
            <p className="text-stone-400 font-bold">CONFIRM</p>
          </section>

          {/* ------ contact us -------- */}
          <section className="mt-2">
            <p className="text-center">------------ Contact us ---------------</p>
            <div className="flex items-center p-1.5">
              <p className="text-sm flex gap-2">
                <PhoneIcon /> <span className="font-bold">09 448 080 507</span>
              </p>
            </div>
          </section>
        </div>
        {/* -------------------- footer --------------------- */}
        <footer className="mt-2 border-t border-stone-400">
          <p className="text-center font-semibold">Icrazy Phone Service</p>
          <p className="font-bold">Warning: </p>
        </footer>
      </main>
    </div>
  )
}
