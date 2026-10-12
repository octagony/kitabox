import { Loader, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

export function MailLoader() {
	const { t } = useTranslation();

	return (
		<>
			<Loader size="lg" />
			<Text mt="md" c="dimmed">
				{t('mail_loader_loading_message')}...
			</Text>
		</>
	);
}