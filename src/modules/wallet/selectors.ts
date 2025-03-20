import { RootState } from '../types'
import { createSelector } from 'reselect'

const getWalletState = (state: RootState) => state.wallet

export const getAddress = createSelector([getWalletState], wallet => wallet.address || '')

export const isConnected = createSelector([getAddress], address => !!address)

export const isConnecting = createSelector([getWalletState], wallet => wallet.isConnecting)

export const getError = createSelector([getWalletState], wallet => wallet.error)

export const getBalance = createSelector([getWalletState], wallet => wallet.dummyBalance)
