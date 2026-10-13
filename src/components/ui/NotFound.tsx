import { Button, Container, Image, Stack, Text, Grid } from "@mantine/core";
import { CircleChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import classes from '@/styles/components/ui/NotFound.module.css';
import { useNavigate } from "@tanstack/react-router";

export function NotFound() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleRouteBack = () => {
		navigate({ to: '/' });
	};

	return (
		<Container
			size="md"
			py="xl"
			ta="center"
			mih="100vh"
			className={classes.notFound}
		>
			<Grid columns={1} gap={48} justify="center">
				<Image className={classes.notFoundImage} maw={420} mah={420} src="./mail.svg" />
				<Stack gap={16}>
					<Text className={classes.notFoundTitle}>
						{t('not_found_title')}
					</Text>
					<Text className={classes.notFoundSubtitle}>{t('not_found_subtitle')}</Text>
					<Button
						variant="subtle"
						leftSection={<CircleChevronLeft />}
						className={classes.buttonBack}
						onClick={handleRouteBack}
					>
						{t('message_page_back_to_list')}
					</Button>
				</Stack>
			</Grid>
		</Container >
	);
}