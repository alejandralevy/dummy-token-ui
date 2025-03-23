import React, { useEffect } from 'react'
import { Button, Center, Column, Icon, Loader } from 'decentraland-ui'
import { useNavigate } from 'react-router-dom'
import { Props } from './HomePage.types'
import WalletInfo from '../../components/WalletInfo'
import ConnectionError from '../../components/ConnectionError'

const HomePage: React.FC<Props> = ({ address, isConnected, onConnect, isConnecting, error, balance }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isConnected) {
      onConnect()
    }
  }, [])

  const renderContent = () => {
    if (isConnecting) {
      return <Loader active size="massive" content="We are connecting your wallet, please hold on." />
    }

    if (!isConnected) {
      return <ConnectionError error={error} onRetry={onConnect} />
    }

    return (
      <Column>
        <WalletInfo address={address} balance={balance} />
        <Button primary onClick={() => navigate('/transfer')} disabled={isConnecting || !isConnected}>
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
