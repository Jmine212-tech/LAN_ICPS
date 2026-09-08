import { serviceData } from '@renderer/assets/data'
import { useEffect, useState } from 'react'
import { select_md } from '../select/select'

export default function ServiceList(): React.JSX.Element {
  const [brand, setBrand] = useState('iphone')
  const [model, setModel] = useState('')
  const [fault, setFault] = useState('lcd')

  const getBrand = serviceData.find((b) => b.logo == brand)
  const getModel = getBrand?.model.find((m) => m.value == model)
  const getFault = getModel?.fault.find((f) => f.value == fault)

  useEffect(() => {
    const fetch = (): void => {
      setModel('')
      setFault('')
    }
    fetch()
  }, [brand])

  return (
    <div className="w-full h-full p-2 flex gap-2">
      {/* ---------------------- edit form ------------------- */}
      <article className="w-3/4 h-full border rounded-xl p-1.5">
        <span className="w-full h-full flex items-center justify-center text-4xl font-bold">
          Soon
        </span>
      </article>
      {/* ----------------------- data form -------------------------- */}
      <article className="w-1/4 h-full border rounded-xl bg-stone-700 flex items-center justify-center">
        <header className="flex flex-col pb-2.5 gap-2.5">
          {/* ---------- read Data ----------- */}
          {serviceData.length == 0 && (
            <p className="w-full h-80 text-4xl font-bold flex items-cetner justify-center">
              No Data
            </p>
          )}
          {/* -- select Brand -- */}
          <select className={select_md} value={brand} onChange={(e) => setBrand(e.target.value)}>
            {serviceData.map((B) => (
              <option key={B.logo} value={B.logo}>
                {B.logo}
              </option>
            ))}
          </select>
          {/* -- select Model -- */}
          <select className={select_md} value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">None</option>
            {getBrand?.model.map((M) => (
              <option key={M.value} value={M.value}>
                {M.value}
              </option>
            ))}
          </select>
          {/* -- select fault -- */}
          <select
            disabled={model == ''}
            className={select_md}
            value={fault}
            onChange={(e) => setFault(e.target.value)}
          >
            <option value="">None</option>
            {getModel?.fault.map((F) => (
              <option key={F.value} value={F.value}>
                {F.value}
              </option>
            ))}
          </select>
          <div className="p-1.5 bg-stone-100 rounded-xl w-full h-25 flex items-center justify-center gap-2">
            price: <span className="text-lg font-bold font-serif">{getFault?.price}</span>
          </div>
        </header>
      </article>
    </div>
  )
}
