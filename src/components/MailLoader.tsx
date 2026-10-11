import { Loader, Text } from "@mantine/core";

export function MailLoader() {
	return (
		<>
			<Loader size="lg" />
			<Text mt="md" c="dimmed">Loading message...</Text>
		</>
	);
}