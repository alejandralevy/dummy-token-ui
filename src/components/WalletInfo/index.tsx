import React from 'react'
import { Card, CardMeta, Header, Icon, Row, Section } from 'decentraland-ui'
import './index.css'
import { copyTextToClipboard } from '../../modules/utils'

type WalletInfoProps = { address: string | null; balance: string | null }

const WalletInfo: React.FC<WalletInfoProps> = ({ address, balance }) => {
  return (
    <div className="wallet-info">
      <Card>
        <Header data-testid="wallet-title">Wallet</Header>
        <CardMeta className="meta">
          <Row>
            {!!address ? address : 'Address not available :('}
            <div className="icon-container" onClick={() => copyTextToClipboard(address)}>
              <Icon name="copy" className="copy-icon" data-testid="copy-icon" />
            </div>
          </Row>
        </CardMeta>
        <Section size="tiny">
          <Row className="balance-container">
            <p className="wallet-balance" data-testid="wallet-balance">
              {!!balance ? balance : 0}
            </p>
            <p className="wallet-token">DUMMIES</p>
          </Row>
        </Section>
      </Card>
    </div>
  )
}

export default WalletInfo
