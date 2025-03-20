import { Routes, Route } from 'react-router-dom'
import TransferPage from '../pages/TransferPage/TransferPage.container'
import App from '../pages/HomePage/App.container'
import NotFoundPage from '../pages/NotFoundPage'
import MainLayout from '../components/MainLayout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/transfer" element={<TransferPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
