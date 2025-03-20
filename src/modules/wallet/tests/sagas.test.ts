import { expectSaga } from 'redux-saga-test-plan'
import { handleConnectWalletRequest, handleGetBalanceRequest } from '../sagas'
import {
  connectWalletFailure,
  connectWalletSuccess,
  walletBalanceFailure,
  walletBalanceRequest,
  walletBalanceSuccess,
} from '../actions'
import { ethers } from 'ethers'

jest.mock('ethers', () => {
  const balanceOfMock = jest.fn().mockResolvedValue(BigInt(4000000000000000000))

  const mock = {
    Contract: jest.fn(() => ({ balanceOf: balanceOfMock })),
    BrowserProvider: jest.fn(() => ({
      send: jest.fn(),
      getSigner: jest.fn(() => ({ getAddress: jest.fn(() => '0xabc123') })),
    })),
  }

  return { __esModule: true, ...mock, ethers: mock }
})

jest.mock('../../../env', () => ({ TOKEN_ADDRESS: '0xaaa111' }))

describe('handleGetBalanceRequest', () => {
  it('should dispatch walletBalanceSuccess', () => {
    const testAddress = '0xabc123'
    return expectSaga(handleGetBalanceRequest, walletBalanceRequest(testAddress))
      .put(walletBalanceSuccess(BigInt(4000000000000000000)))

      .run()
  })

  it('should set an error after balanceOf fails', () => {
    const testAddress = '0xabc123'
    const errorMessage = 'Error getting the balance!'
    const contractInstance = (ethers.Contract as jest.Mock).mock.results[0].value
    contractInstance.balanceOf.mockImplementation(() => {
      throw new Error(errorMessage)
    })

    return expectSaga(handleGetBalanceRequest, walletBalanceRequest(testAddress))
      .put(walletBalanceFailure(errorMessage))
      .run()
  })
})

describe('handleConnectWalletRequest', () => {
  it('should dispatch connectWalletSuccess and request the wallet balance', () => {
    return expectSaga(handleConnectWalletRequest)
      .put(connectWalletSuccess('0xabc123'))
      .put(walletBalanceRequest('0xabc123'))
      .run()
  })

  it('should dispatch connectWalletFailure when provider.send fails', () => {
    const errorMessage = 'failed to connect'

    ;(ethers.BrowserProvider as jest.Mock).mockImplementation(() => ({
      send: jest.fn(() => {
        throw new Error(errorMessage)
      }),
    }))

    return expectSaga(handleConnectWalletRequest).put(connectWalletFailure(errorMessage)).run()
  })
})
