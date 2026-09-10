import { btn_md } from '@renderer/components/button/btn'
import { select_md } from '@renderer/components/select/select'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import '../assets/print.css'

type Printer = {
  name: string
}

export default function InvoiceView(): React.JSX.Element {
  const [printers, setPrinters] = useState([])
  const [selectPrinter, setSelectPrinter] = useState<string>('')
  const [pageSize, setPageSize] = useState('A4')

  const paperSize = ['A4', 'A5']

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const res = await window.printer.getPrinter()
      setPrinters(res)
    }
    fetch()
  }, [])

  const handlePrint = async (): Promise<void> => {
    try {
      await window.printer.print({
        printerName: selectPrinter,
        pageSize: pageSize
      })
    } catch (error) {
      console.error(`[print] error: `, error)
      toast.error(`fail to print`)
    }
  }

  return (
    <div className={`w-[148] h-[210] flex flex-col items-center justify-center print:m-0`}>
      <main className="w-120 h-160 border rounded-xl p-1.5">
        <header className={`w-full p-1.5 pb-2.5 flex items-center`}>
          <select
            className={select_md}
            value={selectPrinter}
            onChange={(e) => setSelectPrinter(e.target.value)}
          >
            {printers.map((printer: Printer) => (
              <option key={printer.name} value={printer.name}>
                {printer.name}{' '}
              </option>
            ))}
          </select>
          <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
            {paperSize.map((size) => (
              <option className={select_md} key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <button className={btn_md} onClick={() => handlePrint()}>
            Print
          </button>
        </header>

        <div className="w-full h-130 border flex items-center justify-center font-bold text-2xl">
          test
        </div>

        <footer className="text-center w-full p-1.5 pt-2.5">footer</footer>
      </main>
    </div>
  )
}
