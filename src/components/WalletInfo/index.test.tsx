import { render, screen, fireEvent } from '@testing-library/react'
import WalletInfo from './index'

Object.assign(navigator, { clipboard: { writeText: jest.fn() } })

describe('WalletInfo', () => {
  const TEST_ADDRESS = '0xabc123'
  const TEST_BALANCE = '100'

  it('renders wallet title', () => {
    render(<WalletInfo address={TEST_ADDRESS} balance={TEST_BALANCE} />)
    expect(screen.getByTestId('wallet-title')).toBeInTheDocument()
  })

  it('renders the correct address', () => {
    render(<WalletInfo address={TEST_ADDRESS} balance={TEST_BALANCE} />)
    expect(screen.getByText(TEST_ADDRESS)).toBeInTheDocument()
  })

  it('renders fallback when address is missing', () => {
    render(<WalletInfo address={null} balance={TEST_BALANCE} />)
    expect(screen.getByText(/address not available/i)).toBeInTheDocument()
  })

  it('renders the correct balance', () => {
    render(<WalletInfo address={TEST_ADDRESS} balance={TEST_BALANCE} />)
    expect(screen.getByTestId('wallet-balance')).toHaveTextContent(TEST_BALANCE)
  })

  it('renders 0 when balance is null', () => {
    render(<WalletInfo address={TEST_ADDRESS} balance={null} />)
    expect(screen.getByTestId('wallet-balance')).toHaveTextContent('0')
  })

  it('renders token label DUMMIES', () => {
    render(<WalletInfo address={TEST_ADDRESS} balance={TEST_BALANCE} />)
    expect(screen.getByText(/dummies/i)).toBeInTheDocument()
  })

  it('calls clipboard.writeText when copy icon is clicked', () => {
    const address = '0xabc123'
    render(<WalletInfo address={address} balance="100" />)

    const copyButton = screen.getByTestId('copy-icon')
    fireEvent.click(copyButton)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(address)
  })
})
