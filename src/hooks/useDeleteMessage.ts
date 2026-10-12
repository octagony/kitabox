import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMessageRequest } from '@/requests/mail.requests'
import { accountStore } from '@/store/accountStore'
import { APP_QUERY_MESSAGES_KEY } from '@/utils/constants'
import { notifications } from '@mantine/notifications'
import { useTranslation } from "react-i18next";

export const useDeleteMessage = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (messageId: string) => {
      const token = accountStore.state.token
      if (!token) {
				throw new Error(t('use_delete_message_token_error'))
			}
      
      await deleteMessageRequest({ data: { token, id: messageId } });
      return messageId
    },

    onMutate: async (messageId) => {
      await queryClient.cancelQueries({ queryKey: [APP_QUERY_MESSAGES_KEY] })

      const previousMessages = queryClient.getQueryData([APP_QUERY_MESSAGES_KEY])

      queryClient.setQueryData([APP_QUERY_MESSAGES_KEY], (old: any) => {
        if (!old) {
					return old;
				}
        return old.filter((msg: any) => msg.id !== messageId)
      })

      return { previousMessages }
    },

    onError: (err, _, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData([APP_QUERY_MESSAGES_KEY], context.previousMessages)
      }
      
      notifications.show({
        title: t('use_delete_message_failed_title'),
        message: err.message || t('use_delete_message_failed_try_again'),
        color: 'red',
        autoClose: 5000,
      })
    },

    onSuccess: () => {
      notifications.show({
        message: t('use_delete_message_success_title'),
        color: 'green',
        autoClose: 3000,
      })
      
      queryClient.invalidateQueries({ queryKey: [APP_QUERY_MESSAGES_KEY] })
    },
  })
}