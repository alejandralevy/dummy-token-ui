import { Routes, Route } from 'react-router-dom'
import TransferPage from '../pages/TransferPage/TransferPage.container'
import HomePage from '../pages/HomePage/HomePage.container'
import NotFoundPage from '../pages/NotFoundPage'
import MainLayout from '../components/MainLayout'
import TransferSuccessPage from '../pages/TransferSuccessPage'

import { ROUTES } from '../constants/routes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.TRANSFER} element={<TransferPage />} />
        <Route path={ROUTES.TRANSFER_SUCCESS} element={<TransferSuccessPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
