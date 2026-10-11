import { Loader, Text } from "@mantine/core";

export function MessageLoader() {
	return (
		<>
			<Loader size="lg" />
			<Text mt="md" c="dimmed">Loading message...</Text>
		</>
	);
}