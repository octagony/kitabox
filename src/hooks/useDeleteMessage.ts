import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMessageRequest } from '#/requests/mail.requests'
import { accountStore } from '#/store/accountStore'
import { APP_QUERY_MESSAGES_KEY } from '#/utils/constants'
import { notifications } from '@mantine/notifications'

export const useDeleteMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (messageId: string) => {
      const token = accountStore.state.token
      if (!token) {
				throw new Error('No token available')
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
        title: 'Failed to delete message',
        message: err.message || 'Please try again',
        color: 'red',
        autoClose: 5000,
      })
    },

    onSuccess: () => {
      notifications.show({
        title: 'Message deleted',
        message: 'The message has been removed',
        color: 'green',
        autoClose: 3000,
      })
      
      queryClient.invalidateQueries({ queryKey: [APP_QUERY_MESSAGES_KEY] })
    },
  })
}