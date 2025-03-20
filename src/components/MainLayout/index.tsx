import React, { ReactNode } from 'react'
import { Footer, Navbar, Page } from 'decentraland-ui'

type MainLayoutProps = { className?: string; children: ReactNode }

//TODO see if I can reuse the navbar with Active Page and pass a prop here
const MainLayout: React.FC<MainLayoutProps> = ({ className, children }) => {
  return (
    <>
      <Navbar activePage="Wallet" />
      <Page className={className}>{children}</Page>
      <Footer />
    </>
  )
}

export default MainLayout
