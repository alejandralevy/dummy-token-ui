import { Button, Center } from 'decentraland-ui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Center className="not-found">
      <h1>Oops, there's nothing here :(</h1>
      <p>Maybe you were looking for your wallet?</p>
      <Button primary onClick={() => navigate(ROUTES.HOME)}>
        Go to wallet
      </Button>
    </Center>
  )
}

export default NotFoundPage
