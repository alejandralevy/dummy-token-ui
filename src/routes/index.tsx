import { Routes, Route } from 'react-router-dom'
import TransferPage from '../pages/TransferPage/TransferPage.container'
import HomePage from '../pages/HomePage/HomePage.container'
import NotFoundPage from '../pages/NotFoundPage'
import MainLayout from '../components/MainLayout'
import TransferSuccessPage from '../pages/TransferSuccessPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transfer/success" element={<TransferSuccessPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
