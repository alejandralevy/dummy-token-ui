import React from 'react'
import { Loader } from 'semantic-ui-react'

const ConnectingWalletLoader: React.FC = () => {
  return <Loader active size="massive" content="We are connecting your wallet, please hold on." />
}

export default ConnectingWalletLoader
