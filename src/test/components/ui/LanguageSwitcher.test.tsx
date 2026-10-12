import '@testing-library/jest-dom/vitest';

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { LanguageSwitcher } from "#/components/ui/LanguageSwitcher";

const mockChangeLanguage = vi.fn();

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		i18n: {
			language: 'en',
			changeLanguage: mockChangeLanguage,
		},
		t: (key: string) => key,
	}),
}));

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<MantineProvider>{ui}</MantineProvider>
	);
};

describe('LanguageSwitcher Component', () => {
	it('should render the language selector', () => {
		renderWithProviders(<LanguageSwitcher />);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('should display current language value', () => {
		renderWithProviders(<LanguageSwitcher />);
		const selectInput = screen.getByRole('combobox');
		expect(selectInput).toHaveValue('EN');
	});

	it('should call changeLanguage when a new language is selected', () => {
		renderWithProviders(<LanguageSwitcher />);
		const selectInput = screen.getByRole('combobox');

		fireEvent.change(selectInput, { target: { value: 'ru' } });

		expect(mockChangeLanguage).toHaveBeenCalledWith('ru');
	});

	it('should have correct aria-label for accessibility', () => {
		renderWithProviders(<LanguageSwitcher />);

		const selectInput = screen.getByRole('combobox');
		expect(selectInput).toHaveAttribute('aria-label', 'language');
	});
});