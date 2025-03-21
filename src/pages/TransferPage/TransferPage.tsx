import React, { useEffect } from 'react'
import { Props } from './TransferPage.types'
import { Button, Center, Field } from 'decentraland-ui'
import WalletInfo from '../../components/WalletInfo'

//TODO avoid code repetition
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
          <Field label="Address" placeholder="0x..." />
          <Field label="Amount" placeholder="10" type="number" />
          <Button primary onClick={() => onTransfer()}>
            Transfer
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

export default TransferPage
