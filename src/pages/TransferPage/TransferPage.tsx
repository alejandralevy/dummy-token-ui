import React, { useEffect } from 'react'
import { Props } from './TransferPage.types'
import { Center } from 'decentraland-ui'
import WalletInfo from '../../components/WalletInfo'

import TransferForm from '../../components/TransferForm'

const TransferPage: React.FC<Props> = ({
  address,
  isConnected,
  onConnect,
  isConnecting,
  error,
  balance,
  onTransfer,
}) => {
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
          <TransferForm balance={balance} onTransfer={onTransfer} />
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
