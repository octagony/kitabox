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

	it('should display timer badge when address exists and timer is active', () => {
		renderWithProviders(
			<MailInfo
				address="test@example.com"
				isAccountLoading={false}
				isDomainsLoading={false}
				onCreateNew={mockOnCreateNew}
				formattedTime="04:30"
				isTimerActive={true}
			/>
		);

		expect(screen.getByText(/04:30/)).toBeInTheDocument();
	});

	it('should not display timer badge when timer is not active', () => {
		renderWithProviders(
			<MailInfo
				address="test@example.com"
				isAccountLoading={false}
				isDomainsLoading={false}
				onCreateNew={mockOnCreateNew}
				formattedTime="04:30"
				isTimerActive={false}
			/>
		);

		expect(screen.queryByText('04:30')).not.toBeInTheDocument();
	});

	it('should display timer badge with blue color when time is more than 1 minute', () => {
		renderWithProviders(
			<MailInfo
				address="test@example.com"
				isAccountLoading={false}
				isDomainsLoading={false}
				onCreateNew={mockOnCreateNew}
				formattedTime="00:30"
				isTimerActive={true}
			/>
		);

		const timerBadge = screen.getByText(/00:30/);
		expect(timerBadge).toBeInTheDocument();
		expect(timerBadge.closest('[data-variant="light"]')).toBeInTheDocument();
	});
});