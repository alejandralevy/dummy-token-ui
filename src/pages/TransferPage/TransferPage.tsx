import React, { useEffect } from 'react'
import { Props } from './TransferPage.types'
import { Center } from 'decentraland-ui'
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

  useEffect(() => {
    if (!isTransfering) {
      if (!!transferError) {
        console.log('There was an error while transferring')
      } else {
        console.log('Transfer was successful')
      }
    }
  }, [isTransfering, transferError])

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
      return <p>Transfering tokens, please confirm the transaction on your Wallet</p>
    }

    if (address && balance) {
      return (
        <>
          <WalletInfo address={address} balance={balance} />
          <TransferForm balance={balance} onTransfer={handleTransfer} transferError={transferError} />
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

export default TransferPage
