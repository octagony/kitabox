import type { IMessageSummary } from "#/interfaces/IResponses.interface";
import { formatMailDate } from "#/utils/helpers";
import { Group, Paper, Stack, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { Tag } from "lucide-react";

export function MessageCard({ message }: { message: IMessageSummary; }) {
	return (
		<Paper
			key={message.id}
			withBorder
			p="md"
			radius="md"
			component={Link}
			to={`/message/${message.id}`}
			style={{ textDecoration: 'none', color: 'inherit', alignItems: 'flex-start' }}
		>
			<Group justify="space-between" wrap="nowrap" align="flex-start">
				<Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
					<Group gap={4} wrap="nowrap" align="flex-start" mah={20}>
						<Text fw={600} truncate>
							{message.from.name || message.from.address}
						</Text>
						{!message.seen && <Tag size={18} >New</Tag>}
					</Group>
					<Text fw={500} truncate c="dark.6">
						{message.subject || '(No theme)'}
					</Text>
					<Text size="sm" c="dimmed" truncate>
						{message.intro}
					</Text>
				</Stack>
				<Text size="xs" c="dimmed" w={80} ta="right">
					{formatMailDate(message.createdAt)}
				</Text>
			</Group>
		</Paper>
	);
}