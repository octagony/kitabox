import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMessages } from "@/hooks/useMailRequest";
import { renderHook, waitFor } from '@testing-library/react';
import type { IMessageSummary } from "@/interfaces/IResponses.interface";
import { getMessagesRequest } from '@/requests/mail.requests';
import { accountActions, accountStore } from '@/store/accountStore';

vi.mock('@/requests/mail.requests', () => ({
  getMessagesRequest: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode; }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);


describe('useMessages hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    accountActions.clearAccount();
  });


  it('Should return empty array when token is null', async () => {
    const { result } = renderHook(() => useMessages(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(getMessagesRequest).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });

  it('Should  fetch message when token exist', async () => {
    accountStore.setState(() => ({
      address: 'test@example.com',
      password: 'secret_password',
      token: 'secret_token',
      createdAt: Date.now(),
    }));

    const mockMessages: IMessageSummary[] = [
      {
        id: '1',
        from: {
          address: 'sender@test.com',
          name: 'Sender'
        },
        subject: 'Test',
        intro: 'Intro',
        seen: false,
        createdAt: '2024-01-01T00:00:00Z'
      },
    ];

    vi.mocked(getMessagesRequest).mockResolvedValueOnce({
      'hydra:member': mockMessages,
    });

    const { result } = renderHook(() => useMessages(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getMessagesRequest).toHaveBeenCalledWith({ data: 'secret_token' });

    expect(result.current.data).toEqual(mockMessages);
  });
});