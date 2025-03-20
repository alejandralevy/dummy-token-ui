import React from 'react'
import { Card, Header } from 'decentraland-ui'

type WalletInfoProps = { address: string; balance: string }

//TODO use decentraland components
const WalletInfo: React.FC<WalletInfoProps> = ({ address, balance }) => {
  return (
    <>
      <Card>
        <Header>Wallet</Header>
        <strong>Address:</strong>&nbsp;
        {address.slice(0, 6) + '...' + address.slice(-4)}
      </Card>
      <Card>
        <Header>Balance</Header>
        <p>
          <strong>DUMMY:</strong>&nbsp;
          {balance}
        </p>
      </Card>
    </>
  )
}

export default WalletInfo
