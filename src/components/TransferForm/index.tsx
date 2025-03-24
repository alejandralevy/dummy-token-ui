import React from 'react'

import { Button, Column, Field, Input } from 'decentraland-ui'
import { isValidAddress } from '../../modules/utils'
import './index.css'

type TransferFormProps = {
  transferError: string | null
  balance: string
  onTransfer: (params: { to: string; amount: string }) => void
}

const TransferForm: React.FC<TransferFormProps> = ({ balance, onTransfer, transferError }) => {
  const [to, setTo] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [addressError, setAddressError] = React.useState(false)
  const [amountError, setAmountError] = React.useState(false)
  const [amountErrorMessage, setAmountErrorMessage] = React.useState('')

  const canTransfer = !!to && !!amount && !addressError && !amountError
  const addressErrorMessage = 'Invalid address. Please verify and try again.'

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
    <div className="transfer-form">
      <Column className="form-container" shrink>
        <Field
          label="Address"
          data-testid="address-input"
          error={addressError}
          message={addressError ? addressErrorMessage : ''}
          placeholder="0x..."
          focus
          value={to}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAddressChange(event?.target.value)}
          maxLength={42}
          input={
            <Input onBlur={(event: React.FocusEvent<HTMLInputElement>) => handleAddressBlur(event.target.value)} />
          }
        />
        <Field
          label="Amount"
          data-testid="amount-input"
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
        <Button
          primary
          onClick={() => handleTransfer({ to, amount })}
          disabled={!canTransfer}
          data-testid="transfer-button"
        >
          Transfer
        </Button>
        {transferError && (
          <p className="error-message" data-testid="transfer-error-message">
            There was an error on the transfer, please try again ({transferError})
          </p>
        )}
      </Column>
    </div>
  )
}

export default TransferForm
