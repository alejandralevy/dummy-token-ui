import React from 'react'
import { Button, Card, Center, Footer, Header, Navbar, Page } from 'decentraland-ui'
import { Props } from './App.types'
import './App.css'
import MainLayout from '../../components/MainLayout'

const App: React.FC<Props> = ({ address, isConnected, onConnect, isConnecting, error, balance }) => {
  return (
    <>
      <MainLayout className="App">
        <Center>
          {!isConnected ? (
            <>
              <Button primary onClick={onConnect} loading={isConnecting}>
                Connect
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </>
          ) : (
            <>
              <Card>
                <Header>Wallet</Header>
                <p>
                  <strong>Address:</strong>&nbsp;
                  {address.slice(0, 6) + '...' + address.slice(-4)}
                </p>
              </Card>
              <Card>
                <Header>Balance</Header>
                <p>
                  <strong>DUMMY:</strong>&nbsp;
                  {balance}
                </p>
              </Card>
            </>
          )}
        </Center>
      </MainLayout>
      <Footer />
    </>
  )
}

export default App
