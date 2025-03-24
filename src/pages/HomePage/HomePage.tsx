import React, { useEffect } from 'react'
import { Button, Center, Column, Icon } from 'decentraland-ui'
import { useNavigate } from 'react-router-dom'
import { Props } from './HomePage.types'
import WalletInfo from '../../components/WalletInfo'
import ConnectionError from '../../components/ConnectionError'
import ConnectingWalletLoader from '../../components/ConnectingWalletLoader'
import { ROUTES } from '../../constants/routes'

const HomePage: React.FC<Props> = ({ address, isConnected, onConnect, isConnecting, error, balance }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isConnected) {
      onConnect()
    }
  }, [])

  const renderContent = () => {
    if (isConnecting) {
      return <ConnectingWalletLoader />
    }

    if (!isConnected) {
      return <ConnectionError error={error} onRetry={onConnect} />
    }

    return (
      <Column>
        <WalletInfo address={address} balance={balance} />
        <Button name="transfer" primary onClick={() => navigate(ROUTES.TRANSFER)}>
          <Icon name="send" />
          Transfer
        </Button>
      </Column>
    )
  }

  return (
    <>
      <Center>{renderContent()}</Center>
    </>
  )
}

export default HomePage
