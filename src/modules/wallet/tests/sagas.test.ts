import { expectSaga } from 'redux-saga-test-plan'
import { handleConnectWalletRequest, handleGetBalanceRequest, handleTransferDummyTokenRequest } from '../sagas'
import {
  connectWalletFailure,
  connectWalletSuccess,
  walletBalanceFailure,
  walletBalanceRequest,
  walletBalanceSuccess,
  transferDummyTokenRequest,
  transferDummyTokenFailure,
} from '../actions'
import { ethers } from 'ethers'

jest.mock('ethers', () => {
  const balanceOfMock = jest.fn().mockResolvedValue(BigInt(4000000000000000000))
  const transferMock = jest.fn().mockResolvedValue({ wait: jest.fn() })
  const getAddressMock = jest.fn().mockResolvedValue('0xabc123')

  class MockSigner {
    getAddress = getAddressMock
  }

  class MockBrowserProvider {
    send = jest.fn()
    getSigner = jest.fn(() => new MockSigner())
  }

  const mock = {
    Contract: jest.fn(() => ({ balanceOf: balanceOfMock, transfer: transferMock })),
    BrowserProvider: MockBrowserProvider,
    parseUnits: jest.fn(() => BigInt(10)),
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

    const originalBrowserProvider = ethers.BrowserProvider

    const FailingProvider = jest.fn(() => ({
      send: jest.fn(() => {
        throw new Error(errorMessage)
      }),
    }))

    ;(ethers as any).BrowserProvider = FailingProvider

    return expectSaga(handleConnectWalletRequest)
      .put(connectWalletFailure(errorMessage))
      .run()
      .finally(() => {
        ;(ethers as any).BrowserProvider = originalBrowserProvider
      })
  })
})

describe('handleTransferDummyTokenRequest', () => {
  const action = transferDummyTokenRequest({ to: '0xReceiverAddress', amount: '10' })

  it('should handle a successful token transfer', () => {
    return expectSaga(handleTransferDummyTokenRequest, action)
      .withState({ wallet: { address: '0xabc123' } })
      .put(walletBalanceRequest('0xabc123'))
      .run()
  })

  it('should dispatch transferDummyTokenFailure on error', () => {
    const errorMessage = 'Transfer failed'
    const original = ethers.Contract

    ;(ethers as any).Contract = jest.fn(() => ({
      transfer: () => {
        throw new Error(errorMessage)
      },
    }))

    return expectSaga(handleTransferDummyTokenRequest, action)
      .withState({ wallet: { address: '0xabc123' } })
      .put(transferDummyTokenFailure(errorMessage))
      .run()
      .finally(() => {
        ;(ethers as any).Contract = original
      })
  })
})
