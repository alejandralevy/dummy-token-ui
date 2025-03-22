import React, { useEffect } from 'react'
import { Button, Center } from 'decentraland-ui'
import { useNavigate } from 'react-router-dom'
import { Props } from './HomePage.types'
import WalletInfo from '../../components/WalletInfo'

const HomePage: React.FC<Props> = ({ address, isConnected, onConnect, isConnecting, error, balance }) => {
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
            Transfer Dummies
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

export default HomePage
