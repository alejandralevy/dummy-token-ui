import { render, screen, fireEvent } from '@testing-library/react'
import TransferForm from './index'

describe('TransferForm', () => {
  const mockOnTransfer = jest.fn()

  const baseProps = { balance: '100', transferError: null, onTransfer: mockOnTransfer }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('disables button with invalid address and amount', () => {
    render(<TransferForm {...baseProps} />)
    const button = screen.getByRole('button', { name: /transfer/i })
    expect(button).toBeDisabled()
  })

  it('shows address error message if address is invalid', () => {
    render(<TransferForm {...baseProps} />)
    const addressInput = screen.getByPlaceholderText('0x...')
    fireEvent.change(addressInput, { target: { value: 'invalid' } })
    fireEvent.blur(addressInput)
    expect(screen.getByText(/invalid address/i)).toBeInTheDocument()
  })

  it('shows amount error if amount is zero or negative', () => {
    render(<TransferForm {...baseProps} />)
    const amountInput = screen.getByPlaceholderText('25')
    fireEvent.change(amountInput, { target: { value: '0' } })
    fireEvent.blur(amountInput)
    expect(screen.getByText(/greater than 0/i)).toBeInTheDocument()
  })

  it('shows amount error if amount exceeds balance', () => {
    render(<TransferForm {...baseProps} />)
    const amountInput = screen.getByPlaceholderText('25')
    fireEvent.change(amountInput, { target: { value: '200' } })
    fireEvent.blur(amountInput)
    expect(screen.getByText(/exceeds the tokens/i)).toBeInTheDocument()
  })

  it('disables button if address is valid but amount is invalid', () => {
    render(<TransferForm {...baseProps} />)

    fireEvent.change(screen.getByPlaceholderText('0x...'), {
      target: { value: '0xE3FC7040653768Efb2941a6C26FdB868eD36cA99' },
    })
    fireEvent.blur(screen.getByPlaceholderText('0x...'))

    fireEvent.change(screen.getByPlaceholderText('25'), { target: { value: '' } })

    const button = screen.getByRole('button', { name: /transfer/i })
    expect(button).toBeDisabled()
  })

  it('disables button if amount is valid but address is invalid', () => {
    render(<TransferForm {...baseProps} />)

    fireEvent.change(screen.getByPlaceholderText('0x...'), { target: { value: 'invalid' } })
    fireEvent.blur(screen.getByPlaceholderText('0x...'))

    fireEvent.change(screen.getByPlaceholderText('25'), { target: { value: '10' } })
    fireEvent.blur(screen.getByPlaceholderText('25'))

    const button = screen.getByRole('button', { name: /transfer/i })
    expect(button).toBeDisabled()
  })

  it('calls onTransfer when address and amount are valid', () => {
    render(<TransferForm {...baseProps} />)
    fireEvent.change(screen.getByPlaceholderText('0x...'), {
      target: { value: '0xE3FC7040653768Efb2941a6C26FdB868eD36cA99' },
    })
    fireEvent.blur(screen.getByPlaceholderText('0x...'))

    fireEvent.change(screen.getByPlaceholderText('25'), { target: { value: '50' } })
    fireEvent.blur(screen.getByPlaceholderText('25'))

    const button = screen.getByRole('button', { name: /transfer/i })
    fireEvent.click(button)

    expect(mockOnTransfer).toHaveBeenCalledWith({ to: '0xE3FC7040653768Efb2941a6C26FdB868eD36cA99', amount: '50' })
  })

  it('shows transfer error message if transferError is passed', () => {
    render(<TransferForm {...baseProps} transferError="Some error" />)
    expect(screen.getByText(/some error/i)).toBeInTheDocument()
  })
})
