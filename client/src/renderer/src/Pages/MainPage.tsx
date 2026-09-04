import AddCusForm from '../components/AddCusForm'
import CusList from '../components/Cus.List'
import AutoUpdate from "../components/AutoUpdate"

export default function MainPage(): React.JSX.Element {
  return (
    <div className="w-full">
      Main
      <AutoUpdate />
      <AddCusForm />
      <CusList />
    </div>
  )
}
