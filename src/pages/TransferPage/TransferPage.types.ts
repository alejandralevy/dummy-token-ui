import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  address: string
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  balance: string | null
  onConnect: () => void
  onTransfer: (params: { to: string; amount: string }) => void
}

export type MapStateProps = Pick<Props, 'address' | 'isConnected' | 'isConnecting' | 'error' | 'balance'>
export type MapDispatchProps = Pick<Props, 'onConnect' | 'onTransfer'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
