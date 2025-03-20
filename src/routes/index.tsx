import { Routes, Route } from 'react-router-dom'
import TransferPage from '../pages/TransferPage'
import App from '../pages/HomePage/App.container'
import NotFoundPage from '../pages/NotFoundPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/transfer" element={<TransferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
