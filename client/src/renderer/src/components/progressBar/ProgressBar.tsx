export default function ProgressBar({ percent }: { percent: number }): React.JSX.Element {
  
  return (
    <div className="Box w-80 h-5 border">
      <span
        style={{
          width: `${percent}%`
        }}
        className={`h-full block bg-linear-to-r from-orange-500 via-rose-500 to-red-500 transition-all duration-750`}
      />
    </div>
  )
}
