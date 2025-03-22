import React from 'react'
import { Card, Header } from 'decentraland-ui'
import './index.css'

type WalletInfoProps = { address: string; balance: string }

const WalletInfo: React.FC<WalletInfoProps> = ({ address, balance }) => {
  return (
    <>
      <Card className="card">
        <Header>Wallet</Header>
        <strong>Address:</strong>&nbsp;
        {address.slice(0, 6) + '...' + address.slice(-4)}
        <p>
          <strong>DUMMY:</strong>&nbsp;
          {balance}
        </p>
      </Card>
    </>
  )
}

export default WalletInfo
