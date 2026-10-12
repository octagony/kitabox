import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { MailCard } from "#/components/MailCard";

const mockMutate = vi.fn();

vi.mock('@/hooks/useDeleteMessage', () => ({
	useDeleteMessage: () => ({
		mutate: mockMutate,
		isPending: false,
	}),
}));

vi.mock('@tanstack/react-router', () => ({
	Link: ({ children, to, ...props }: any) =>
		<a href={to} {...props}>
			{children}
		</a>,
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key,
		i18n: (key: string) => key
	}),
}));

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<MantineProvider>{ui}</MantineProvider>
	);
};

const mockMessage = {
	id: 'new_message_87_a_&',
	from: {
		address: 'sender@test.com',
		name: 'Kate Wilson'
	},
	subject: 'New Subject',
	intro: 'New intro from message',
	seen: false,
	createdAt: '2024-01-01T14:00:00',
};

describe('MailCard component', () => {
	it('should render message details correctly', () => {
		renderWithProviders(<MailCard message={mockMessage} />);

		expect(screen.getByText(mockMessage.from.name)).toBeInTheDocument();

		expect(screen.getByText(mockMessage.subject)).toBeInTheDocument();

		expect(screen.getByText(mockMessage.intro)).toBeInTheDocument();
	});

	it('should delete mutation when delete button is clicked', () => {
		renderWithProviders(<MailCard message={mockMessage} />);

		const deleteButton = screen.getByLabelText('mail_card_delete_message');

		fireEvent.click(deleteButton);

		expect(mockMutate).toHaveBeenCalledWith(mockMessage.id);
	});
});