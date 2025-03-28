// Connect Wallet
export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet'
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet'
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet'

export const GET_WALLET_BALANCE_REQUEST = '[Request] Get Wallet Balance'
export const GET_WALLET_BALANCE_SUCCESS = '[Success] Get Wallet Balance'
export const GET_WALLET_BALANCE_FAILURE = '[Failure] Get Wallet Balance'

export const TRANSFER_DUMMY_TOKEN_REQUEST = '[Request] Transfer Dummy Token'
export const TRANSFER_DUMMY_TOKEN_SUCCESS = '[Success] Transfer Dummy Token'
export const TRANSFER_DUMMY_TOKEN_FAILURE = '[Failure] Transfer Dummy Token'

export function connectWalletRequest() {
  return { type: CONNECT_WALLET_REQUEST, payload: {} }
}

export function connectWalletSuccess(address: string) {
  return { type: CONNECT_WALLET_SUCCESS, payload: { address } }
}

export function connectWalletFailure(error: string) {
  return { type: CONNECT_WALLET_FAILURE, payload: { error } }
}

export function walletBalanceRequest(address: string) {
  return { type: GET_WALLET_BALANCE_REQUEST, payload: address }
}

export function walletBalanceSuccess(dummyBalance: bigint) {
  return { type: GET_WALLET_BALANCE_SUCCESS, payload: { dummyBalance } }
}

export function walletBalanceFailure(error: string) {
  return { type: GET_WALLET_BALANCE_FAILURE, payload: { error } }
}

export function transferDummyTokenRequest({
  to,
  amount,
  onSuccess,
}: {
  to: string
  amount: string
  onSuccess?: () => void
}) {
  return { type: TRANSFER_DUMMY_TOKEN_REQUEST, payload: { to, amount, onSuccess } }
}

export function transferDummyTokenSuccess() {
  return { type: TRANSFER_DUMMY_TOKEN_SUCCESS, payload: {} }
}

export function transferDummyTokenFailure(error: string) {
  return { type: TRANSFER_DUMMY_TOKEN_FAILURE, payload: { error } }
}

export type ConnectWalletRequestAction = ReturnType<typeof connectWalletRequest>
export type ConnectWalletSuccessAction = ReturnType<typeof connectWalletSuccess>
export type ConnectWalletFailureAction = ReturnType<typeof connectWalletFailure>
export type WalletBalanceRequestAction = ReturnType<typeof walletBalanceRequest>
export type WalletBalanceSuccessAction = ReturnType<typeof walletBalanceSuccess>
export type WalletBalanceFailureAction = ReturnType<typeof walletBalanceFailure>
export type TransferDummyTokenRequestAction = ReturnType<typeof transferDummyTokenRequest>
export type TransferDummyTokenSuccessAction = ReturnType<typeof transferDummyTokenSuccess>
export type TransferDummyTokenFailureAction = ReturnType<typeof transferDummyTokenFailure>
