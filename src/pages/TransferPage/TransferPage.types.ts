import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  address: string
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  balance: string | null
  onConnect: () => void
  onTransfer: (params: { to: string; amount: string; onSuccess: () => void }) => void
  isTransfering: boolean
  transferError: string | null
}

export type MapStateProps = Pick<
  Props,
  'address' | 'isConnected' | 'isConnecting' | 'error' | 'balance' | 'isTransfering' | 'transferError'
>
export type MapDispatchProps = Pick<Props, 'onConnect' | 'onTransfer'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
