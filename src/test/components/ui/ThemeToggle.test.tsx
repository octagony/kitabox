
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { ThemeToggle } from "#/components/ui/ThemeToggle";

const mockSetColorScheme = vi.fn();
const mockToggleColorScheme = vi.fn();

vi.mock('@mantine/core', async () => {
	const actual = await vi.importActual('@mantine/core');
	return {
		...actual,
		useMantineColorScheme: () => ({
			colorScheme: 'light',
			setColorScheme: mockSetColorScheme,
			toggleColorScheme: mockToggleColorScheme,
		}),
	};
});

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<MantineProvider>{ui}</MantineProvider>
	);
};

describe('ThemeToggle Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		Object.defineProperty(document, 'startViewTransition', {
			value: vi.fn((callback) => {
				callback();
				return { finished: Promise.resolve() };
			}),
			writable: true,
		});
	});

	it('should render the toggle button with correct aria-label', () => {
		renderWithProviders(<ThemeToggle />);
		expect(screen.getByLabelText('Toggle color scheme')).toBeInTheDocument();
	});

	it('should call setColorScheme with "dark" when clicked (if current is "light")', () => {
		renderWithProviders(<ThemeToggle />);

		const button = screen.getByLabelText('Toggle color scheme');
		fireEvent.click(button);

		expect(mockSetColorScheme).toHaveBeenCalledWith('dark');
	});

	it('should call document.startViewTransition when clicked', () => {
		renderWithProviders(<ThemeToggle />);

		const button = screen.getByLabelText('Toggle color scheme');
		fireEvent.click(button);

		expect(document.startViewTransition).toHaveBeenCalled();
	});
});