import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TransferPage from './TransferPage'
import { ROUTES } from '../../constants/routes'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({ ...jest.requireActual('react-router-dom'), useNavigate: () => mockNavigate }))

const mockOnConnect = jest.fn()
const mockOnTransfer = jest.fn()

const baseProps = {
  address: '',
  isConnected: false,
  isConnecting: false,
  onConnect: mockOnConnect,
  error: null,
  balance: '100',
  onTransfer: mockOnTransfer,
  isTransfering: false,
  transferError: null,
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('TransferPage', () => {
  it('calls onConnect on mount if not connected', () => {
    render(<TransferPage {...baseProps} />, { wrapper: MemoryRouter })
    expect(mockOnConnect).toHaveBeenCalled()
  })

  it('shows loader when isTransfering is true', () => {
    render(<TransferPage {...baseProps} isTransfering={true} />, { wrapper: MemoryRouter })
    expect(screen.getByText(/transfering tokens/i)).toBeInTheDocument()
  })

  it('shows connecting loader if isConnecting is true', () => {
    render(<TransferPage {...baseProps} isConnecting={true} />, { wrapper: MemoryRouter })
    expect(screen.getByText(/connecting/i)).toBeInTheDocument()
  })

  it('shows error if not connected and not connecting', () => {
    render(<TransferPage {...baseProps} error="Connection error" />, { wrapper: MemoryRouter })
    expect(screen.getByText(/connection error/i)).toBeInTheDocument()
  })

  it('renders wallet info and form if connected and has address', () => {
    render(<TransferPage {...baseProps} isConnected={true} address="0xabc123" />, { wrapper: MemoryRouter })

    expect(screen.getByTestId('wallet-title')).toBeInTheDocument()
    expect(screen.getByTestId('wallet-balance')).toHaveTextContent('100')
    expect(screen.getByRole('button', { name: /transfer/i })).toBeInTheDocument()
  })

  it('navigates back when "Go back to wallet" button is clicked', () => {
    render(<TransferPage {...baseProps} isConnected={true} address="0xabc123" />, { wrapper: MemoryRouter })

    const backButton = screen.getByRole('button', { name: /go back to wallet/i })
    fireEvent.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME)
  })
})
