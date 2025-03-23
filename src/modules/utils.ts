export function isErrorWithMessage(error: unknown): error is Error {
  return (
    error !== undefined &&
    error !== null &&
    typeof error === 'object' &&
    ('shortMessage' in error || 'message' in error)
  )
}

export function getErrorMessage(error: unknown) {
  if (error !== undefined && error !== null && typeof error === 'object') {
    return !!(error as any).shortMessage
      ? (error as any).shortMessage
      : !!(error as any).message
        ? (error as any).message
        : 'There was an error'
  }
}
export function isValidAddress(address: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
