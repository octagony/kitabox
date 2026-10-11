import { Container, Text } from '@mantine/core';
import classes from '@/styles/components/ui/Header.module.css';

export function Header() {

	return (
		<header className={classes.header}>
			<Container size="xl" className={classes.inner} >
				<Text className={classes.headerTitle}>
				</Text>
			</Container>
		</header>
	);
}