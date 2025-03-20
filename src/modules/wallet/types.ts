import { ethers } from 'ethers'

export type WalletState = {
  address: string | null
  isConnecting: boolean
  error: string | null
  dummyBalance: bigint | null
  isLoadingBalance: boolean
  balanceError: string | null
}

export type WindowWithEthereum = Window & { ethereum: ethers.Eip1193Provider }
