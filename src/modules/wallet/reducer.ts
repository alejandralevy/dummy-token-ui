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
  TRANSFER_DUMMY_TOKEN_FAILURE,
  TRANSFER_DUMMY_TOKEN_SUCCESS,
  WalletBalanceSuccessAction,
  WalletBalanceFailureAction,
  TransferDummyTokenFailureAction,
} from './actions'
import { WalletState } from './types'

const INITIAL_STATE: WalletState = {
  address: null,
  isConnecting: false,
  connectionError: null,
  dummyBalance: BigInt(0),
  isLoadingBalance: false,
  balanceError: null,
  isTransfering: false,
  transferError: null,
}

//TODO  add actions types
export function walletReducer(state: WalletState = INITIAL_STATE, action: AnyAction): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return { ...state, isConnecting: true, connectionError: null }
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address } = action.payload as ConnectWalletSuccessAction['payload']
      return { ...state, isConnecting: false, address, connectionError: null }
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload']
      return { ...state, isConnecting: false, connectionError: error }
    }

    case GET_WALLET_BALANCE_REQUEST: {
      return { ...state, isLoadingBalance: true }
    }

    case GET_WALLET_BALANCE_SUCCESS: {
      const { dummyBalance } = action.payload as WalletBalanceSuccessAction['payload']
      return { ...state, dummyBalance, isLoadingBalance: false, balanceError: null }
    }

    case GET_WALLET_BALANCE_FAILURE: {
      const { error } = action.payload as WalletBalanceFailureAction['payload']
      return { ...state, isLoadingBalance: false, balanceError: error }
    }

    case TRANSFER_DUMMY_TOKEN_REQUEST: {
      return { ...state, isTransfering: true, transferError: null }
    }

    case TRANSFER_DUMMY_TOKEN_FAILURE: {
      const { error } = action.payload as TransferDummyTokenFailureAction['payload']
      return { ...state, isTransfering: false, transferError: error }
    }

    case TRANSFER_DUMMY_TOKEN_SUCCESS: {
      return { ...state, isTransfering: false, transferError: null }
    }

    default:
      return state
  }
}
