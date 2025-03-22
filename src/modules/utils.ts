export function isErrorWithMessage(error: unknown): error is Error {
  return error !== undefined && error !== null && typeof error === 'object' && 'message' in error
}
export function isValidAddress(address: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
