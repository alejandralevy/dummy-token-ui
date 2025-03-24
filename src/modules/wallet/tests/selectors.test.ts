import {
  getAddress,
  isConnecting,
  getError,
  getBalance,
  isConnected,
  isTransfering,
  getTransferError,
} from '../selectors'
import { RootState } from '../../types'

describe('wallet selectors', () => {
  let baseState: RootState

  beforeEach(() => {
    baseState = {
      wallet: {
        address: '',
        isConnecting: false,
        connectionError: null,
        dummyBalance: BigInt(100),
        isLoadingBalance: false,
        balanceError: null,
        isTransfering: false,
        transferError: null,
      },
    }
  })

  it('should return the address', () => {
    baseState.wallet.address = '0xabc123'
    const result = getAddress(baseState)
    expect(result).toBe('0xabc123')
  })

  it('should return empty string if address is not set', () => {
    baseState.wallet.address = ''
    const result = getAddress(baseState)
    expect(result).toBe('')
  })

  it('should return true if wallet is connecting', () => {
    baseState.wallet.isConnecting = true
    const result = isConnecting(baseState)
    expect(result).toBe(true)
  })

  it('should return false if wallet is not connecting', () => {
    baseState.wallet.isConnecting = false
    const result = isConnecting(baseState)
    expect(result).toBe(false)
  })

  it('should return error message if error exists', () => {
    baseState.wallet.connectionError = 'Connection error'
    const result = getError(baseState)
    expect(result).toBe('Connection error')
  })

  it('should return null if there is no error', () => {
    baseState.wallet.connectionError = null
    const result = getError(baseState)
    expect(result).toBeNull()
  })

  it('should return true if transfer is in progress', () => {
    baseState.wallet.isTransfering = true
    const result = isTransfering(baseState)
    expect(result).toBe(true)
  })

  it('should return false if not transfering', () => {
    baseState.wallet.isTransfering = false
    const result = isTransfering(baseState)
    expect(result).toBe(false)
  })

  it('should return transfer error if exists', () => {
    baseState.wallet.transferError = 'Insufficient funds'
    const result = getTransferError(baseState)
    expect(result).toBe('Insufficient funds')
  })

  it('should return null if there is no transfer error', () => {
    baseState.wallet.transferError = null
    const result = getTransferError(baseState)
    expect(result).toBeNull()
  })

  it('should return false when address is empty', () => {
    baseState.wallet.address = ''
    const result = isConnected(baseState)
    expect(result).toBe(false)
  })

  it('should return true when address exists', () => {
    baseState.wallet.address = '0xabc123'
    const result = isConnected(baseState)
    expect(result).toBe(true)
  })

  it('should return the correct formatted balance from the state', () => {
    baseState.wallet.dummyBalance = BigInt(4)
    const result = getBalance(baseState)
    expect(result).toBe('4')
  })
})
