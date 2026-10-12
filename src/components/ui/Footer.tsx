import { Container, Group, Image, Text } from "@mantine/core";
import classes from '@/styles/components/ui/Footer.module.css';
import { useTranslation } from "react-i18next";

export function Footer() {
	const { t } = useTranslation();

	return (
		<div className={classes.footer}>
			<Container p={0} className={classes.inner}>
				<Group gap={0} justify="flex-end" wrap="nowrap">
					<Text size="md" >
						<a className={classes.groupDevelopment} href="https://github.com/octagony" target="_blank">
							<Image maw={22} mah={22} className={classes.logo} src="./publlic/githubLogo.svg" />
							{t('footer_developed_by')} Octagony
						</a>
					</Text>
				</Group>
			</Container>
		</div>
	);
}