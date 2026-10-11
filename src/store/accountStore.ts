import { createStore } from '@tanstack/react-store'
import { APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY } from '#/utils/constants'
import type { IAccountState } from "#/interfaces/IStore.interface";

const initialState: IAccountState = {
  address: '',
  password: '',
  token: null,
  createdAt: null,
}

export const accountStore = createStore<IAccountState>(initialState)

export const accountActions = {
  setAccount: (account: IAccountState) => {
    accountStore.setState(() => account)
    if (typeof window !== 'undefined') {
      localStorage.setItem(APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY, JSON.stringify(account))
    }
  },
  
  clearAccount: () => {
    accountStore.setState(() => initialState)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY)
    }
  },
}