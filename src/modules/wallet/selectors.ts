import { BigNumberish, formatUnits } from 'ethers'
import { RootState } from '../types'
import { createSelector } from 'reselect'

const getWalletState = (state: RootState) => state.wallet

export const getAddress = createSelector([getWalletState], wallet => wallet.address || '')

export const isConnected = createSelector([getAddress], address => !!address)

export const isConnecting = createSelector([getWalletState], wallet => wallet.isConnecting)

export const getError = createSelector([getWalletState], wallet => wallet.connectionError)

export const getBalance = createSelector([getWalletState], wallet =>
  formatUnits(wallet.dummyBalance as BigNumberish, 0)
)

export const isTransfering = createSelector([getWalletState], wallet => wallet.isTransfering)

export const getTransferError = createSelector([getWalletState], wallet => wallet.transferError)
