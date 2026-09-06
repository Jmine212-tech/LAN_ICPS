import { HashRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import MainPage from './Pages/MainPage'
import Setting from './Pages/SettingPage'
import Dashboard from './Pages/DashboardPage'
import ServicePage from './Pages/ServicePage'

export default function App(): React.JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="service" element={<ServicePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
