import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MainPage from './Pages/MainPage'

export default function App(): React.JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
