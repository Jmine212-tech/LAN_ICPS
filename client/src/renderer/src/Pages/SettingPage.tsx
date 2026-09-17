import AutoUpdate from '@renderer/components/AutoUpdate'
import { btn_md } from '@renderer/components/button/btn'
import { input_sm } from '@renderer/components/input/input'
import { SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useOutletContext } from 'react-router-dom'

type Ui = {
  logo: { mainLogo: string; setMainLogo: SetStateAction<string | any> }
}

export default function Setting(): React.JSX.Element {
  const Ui: Ui = useOutletContext()
  const MENU = ['update', 'edit_UI and Printer', 'dataBase']
  const [selectMenu, setSelectMenu] = useState('update')

  // --------------- Edit Ui
  const [edit, setEdit] = useState(true)
  const [logo, setLogo] = useState(localStorage.getItem('mainLogo') || 'Client')
  // ----------------- handle save Edit Ui
  const handleSaveEditUi = async (): Promise<void> => {
    Ui.logo.setMainLogo(logo)
    localStorage.setItem('mainLogo', logo)
    toast.success('Change Main Logo')
    setEdit(false)
  }

  // ------------ fetch data
  useEffect(() => {
    const fetch = (): void => {
      setEdit(false)
    }
    fetch()
  }, [])

  // ---------------- render Ui --------------------------
  return (
    <div className="w-full h-full flex">
      <ul className="MENU w-1/5 h-full border-r">
        {MENU.length > 0 &&
          MENU.map((item) => (
            <li
              key={item}
              className={`${selectMenu == item && `bg-stone-300`} p-1.5 text-center border-b border-stone-300 hover:cursor-pointer`}
              onClick={() => setSelectMenu(item)}
            >
              {item}
            </li>
          ))}
      </ul>
      {/* ------------------ main ----------------------- */}
      <main className="w-4/5 h-120">
        {/* --------------- auto Update ------------------ */}
        {selectMenu == 'update' && <AutoUpdate />}
        {/* ----------------- edit UI ----------------------- */}
        {selectMenu == 'edit_UI and Printer' && (
          <article className="p-1.5 relative">
            <section className="flex items-center justify-between bg-black text-white p-1.5">
              <button className={btn_md}>Reset</button>
              <button
                className={`${btn_md} ${edit && `bg-stone-300 text-black`}`}
                onClick={() => (edit ? setEdit(false) : setEdit(true))}
              >
                Edit
              </button>
              <button className={btn_md} disabled={!edit} onClick={() => handleSaveEditUi()}>
                Save
              </button>
            </section>
            {/* ----------- select Edit UI and Printer -------------- */}
            <section className="flex gap-1.5 p-1.5">
              {/* -- Edit Ui */}
              <div
                id="EDIT_UI"
                className="w-1/2 h-100 border border-stone-300 rounded-2xl p-1.5 overflow-y-scroll scrollbar-none"
              >
                <h1 className="text-center font-bold text-lg">Edit UI</h1>
                {/* -- change logo */}
                <div id="CHANGE_LOGO" className="border-b border-stone-300 p-1.5">
                  <h3 className="text-lg font-semibold pl-2">MAIN LOGO</h3>
                  <input
                    type="text"
                    disabled={!edit}
                    className={input_sm}
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                  />
                </div>
              </div>
              {/* -- Printer -- */}
              <div
                id="PRINTER"
                className="w-1/2 h-100 border border-stone-300 rounded-2xl p-1.5 overflow-y-scroll scrollbar-none"
              ></div>
            </section>
          </article>
        )}
      </main>
    </div>
  )
}
