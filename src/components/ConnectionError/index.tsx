import { Button, Column, Icon } from 'decentraland-ui'
import React from 'react'

interface ConnectionErrorProps {
  onRetry?: () => void
  error?: string | null
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({ onRetry, error }) => {
  return (
    <Column align="center" className="connection-error">
      <Icon name="warning" size="big" color="red" />
      <p>There was an error connecting your wallet</p>
      {!!error && <p>({error})</p>}
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </Column>
  )
}

export default ConnectionError
