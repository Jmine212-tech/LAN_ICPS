import { useState } from 'react'

import ServiceList from '@renderer/components/serviceComponents/ServiceList'

export default function Service(): React.JSX.Element {
  const [opForm, setOpForm] = useState(false)
  const [services, setServices] = useState([''])

  return (
    <div className="w-full h-full">
      <header className="flex w-full justify-between">
        <section className="w-3/4 p-1 border rounded-xl flex justify-center bg-stone-700 text-white">
          soon
        </section>
        <div className='w-1/4 p-1.5 flex justify-center gap-2.5'>
          <span className='w-5 h-5 bg-black rounded-full' />
          <span className='w-5 h-5 bg-black rounded-full' />
          <span className='w-5 h-5 bg-black rounded-full' />
        </div>
      </header>

      <main className="mt-2 w-full h-100">
        {/* ----------------------------- Service lists ----------------------------- */}
        {services.length == 0 && (
          <p className="w-full h-full text-4xl font-bold flex items-center justify-center">
            No Data
          </p>
        )}
        {services.length > 0 && <ServiceList />}
      </main>
    </div>
  )
}
