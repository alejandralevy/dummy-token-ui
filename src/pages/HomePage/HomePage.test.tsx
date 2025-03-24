import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'
import { ROUTES } from '../../constants/routes'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'), useNavigate: () => mockNavigate }))

const mockOnConnect = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

const baseProps = {
  address: '',
  isConnected: false,
  isConnecting: false,
  onConnect: mockOnConnect,
  error: null,
  balance: '10',
}

describe('HomePage', () => {
  it('calls onConnect on mount if not connected', () => {
    render(<HomePage {...baseProps} />, { wrapper: MemoryRouter })
    expect(mockOnConnect).toHaveBeenCalled()
  })

  it('renders loader when connecting', () => {
    render(<HomePage {...baseProps} isConnecting={true} />, { wrapper: MemoryRouter })
    expect(screen.getByText(/connecting/i)).toBeInTheDocument()
  })

  it('renders error component when not connected and not connecting', () => {
    render(<HomePage {...baseProps} error="Some error" />, { wrapper: MemoryRouter })
    expect(screen.getByText(/some error/i)).toBeInTheDocument()
  })

  it('renders WalletInfo and Transfer button when connected', () => {
    render(<HomePage {...baseProps} address="0xabc123" isConnected={true} />, { wrapper: MemoryRouter })
    expect(screen.getByText(/wallet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /transfer/i })).toBeInTheDocument()
  })

  it('navigates to transfer page on click', () => {
    render(<HomePage {...baseProps} address="0xabc123" isConnected={true} />, { wrapper: MemoryRouter })
    const button = screen.getByRole('button', { name: /transfer/i })
    fireEvent.click(button)
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.TRANSFER)
  })
})
