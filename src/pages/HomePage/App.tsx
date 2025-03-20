import React, { useEffect } from 'react'
import { Center } from 'decentraland-ui'
import { Props } from './App.types'
import './App.css'
import MainLayout from '../../components/MainLayout'
import WalletInfo from '../../components/WalletInfo'

//TODO add decentraland UI componentes
const App: React.FC<Props> = ({ address, isConnected, onConnect, isConnecting, error, balance }) => {
  useEffect(() => {
    if (!isConnected) {
      onConnect()
    }
  }, [])

  const renderContent = () => {
    if (address && balance) {
      return <WalletInfo address={address} balance={balance} />
    }

    if (isConnecting) {
      return <p>Connecting wallet...</p>
    }

    if (!isConnected) {
      return error ? <p className="error">{error}</p> : null
    }

    return null
  }

  return (
    <>
      <MainLayout className="App">
        <Center>{renderContent()}</Center>
      </MainLayout>
    </>
  )
}

export default App
