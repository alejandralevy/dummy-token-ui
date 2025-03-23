import React, { useEffect } from 'react'
import { Props } from './TransferPage.types'
import { Button, Center, Column, Icon, Loader } from 'decentraland-ui'
import WalletInfo from '../../components/WalletInfo'
import './TransferPage.css'

import TransferForm from '../../components/TransferForm'
import { useNavigate } from 'react-router-dom'
import ConnectingWalletLoader from '../../components/ConnectingWalletLoader'
import ConnectionError from '../../components/ConnectionError'

const TransferPage: React.FC<Props> = ({
  address,
  isConnected,
  onConnect,
  isConnecting,
  error,
  balance,
  onTransfer,
  isTransfering,
  transferError,
}) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isConnected) {
      onConnect()
    }
  }, [])

  const handleTransfer = (params: { to: string; amount: string }) => {
    try {
      onTransfer({
        ...params,
        onSuccess: () => {
          navigate('/transfer/success')
        },
      })
    } catch (error) {}
  }

  const renderContent = () => {
    if (isTransfering) {
      return (
        <Loader active size="massive" content="Transfering tokens, please confirm the transaction on your Wallet." />
      )
    }

    if (isConnecting) {
      return <ConnectingWalletLoader />
    }

    if (!isConnected) {
      return <ConnectionError error={error} onRetry={onConnect} />
    }

    if (address && balance) {
      return (
        <Column className="transfer-container">
          <Button basic onClick={() => navigate('/')}>
            <Icon name="arrow left" />
            Go back to wallet
          </Button>
          <WalletInfo address={address} balance={balance} />
          <TransferForm balance={balance} onTransfer={handleTransfer} transferError={transferError} />
        </Column>
      )
    }
  }

  return <Center className="transfer-page">{renderContent()}</Center>
}

export default TransferPage
