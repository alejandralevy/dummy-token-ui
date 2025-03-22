import { RootState } from '../../types'
import { getBalance, isConnected } from '../selectors'

describe('wallet selectors', () => {
  let baseState: RootState

  //TODO extracte base state mock to another file
  beforeEach(() => {
    baseState = {
      wallet: {
        address: '',
        isConnecting: false,
        error: null,
        dummyBalance: BigInt(100),
        isLoadingBalance: false,
        balanceError: null,
        isTransfering: false,
        transferError: null,
      },
    }
  })

  it('should return false when address is empty', () => {
    const result = isConnected(baseState)
    expect(result).toBe(false)
  })

  it('should return true when address exists', () => {
    baseState.wallet.address = '0xabc123'
    const result = isConnected(baseState)
    expect(result).toBe(true)
  })
})

it('should return the correct balance from the state', () => {
  const state: RootState = {
    wallet: {
      address: '0xabc123',
      isConnecting: false,
      error: null,
      dummyBalance: BigInt(4),
      isLoadingBalance: false,
      balanceError: null,
      isTransfering: false,
      transferError: null,
    },
  }

  const formattedBalance = getBalance(state)

  expect(formattedBalance).toBe('4')
})
