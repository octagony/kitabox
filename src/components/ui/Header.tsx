import { Container, Image } from '@mantine/core';
import classes from '@/styles/components/ui/Header.module.css';
import { TypingTitle } from "./TypingTitle";

export function Header() {

	return (
		<header className={classes.header}>
			<Container size="xl" className={classes.inner} >
				<Image className={classes.headerLogo} src="./publlic/kitaboxLogo.svg" height={40} maw={200} />
				<TypingTitle />
			</Container>
		</header>
	);
}