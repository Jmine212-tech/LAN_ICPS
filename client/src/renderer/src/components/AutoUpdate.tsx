import { useEffect, useState } from 'react'
import { btn_md } from './button/btn'

export default function AutoUpdate(): React.JSX.Element {
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [progress, setProgress] = useState(0)

  const fetch = async (): Promise<void> => {
    try {
      window.update.onCheck()

      await window.update.onStatus((res) => {
        if (res.status == 'check') {
          setMessage(res.message)
          setStatus(res.status)
        } else if (res.status == 'available') {
          setMessage(res.message)
          setStatus(res.status)
          console.log(`[update] info: `, res.info)
        } else if (res.status == 'notAvailable') {
          setMessage(res.message)
          setStatus(res.status)
          console.log(`[update] info: `, res.info)
        } else if (res.status == 'error') {
          setMessage(res.message)
          setStatus(res.status)
          console.error(`[update] error: `, res.error)
        } else if (res.status == 'progress') {
          setMessage(res.message)
          setStatus(res.status)
          setProgress(res.progress?.percent)
          setStatus(res.status)
          console.log(res.progress)
        } else if (res.status == 'downloaded') {
          setMessage(res.message)
          setStatus(res.status)
          console.log(`[update] info: `, res.info)
        }
      })
    } catch (error) {
      console.error(`[update] error: `, error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleUpdate = (): void => {
    window.update.onDownload()
  }

  return (
    <div className="p-2.5">
      {status}
      {message == '' ? <p>message: no active</p> : <p>message: {message}</p>}
      {progress > 0 && <p>progress: {progress} </p>}
      <button className={btn_md} onClick={() => handleUpdate()}>
        download
      </button>
    </div>
  )
}
