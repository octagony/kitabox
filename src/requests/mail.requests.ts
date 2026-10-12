import type { IAccountResponse, IDomainsResponse, IMessageDeleteResponse, IMessageDetail, IMessagesResponse, ITokenResponse } from "@/interfaces/IResponses.interface";
import { APP_MAIL_TM_BASE_URL } from "@/utils/constants";
import { createServerFn } from '@tanstack/react-start'
import axios from 'axios';


const api = axios.create({
  baseURL: APP_MAIL_TM_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})


export const getDomainsRequest = createServerFn().handler(async () => {
  const response = await api.get<IDomainsResponse>(`${APP_MAIL_TM_BASE_URL}/domains`)
 
  return response.data;
});

export const createAccountRequest = createServerFn()
  .validator((data: { address: string; password: string }) => data)
  .handler(async ({ data }) => {
    const response = await api.post<IAccountResponse>('/accounts', data)
    return response.data;
})

export const getTokenRequest = createServerFn()
  .validator((data: { address: string; password: string }) => data)
  .handler(async ({ data }) => {
    const response = await api.post<ITokenResponse>('/token', data)
    return response.data;
})

export const getMessagesRequest = createServerFn().validator((token: string)=> token).handler(async({data:token})=> {
  const response = await api.get<IMessagesResponse>('/messages', {
      headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
})

export const getMessageRequest = createServerFn()
  .validator((data: { token: string; id: string }) => data)
  .handler(async ({ data }) => {
    const response = await api.get<IMessageDetail>(`/messages/${data.id}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    })
    return response.data
});

export const deleteMessageRequest = createServerFn()
  .validator((data: { token: string; id: string }) => data)
  .handler(async ({ data }) => {
    const response = await api.delete<IMessageDeleteResponse>(`/messages/${data.id}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    })
    return { success: true, id: response.data.id}
  })
