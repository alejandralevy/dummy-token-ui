import React, { useEffect } from 'react'
import { Button, Center } from 'decentraland-ui'
import { useNavigate } from 'react-router-dom'
import { Props } from './App.types'
import './App.css'
import WalletInfo from '../../components/WalletInfo'

//TODO add decentraland UI componentes
const App: React.FC<Props> = ({ address, isConnected, onConnect, isConnecting, error, balance }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isConnected) {
      onConnect()
    }
  }, [])

  const renderContent = () => {
    if (address && balance) {
      return (
        <>
          <WalletInfo address={address} balance={balance} />
          <Button primary onClick={() => navigate('/transfer')}>
            Refresh
          </Button>
        </>
      )
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
      <Center>{renderContent()}</Center>
    </>
  )
}

export default App
