import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import classes from '@/styles/components/ui/ThemeToggle.module.css';
import { useHydrated } from "@tanstack/react-router";

export function ThemeToggle() {
	const isHydrated = useHydrated();

	const { colorScheme, setColorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	const handleToggleTheme = () => {
		const newScheme = isDark ? 'light' : 'dark';

		document.startViewTransition(() => {
			document.documentElement.setAttribute('data-mantine-color-scheme', newScheme);

			setColorScheme(newScheme);
		});
	};

	if (!isHydrated) {
		return <></>;
	}

	return (
		<Tooltip label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} withArrow>
			<ActionIcon
				className={classes.toggler}
				variant="light"
				size="xl"
				onClick={handleToggleTheme}
				aria-label="Toggle color scheme"
			>
				{isDark ? (
					<Sun size={24} />
				) : (
					<Moon size={24} />
				)}
			</ActionIcon>
		</Tooltip>
	);
}