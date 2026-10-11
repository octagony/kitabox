import { Container, Group, Image, Text } from "@mantine/core";
import classes from '@/styles/components/ui/Footer.module.css';

export function Footer() {
	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<Group gap={0} justify="flex-end" wrap="nowrap">
					<Text size="lg">
						<a className={classes.groupDevelopment} href="https://github.com/octagony" target="_blank">
							<Image maw={28} mah={28} className={classes.logo} src="./publlic/githubLogo.svg" />
							Developed by Octagony
						</a>
					</Text>
				</Group>
			</Container>
		</div>
	);
}