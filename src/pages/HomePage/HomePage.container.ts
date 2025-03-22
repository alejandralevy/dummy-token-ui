import { connect } from 'react-redux'
import { connectWalletRequest } from '../../modules/wallet/actions.ts'
import { getAddress, getBalance, getError, isConnected, isConnecting } from '../../modules/wallet/selectors.ts'
import { RootState } from '../../modules/types.ts'
import { MapDispatch, MapDispatchProps, MapStateProps } from './HomePage.types.ts'
import HomePage from './HomePage.tsx'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  error: getError(state),
  balance: getBalance(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({ onConnect: () => dispatch(connectWalletRequest()) })

export default connect(mapState, mapDispatch)(HomePage)
