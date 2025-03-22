import React, { useEffect } from 'react'
import { Props } from './TransferPage.types'
import { Button, Center, Column, Icon, Loader, Row } from 'decentraland-ui'
import WalletInfo from '../../components/WalletInfo'

import TransferForm from '../../components/TransferForm'
import { useNavigate } from 'react-router-dom'

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

    if (address && balance) {
      return (
        <Column>
          <Button basic onClick={() => navigate('/')}>
            <Icon name="arrow left" />
            Go back to wallet
          </Button>
          <WalletInfo address={address} balance={balance} />
          <TransferForm balance={balance} onTransfer={handleTransfer} transferError={transferError} />
        </Column>
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
    <div>
      <Center className="transfer-page">{renderContent()}</Center>
    </div>
  )
}

export default TransferPage
