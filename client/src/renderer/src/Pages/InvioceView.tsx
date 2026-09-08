import { btn_md } from '@renderer/components/button/btn'
import { Link } from 'react-router-dom'

export default function InvoiceView(): React.JSX.Element {
  const handlePrint = async () => {
    //@ts-ignore
    await window.update.getPreview('print', 'invoiceView.pdf')
  }

  return (
    // Fixed A4 dimensions for pixel-perfect layout: 210mm x 297mm
    <div className="w-[210mm] min-h-[297mm] p-10 mx-auto bg-white text-slate-800 antialiased box-border">
      {/* hide when print */}
      <div className="print:hidden">
        <Link className={btn_md} to={'/'}>
          back
        </Link>
        <button className={btn_md} onClick={() => handlePrint()}>
          print
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600">INVOICE</h1>
          <p className="text-xs text-slate-500 mt-1">Ref: #INV-2026-089</p>
        </div>
        <div className="text-right text-sm">
          <p className="font-semibold text-slate-900">Acme Corporation</p>
          <p className="text-slate-500">Yangon, Myanmar</p>
          <p className="text-slate-500">billing@acme.corp</p>
        </div>
      </div>

      {/* Bill To Info */}
      <div className="mt-8 flex justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Billed To
          </span>
          <p className="text-sm font-semibold text-slate-900 mt-1">Jane Doe</p>
          <p className="text-sm text-slate-500">Apex Software Ltd.</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Issue Date
          </span>
          <p className="text-sm text-slate-700 mt-1">September 7, 2026</p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-center">Qty</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            <tr>
              <td className="py-4 px-4 font-medium text-slate-800">React & Electron Desktop UI</td>
              <td className="py-4 px-4 text-center text-slate-600">1</td>
              <td className="py-4 px-4 text-right text-slate-600">$1,200.00</td>
              <td className="py-4 px-4 text-right font-semibold text-slate-900">$1,200.00</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-medium text-slate-800">Tailwind CSS Print Styling</td>
              <td className="py-4 px-4 text-center text-slate-600">1</td>
              <td className="py-4 px-4 text-right text-slate-600">$450.00</td>
              <td className="py-4 px-4 text-right font-semibold text-slate-900">$450.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-6 flex justify-end">
        <div className="w-64 space-y-2 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>$1,650.00</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
            <span>Total Due</span>
            <span className="text-indigo-600">$1,650.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
