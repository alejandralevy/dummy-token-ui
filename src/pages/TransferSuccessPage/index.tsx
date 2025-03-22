import { Button } from 'decentraland-ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TransferSuccessPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Transfer Success</h1>
      <Button primary onClick={() => navigate('/')}>
        Go back to Wallet
      </Button>
      <Button secondary onClick={() => navigate('/transfer')}>
        Make another transfer
      </Button>
    </div>
  )
}

export default TransferSuccessPage
