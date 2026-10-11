import { QueryClient } from "@tanstack/react-query";

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