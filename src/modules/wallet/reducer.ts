import { AnyAction } from 'redux'
import {
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  GET_WALLET_BALANCE_REQUEST,
  GET_WALLET_BALANCE_SUCCESS,
  GET_WALLET_BALANCE_FAILURE,
  TRANSFER_DUMMY_TOKEN_REQUEST,
} from './actions'
import { WalletState } from './types'

//TODO: rename error/loading to addressLoading
const INITIAL_STATE: WalletState = {
  address: null,
  isConnecting: false,
  error: null,
  dummyBalance: BigInt(0),
  isLoadingBalance: false,
  balanceError: null,
  isTransferring: false,
  transferError: null,
}

//TODO  add actions types
export function walletReducer(state: WalletState = INITIAL_STATE, action: AnyAction): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return { ...state, isConnecting: true, error: null }
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address } = action.payload as ConnectWalletSuccessAction['payload']
      return { ...state, isConnecting: false, address, error: null }
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload']
      return { ...state, isConnecting: false, error }
    }

    case GET_WALLET_BALANCE_REQUEST: {
      return { ...state, isLoadingBalance: true }
    }

    case GET_WALLET_BALANCE_SUCCESS: {
      const { dummyBalance } = action.payload as any
      return { ...state, dummyBalance, isLoadingBalance: false, balanceError: null }
    }

    case GET_WALLET_BALANCE_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload']
      return { ...state, isLoadingBalance: false, error }
    }

    case TRANSFER_DUMMY_TOKEN_REQUEST: {
      return { ...state, isTransferring: true, transferError: null }
    }

    default:
      return state
  }
}
