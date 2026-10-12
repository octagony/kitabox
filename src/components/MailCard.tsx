import type { IMessageSummary } from "#/interfaces/IResponses.interface";
import { formatMailDate } from "#/utils/helpers";
import { ActionIcon, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { Tag, Trash } from "lucide-react";
import classes from '@/styles/components/MailCard.module.css';
import { useDeleteMessage } from "#/hooks/useDeleteMessage";
import { motion } from 'motion/react';

export function MailCard({ message }: { message: IMessageSummary; }) {
	const { mutate: deleteMessage, isPending } = useDeleteMessage();


	const handleDelete = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		deleteMessage(message.id);
	};

	return (
		<Paper
			key={message.id}
			withBorder
			p="md"
			radius="md"
			component={Link}
			to={`/message/${message.id}`}
			style={{ textDecoration: 'none', color: 'inherit', alignItems: 'flex-start' }}
			className={classes.mailCard}
		>
			<Group justify="space-between" wrap="nowrap" align="flex-start">
				<Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
					<Text size="xs" c="dimmed" w={80}>
						{formatMailDate(message.createdAt)}
					</Text>
					<Group gap={4} wrap="nowrap" align="flex-start" mah={20}>
						<Text fw={600} truncate>
							{message.from.name || message.from.address}
						</Text>
						{!message.seen && <Tag size={18} >New</Tag>}
					</Group>
					<Text fw={500} truncate>
						{message.subject || '(No theme)'}
					</Text>
					<Text size="sm" c="dimmed" truncate>
						{message.intro}
					</Text>
				</Stack>

				<Tooltip label="Delete message" withArrow>
					<ActionIcon
						variant="light"
						color="red"
						size="lg"
						onClick={handleDelete}
						loading={isPending}
						aria-label="Delete message"
					>
						<Trash size={18} />
					</ActionIcon>
				</Tooltip>
			</Group>
		</Paper>
	);
}