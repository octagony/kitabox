import { createStore } from '@tanstack/react-store'
import { APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY } from '@/utils/constants'
import type { IAccountState } from "@/interfaces/IStore.interface";

const initialState: IAccountState = {
  address: '',
  password: '',
  token: null,
  createdAt: null,
}

export const accountStore = createStore<IAccountState>(initialState);

export const accountActions = {
  hydrate: () => {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      const saved = localStorage.getItem(APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as IAccountState
        if (parsed.address && parsed.token) {
          accountStore.setState(() => parsed)
        } 
        
        if (!parsed.address || !parsed.token) {
          localStorage.removeItem(APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY)
        }
      }
    } catch (error) {
      console.error('Failed to hydrate account from localStorage:', error)
      localStorage.removeItem(APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY)
    }
  },
  setAccount: (account: IAccountState) => {
    const newAccount: IAccountState = {
      ...account,
      createdAt: Date.now(),
    }

    accountStore.setState(() => newAccount)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY, JSON.stringify(newAccount))
    }
  },
  
  clearAccount: () => {
    accountStore.setState(() => initialState)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY)
    }
  },
}