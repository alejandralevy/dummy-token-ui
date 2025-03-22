import { Button, Center, Row } from 'decentraland-ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TransferSuccessPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="transfer-success-page">
      <Center>
        <h1>You've successfully transfered Dummies!</h1>
        <p>What about now?</p>
        <Row grow={false} shrink={false}>
          <Button secondary onClick={() => navigate('/')}>
            Back to Wallet
          </Button>
          <Button primary onClick={() => navigate('/transfer')}>
            Another transfer
          </Button>
        </Row>
      </Center>
    </div>
  )
}

export default TransferSuccessPage
