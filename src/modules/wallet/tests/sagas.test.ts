import { expectSaga } from 'redux-saga-test-plan'
import { handleGetBalanceRequest } from '../sagas'
import { walletBalanceFailure, walletBalanceRequest, walletBalanceSuccess } from '../actions'
import { ethers } from 'ethers'

jest.mock('ethers', () => {
  const balanceOfMock = jest.fn().mockResolvedValue(BigInt(4000000000000000000))

  const mock = {
    Contract: jest.fn(() => ({ balanceOf: balanceOfMock })),
    BrowserProvider: jest.fn(() => ({ send: jest.fn() })),
    formatUnits: jest.fn(() => '4.0'),
  }

  return { __esModule: true, ...mock, ethers: mock }
})

jest.mock('../../../env', () => ({ TOKEN_ADDRESS: '0xaaa111' }))

describe('handleGetBalanceRequest', () => {
  it('should dispatch walletBalanceSuccess', () => {
    const testAddress = '0xabc123'
    return expectSaga(handleGetBalanceRequest, walletBalanceRequest(testAddress)).put(walletBalanceSuccess('4.0')).run()
  })

  it('should set an error after balanceOf fails', () => {
    const testAddress = '0xabc123'
    const contractInstance = (ethers.Contract as jest.Mock).mock.results[0].value
    contractInstance.balanceOf.mockImplementation(() => {
      throw new Error('Error getting the balance!')
    })

    return expectSaga(handleGetBalanceRequest, walletBalanceRequest(testAddress))
      .put(walletBalanceFailure('Error getting the balance!'))
      .run()
  })
})
