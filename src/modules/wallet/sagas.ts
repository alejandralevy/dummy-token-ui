import { ethers, formatUnits, parseUnits } from 'ethers'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { isErrorWithMessage } from '../utils'
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
  GET_WALLET_BALANCE_REQUEST,
  walletBalanceRequest,
  WalletBalanceRequestAction,
  walletBalanceSuccess,
  walletBalanceFailure,
  TRANSFER_DUMMY_TOKEN_REQUEST,
  TransferDummyTokenRequestAction,
  transferDummyTokenFailure,
} from './actions'
import { WindowWithEthereum } from './types'
import { TOKEN_ADDRESS } from '../../env'
import { getAddress } from './selectors'
// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

/* This is the Dummy Token address, it identifies the token contract once deployed */
// export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`)
}

export const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
]

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
  yield takeEvery(GET_WALLET_BALANCE_REQUEST, handleGetBalanceRequest)
  yield takeEvery(TRANSFER_DUMMY_TOKEN_REQUEST, handleTransferDummyTokenRequest)
}

export function* handleConnectWalletRequest() {
  try {
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    yield call([provider, 'send'], 'eth_requestAccounts', []) as Awaited<ReturnType<typeof provider.send>>
    const signer = (yield call([provider, 'getSigner'])) as Awaited<ReturnType<typeof provider.getSigner>>
    const address = (yield call([signer, 'getAddress'])) as Awaited<ReturnType<typeof signer.getAddress>>
    yield put(connectWalletSuccess(address))
    yield put(walletBalanceRequest(address))
  } catch (error) {
    yield put(connectWalletFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}

export function* handleGetBalanceRequest(action: WalletBalanceRequestAction) {
  try {
    const address = action.payload
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
    const balance: bigint = yield call(() => token.balanceOf(address))
    yield put(walletBalanceSuccess(balance))
  } catch (error) {
    yield put(walletBalanceFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}

export function* handleTransferDummyTokenRequest(action: TransferDummyTokenRequestAction): Generator<any, void, any> {
  try {
    const { to, amount } = action.payload
    debugger
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    const signer = (yield call([provider, 'getSigner'])) as Awaited<ReturnType<typeof provider.getSigner>>
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer)

    const parsedAmount = parseUnits(amount, 0)
    const tx = yield call(() => token.transfer(to, parsedAmount))
    yield call([tx, 'wait'])

    const senderAddress: string = yield select(getAddress)
    yield put(walletBalanceRequest(senderAddress))
  } catch (error) {
    yield put(
      transferDummyTokenFailure(error instanceof Error ? error.message : 'There was an error transferring the token')
    )
  }
}
