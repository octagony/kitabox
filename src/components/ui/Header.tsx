import { Container, Image } from '@mantine/core';
import classes from '@/styles/components/ui/Header.module.css';
import { TypingTitle } from "@/components/ui/TypingTitle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useHydrated } from "@tanstack/react-router";

export function Header() {
	const isHydrated = useHydrated();

	if (!isHydrated) {
		return <></>;
	}

	return (
		<header className={classes.header}>
			<Container size="xl" className={classes.inner} >
				<Image className={classes.headerLogo} src="./kitaboxLogo.svg" height={40} maw={200} />
				<TypingTitle />
				<LanguageSwitcher />
			</Container>
		</header>
	);
}