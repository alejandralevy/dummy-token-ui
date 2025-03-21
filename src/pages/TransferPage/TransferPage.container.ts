import { connect } from 'react-redux'
import { connectWalletRequest, transferDummyTokenRequest } from '../../modules/wallet/actions'
import { getAddress, getBalance, getError, isConnected, isConnecting } from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './TransferPage.types.ts'
import TransferPage from './TransferPage.tsx'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  error: getError(state),
  balance: getBalance(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onTransfer: ({ to, amount }) => dispatch(transferDummyTokenRequest({ to, amount })),
})

export default connect(mapState, mapDispatch)(TransferPage)
