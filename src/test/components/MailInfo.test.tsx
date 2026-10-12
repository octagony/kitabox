import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { MailInfo } from "@/components/MailInfo";

const mockLanguage = {
	mail_info_temporary_address_subtitle: 'Your temporary address:',
	mail_info_new_address: 'New address',
	click_to_copy_text: 'Click to copy',
	copied_text: 'Copied',
};

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				...mockLanguage
			};
			return translations[key] || key;
		},
	}),
}));


vi.mock('@tanstack/react-router', () => ({
	Link: ({ children, ...props }: any) =>
		<a {...props}>
			{children}
		</a>,
}));

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<MantineProvider>{ui}</MantineProvider>
	);
};

describe('MailInfo Component', () => {
	const mockOnCreateNew = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render the provided email address correctly', () => {
		const testAddress = 'test@example.com';

		renderWithProviders(
			<MailInfo
				address={testAddress}
				isAccountLoading={false}
				isDomainsLoading={false}
				onCreateNew={mockOnCreateNew}
			/>
		);

		expect(screen.getByText(testAddress)).toBeInTheDocument();

		expect(screen.getByText(mockLanguage.mail_info_new_address)).toBeInTheDocument();
	});

	it('should call onCreateNew when New address button is clicked', () => {
		renderWithProviders(
			<MailInfo
				address="test@example.com"
				isAccountLoading={false}
				isDomainsLoading={false}
				onCreateNew={mockOnCreateNew}
			/>
		);

		const newAddressButton = screen.getByText(mockLanguage.mail_info_new_address);

		fireEvent.click(newAddressButton.closest('button') || newAddressButton);

		expect(mockOnCreateNew).toHaveBeenCalledTimes(1);
	});

	it('should show loading state on the button when isAccountLoading is true', () => {
		renderWithProviders(
			<MailInfo
				address="test@example.com"
				isAccountLoading={true}
				isDomainsLoading={false}
				onCreateNew={mockOnCreateNew}
			/>
		);

		const button = screen.getByText(mockLanguage.mail_info_new_address).closest('button');
		expect(button).toHaveAttribute('data-loading');
	});
});