import { render, screen, fireEvent } from '@testing-library/react'
import ConnectionError from './index'

describe('ConnectionError', () => {
  it('renders the default error message', () => {
    render(<ConnectionError />)
    expect(screen.getByText(/there was an error connecting your wallet/i)).toBeInTheDocument()
  })

  it('renders additional error message if provided', () => {
    render(<ConnectionError error="Test error" />)
    expect(screen.getByText(/\(test error\)/i)).toBeInTheDocument()
  })

  it('renders the retry button if onRetry is provided', () => {
    const mockRetry = jest.fn()
    render(<ConnectionError onRetry={mockRetry} />)

    const button = screen.getByRole('button', { name: /try again/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(mockRetry).toHaveBeenCalled()
  })

  it('does not render retry button if onRetry is not provided', () => {
    render(<ConnectionError />)
    const buttons = screen.queryByRole('button', { name: /try again/i })
    expect(buttons).not.toBeInTheDocument()
  })
})
