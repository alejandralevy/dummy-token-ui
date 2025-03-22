import React from 'react'

import { Button, Center, Field, Input } from 'decentraland-ui'
import { isValidAddress } from '../../modules/utils'

type TransferFormProps = { balance: string; onTransfer: (params: { to: string; amount: string }) => void }

const TransferForm: React.FC<TransferFormProps> = ({ balance, onTransfer }) => {
  const [to, setTo] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [addressError, setAddressError] = React.useState(false)
  const [amountError, setAmountError] = React.useState(false)
  const [amountErrorMessage, setAmountErrorMessage] = React.useState('')
  debugger
  const canTransfer = !!to && !!amount && !addressError && !amountError
  const addressErrorMessage = 'The address provided appears to be invalid. Please verify and try again.'

  const handleAmountChange = (amount: string) => {
    setAmount(amount)
    if (Number(amount) <= 0) {
      setAmountErrorMessage('The amount must be greater than 0')
      return setAmountError(true)
    }
    if (Number(amount) > Number(balance)) {
      setAmountErrorMessage('The amount exceeds the tokens that you have in your wallet')
      return setAmountError(true)
    }
    setAmountError(false)
  }

  const handleAddressBlur = (address: string) => {
    setAddressError(!isValidAddress(address))
  }

  const handleTransfer = ({ to, amount }: { to: string; amount: string }) => {
    onTransfer({ to, amount })
  }

  const handleAddressChange = (address: string) => {
    setTo(address)
  }

  return (
    <>
      <Field
        label="Address"
        error={addressError}
        message={addressError ? addressErrorMessage : ''}
        placeholder="0x..."
        focus
        value={to}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(event?.target.value)}
        maxLength={42}
        input={<Input onBlur={(event: React.FocusEvent<HTMLInputElement>) => handleAddressBlur(event.target.value)} />}
      />
      <Field
        label="Amount"
        placeholder="25"
        error={amountError}
        message={amountError ? amountErrorMessage : ''}
        input={
          <Input
            type="number"
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => handleAmountChange(event.target.value)}
          />
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAmountChange(event?.target.value)}
      />
      <Button primary onClick={() => handleTransfer({ to, amount })} disabled={!canTransfer}>
        Transfer
      </Button>
    </>
  )
}

export default TransferForm
