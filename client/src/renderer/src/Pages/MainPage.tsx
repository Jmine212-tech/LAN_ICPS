import AddCusForm from '@renderer/components/AddCusForm'
import CusList from '../components/Cus.List'
import { useState } from 'react'
import { btn_md } from '@renderer/components/button/btn'

export default function MainPage(): React.JSX.Element {
  const [toggleForm, setToggleForm] = useState(false)

  const handleToggleForm = (): void => {
    if (toggleForm) {
      setToggleForm(false)
    } else {
      setToggleForm(true)
    }
  }
  return (
    <div className="w-full h-full relative">
      <header className="sticky top-0 p-1.5 flex justify-between bg-stone-700 rounded-xl text-stone-200">
        <span />
        <h1 className="text-2xl text-center font-serif font-bold">CUSTOMER LIST</h1>
        <nav className="flex items-center justify-center"> 
          <button
            className={btn_md}
            onClick={() => {
              handleToggleForm()
            }}
          >
            Add
          </button>
        </nav>
      </header>

      <main className="w-full h-100 mt-2 border overflow-scroll scrollbar-none rounded-xl">
        {toggleForm && <AddCusForm />}
        {!toggleForm && <CusList />}
      </main>
    </div>
  )
}
