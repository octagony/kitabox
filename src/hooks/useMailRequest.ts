import { createAccountRequest, getDomainsRequest, getMessageRequest, getMessagesRequest, getTokenRequest } from "#/requests/mail.requests";
import { accountActions, accountStore } from "@/store/accountStore";
import { APP_MAIL_TM_BASE_KEY, APP_QUERY_DOMAIN_KEY, APP_QUERY_MESSAGE_KEY, APP_QUERY_MESSAGES_KEY } from "@/utils/constants";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useDomain = () => {
	return useQuery({
		queryKey: [APP_QUERY_DOMAIN_KEY],
		queryFn: () => getDomainsRequest(),
		select: (data) => data[APP_MAIL_TM_BASE_KEY].filter((account) => account.isActive)
	})
}

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ domain }: { domain: string }) => {
      const randomUser = Math.random().toString(36).substring(2, 10)
      const address = `${randomUser}@${domain}`
      const password = Math.random().toString(36).substring(2, 12)

      await createAccountRequest({data: {address, password}})
      const { token } = await getTokenRequest({data: {address, password}});
      
      return { address, password, token };
    },

    onSuccess: (data: IAccountState) => {
      accountActions.setAccount(data)
      queryClient.invalidateQueries({ queryKey: [APP_QUERY_MESSAGES_KEY] })
    },
  })
}

export const useMessages = () => {
  const token = accountStore.state.token;

  return useQuery({
    queryKey: [APP_QUERY_MESSAGES_KEY, token],
    queryFn: () => (token ? getMessagesRequest({data: token}) : Promise.resolve({ 'hydra:member': [] })),
    select: (data) => data['hydra:member'],
    enabled: !!token,
    refetchInterval: 10000, 
    refetchIntervalInBackground: true,
  })
}

export const useMessage = (messageId: string | null) => {
  const token = accountStore.state.token

  return useQuery({
    queryKey: [APP_QUERY_MESSAGE_KEY, messageId],
    queryFn: () => (messageId && token ? getMessageRequest({ data: { token, id: messageId } }) : Promise.resolve(null)),
    enabled: !!token && !!messageId,
  })
}
