import { QueryClient } from "@tanstack/react-query";
import { APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY } from "./constants";
import { accountActions } from "#/store/accountStore";

// EXPORT DEFAULT QUERY CLIENT
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5,
      // refetchOnWindowFocus: true,
      // retry: 1,
    },
  },
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