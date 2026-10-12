import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { accountStore, accountActions } from '@/store/accountStore'
import { APP_ACCOUNT_LIFETIME_MS } from '@/utils/constants'
import { useAccountTimer } from "@/hooks/useAccountTimer";

describe('useAccountTimer hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    accountActions.clearAccount()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

	 it('should initialize with full time when account exists', () => {
    accountStore.setState(() => ({
      address: 'address@example.com',
      password: 'secret_pass',
      token: 'secret_token',
      createdAt: Date.now(),
    }))

    const { result } = renderHook(() => useAccountTimer(vi.fn()))

    expect(result.current.isActive).toBe(true)
    expect(result.current.formattedTime).toBe('05:00')
    expect(result.current.timeLeft).toBe(APP_ACCOUNT_LIFETIME_MS)
  });

	it('should not be active when no account exists', () => {
    const { result } = renderHook(() => useAccountTimer(vi.fn()))

    expect(result.current.isActive).toBe(false)
    expect(result.current.formattedTime).toBe('00:00')
  })

	it('should countdown every second', () => {
    accountStore.setState(() => ({
      address: 'address@example.com',
      password: 'secret_pass',
      token: 'secret_token',
      createdAt: Date.now(),
    }))

    const { result } = renderHook(() => useAccountTimer(vi.fn()))

    expect(result.current.formattedTime).toBe('05:00')

    act(() => {
      vi.advanceTimersByTime(30 * 1000)
    })

    expect(result.current.formattedTime).toBe('04:30')

    act(() => {
      vi.advanceTimersByTime(90 * 1000)
    })

    expect(result.current.formattedTime).toBe('03:00')
  });

	it('should call onExpire callback when time reaches zero', () => {
    const mockOnExpire = vi.fn()
    
    accountStore.setState(() => ({
      address: 'test@example.com',
      password: 'secret_pass',
      token: 'secret_token',
      createdAt: Date.now() - (APP_ACCOUNT_LIFETIME_MS - 1000),
    }))

    const { result } = renderHook(() => useAccountTimer(mockOnExpire))

    expect(result.current.isActive).toBe(true)
    expect(result.current.formattedTime).toBe('00:01')

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.isActive).toBe(false)
    expect(result.current.formattedTime).toBe('00:00')
    
    expect(mockOnExpire).toHaveBeenCalledTimes(1)
  })

	it('should reset timer when account changes', () => {
			accountStore.setState(() => ({
				address: 'test1@example.com',
				password: 'secret_pass1',
				token: 'secret_token1',
				createdAt: Date.now() - 60000,
		}))

		const { result, rerender } = renderHook(() => useAccountTimer(vi.fn()))

		expect(result.current.formattedTime).toBe('04:00')

		act(() => {
			accountStore.setState(() => ({
				address: 'test2@example.com',
				password: 'secret_pass2',
				token: 'secret_token2',
				createdAt: Date.now(),
			}))
		})

		rerender()

		expect(result.current.formattedTime).toBe('05:00')
  })

	it('should format time correctly', () => {
    const testCases = [
      { offset: 0, expected: '05:00' },
      { offset: 30000, expected: '04:30' },
      { offset: 60000, expected: '04:00' },
      { offset: 90000, expected: '03:30' },
      { offset: 299000, expected: '00:01' },
      { offset: 300000, expected: '00:00' },
    ]

    testCases.forEach(({ offset, expected }) => {
      accountStore.setState(() => ({
        address: 'test@example.com',
        password: 'secret_pass',
        token: 'secret_token',
        createdAt: Date.now() - offset,
      }))

      const { result } = renderHook(() => useAccountTimer(vi.fn()))
      expect(result.current.formattedTime).toBe(expected)
    })
  })
})