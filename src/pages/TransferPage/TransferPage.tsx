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
  const [to, setTo] = React.useState('')
  const [amount, setAmount] = React.useState('')
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
          <Field label="Address" placeholder="0x..." onChange={event => setTo(event?.target.value)} />
          <Field label="Amount" placeholder="10" type="number" onChange={event => setAmount(event?.target.value)} />
          <Button primary onClick={() => onTransfer({ to, amount })}>
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
