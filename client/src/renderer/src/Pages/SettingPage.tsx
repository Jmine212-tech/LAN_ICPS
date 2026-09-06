import AutoUpdate from '@renderer/components/AutoUpdate'
import { useState } from 'react'

export default function Setting(): React.JSX.Element {
  const [selectMenu, setSelectMenu] = useState('update')

  const MENU = ['update']
  return (
    <div className="w-full h-full flex">
      <ul className="MENU w-1/5 h-full border-r">
        {MENU.length > 0 &&
          MENU.map((item) => (
            <li
              key={item}
              className="p-1.5 text-center border-b border-stone-300 hover:cursor-pointer"
              onClick={() => setSelectMenu(item)}
            >
              {item}
            </li>
          ))}
      </ul>
      <main>{selectMenu == 'update' && <AutoUpdate />}</main>
    </div>
  )
}
