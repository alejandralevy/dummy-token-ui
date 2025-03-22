import React from 'react'
import { Card, CardMeta, Header, Icon, Row, Section } from 'decentraland-ui'
import './index.css'

type WalletInfoProps = { address: string; balance: string }

const WalletInfo: React.FC<WalletInfoProps> = ({ address, balance }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(address)
  }
  return (
    <div className="wallet-info">
      <Card>
        <Header>Wallet</Header>
        <CardMeta className="meta">
          <Row>
            {address}
            <div className="icon-container" onClick={handleCopy}>
              <Icon name="copy" className="copy-icon" />
            </div>
          </Row>
        </CardMeta>
        <Section size="tiny">
          <Row className="balance-container">
            <p className="wallet-balance">{balance}</p>
            <p className="wallet-token">DUMMY</p>
          </Row>
        </Section>
      </Card>
    </div>
  )
}

export default WalletInfo
