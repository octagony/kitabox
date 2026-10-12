import { QueryClient } from "@tanstack/react-query";
import { APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY } from "./constants";
import { accountActions } from "#/store/accountStore";
import type { IMessageDetail } from "#/interfaces/IResponses.interface";
import DOMPurify from 'isomorphic-dompurify';

// EXPORT DEFAULT QUERY CLIENT
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
})

queryClient.getQueryCache().subscribe((event) => {
  if (event.type === 'updated' || event.query.state.status === 'error') {
    const query = event.query
    if (query.state.error && typeof window !== 'undefined') {
      import('@mantine/notifications').then(({ notifications }) => {
        notifications.show({
          title: 'Error',
          message: query.state.error.message || 'Something went wrong',
          color: 'red',
          autoClose: 5000,
        })
      })
    }
  }
})

queryClient.getMutationCache().subscribe((event) => {
  if (event.type === 'updated' && event.mutation.state.status === 'error') {
    const error = event.mutation.state.error
    if (error && typeof window !== 'undefined') {
      import('@mantine/notifications').then(({ notifications }) => {
        notifications.show({
          title: 'Action failed',
          message: error.message || 'Something went wrong',
          color: 'red',
          autoClose: 5000,
        })
      })
    }
  }
})

export const formatMailDate = (date:string) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const checkLocalStorageAccount = (createAccountFunc:()=>void) => {
const saved = localStorage.getItem(APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (parsed.address && parsed.token) {
          accountActions.setAccount(parsed);
        }

        if (!parsed.address && !parsed.token) {
          accountActions.clearAccount();
          throw new Error('Failed parsed');
        }
      } catch (e) {
        console.error('Failed to parse account', e);
        accountActions.clearAccount();
        createAccountFunc();
      }
  }
}

export const cleanHTML = (message:IMessageDetail | null | undefined) => {
    if (message?.html.length) {
      return message.html.length > 0 ? DOMPurify.sanitize(message.html[0]) : null
    }
    return null;
} 