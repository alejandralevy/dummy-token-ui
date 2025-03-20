import { RootState } from '../../types'
import { isConnected } from '../selectors'

describe('wallet selectors', () => {
  let baseState: RootState

  beforeEach(() => {
    baseState = {
      wallet: {
        address: '',
        isConnecting: false,
        error: null,
        dummyBalance: BigInt(100),
        isLoadingBalance: false,
        balanceError: null,
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
