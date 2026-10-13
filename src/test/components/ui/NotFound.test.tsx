import '@testing-library/jest-dom/vitest';

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { NotFound } from "@/components/ui/NotFound";

const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', async () => {
	const actual = await vi.importActual('@tanstack/react-router');
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

const mockTranslation = {
	not_found_title: 'Oops',
	not_found_subtitle: 'This page does not exist',
	message_page_back_to_list: 'Back to list',
};

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				...mockTranslation
			};
			return translations[key] || key;
		},
	}),
}));

vi.mock('@/styles/components/ui/NotFound.module.css', () => ({
	default: {
		notFound: 'notFound',
		notFoundImage: 'notFoundImage',
		notFoundTitle: 'notFoundTitle',
		notFoundSubtitle: 'notFoundSubtitle',
		buttonBack: 'buttonBack',
	},
}));

const renderWithProviders = (ui: React.ReactElement) => {
	return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('NotFound Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render all elements correctly', () => {
		renderWithProviders(<NotFound />);

		expect(screen.getByText(mockTranslation.not_found_title)).toBeInTheDocument();
		expect(screen.getByText(mockTranslation.not_found_subtitle)).toBeInTheDocument();

		expect(screen.getByRole('button', { name: /back to list/i })).toBeInTheDocument();

		const image = screen.getByRole('img');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', './mail.svg');
	});

	it('should call navigate to "/" when back button is clicked', () => {
		renderWithProviders(<NotFound />);

		const backButton = screen.getByRole('button', { name: /back to list/i });
		fireEvent.click(backButton);

		expect(mockNavigate).toHaveBeenCalledTimes(1);
		expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
	});
});