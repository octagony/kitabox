import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import classes from '@/styles/components/ui/ThemeToggle.module.css';

export function ThemeToggle() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	return (
		<Tooltip label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} withArrow>
			<ActionIcon
				className={classes.toggler}
				variant="light"
				size="xl"
				onClick={toggleColorScheme}
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