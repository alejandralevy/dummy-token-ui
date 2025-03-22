import { Outlet } from 'react-router-dom'
import { Navbar, Page, Footer } from 'decentraland-ui'

const MainLayout = () => {
  return (
    <>
      <Navbar activePage="wallet" />
      <Page>
        <Outlet />
      </Page>
      <Footer />
    </>
  )
}

export default MainLayout
