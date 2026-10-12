import { useEffect, useCallback, useRef } from 'react'
import { accountStore } from '@/store/accountStore'
import { useDomain, useCreateAccount } from '@/hooks/useMailRequest'
import { APP_ACCOUNT_LIFETIME_MS } from "@/utils/constants";

export const useAutoCreateAccount = (isHydrated: boolean) => {
  const { data: domains, isLoading: isDomainsLoading } = useDomain()
  const { mutate: createAccount, isPending: isCreating } = useCreateAccount()
  const hasCheckedOnMount = useRef(false)

  const createNewAccount = useCallback(() => {
    if (domains && domains.length > 0) {
      const randomDomain = domains[Math.floor(Math.random() * domains.length)].domain
      createAccount({ domain: randomDomain })
    }
  }, [domains, createAccount])

  useEffect(() => {
    if (!isHydrated || isDomainsLoading || isCreating || hasCheckedOnMount.current) {
      return
    }

    hasCheckedOnMount.current = true
    const { address } = accountStore.state

    if (!address) {
      createNewAccount()
    }
  }, [isHydrated, isDomainsLoading, isCreating, createNewAccount])

  useEffect(() => {
    const interval = setInterval(() => {
      const { createdAt, address } = accountStore.state

      if (address && createdAt && Date.now() - createdAt >= APP_ACCOUNT_LIFETIME_MS) {
        createNewAccount()
      }
    }, 60 * 1000) 

    return () => clearInterval(interval)
  }, [createNewAccount])

  return { isCreating, isDomainsLoading, createNewAccount }
}