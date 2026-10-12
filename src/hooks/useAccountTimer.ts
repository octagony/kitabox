import { useState, useEffect, useCallback, useRef } from 'react'
import { accountStore, accountActions } from '@/store/accountStore'
import { APP_ACCOUNT_LIFETIME_MS } from '@/utils/constants'

export function useAccountTimer(onExpire: () => void) {
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  const { createdAt, address } = accountStore.state

  const calculateTimeLeft = useCallback(() => {
    if (!createdAt || !address) {
      return 0
    }
    return Math.max(0, APP_ACCOUNT_LIFETIME_MS - (Date.now() - createdAt))
  }, [createdAt, address])

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)
  const [isActive, setIsActive] = useState(!!(createdAt && address))

  useEffect(() => {
    const isActiveNow = !!(createdAt && address)
    setIsActive(isActiveNow)
    setTimeLeft(calculateTimeLeft())
  }, [createdAt, address, calculateTimeLeft])

  useEffect(() => {
    if (!isActive || !createdAt) return

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft()
      setTimeLeft(remaining)

      if (remaining === 0) {
        clearInterval(interval)
        setIsActive(false)
        accountActions.clearAccount()
        onExpireRef.current()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, createdAt, calculateTimeLeft])

  const formatTime = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [])

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isActive,
  }
}