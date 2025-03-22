import { Routes, Route } from 'react-router-dom'
import TransferPage from '../pages/TransferPage/TransferPage.container'
import App from '../pages/HomePage/App.container'
import NotFoundPage from '../pages/NotFoundPage'
import MainLayout from '../components/MainLayout'
import TransferSuccessPage from '../pages/TransferSuccessPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transfer/success" element={<TransferSuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
