import type { IMessageSummary } from "@/interfaces/IResponses.interface";
import { ActionIcon, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import classes from '@/styles/components/MailCard.module.css';
import { useDeleteMessage } from "@/hooks/useDeleteMessage";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export function MailCard({ message }: { message: IMessageSummary; }) {
	const { mutate: deleteMessage, isPending } = useDeleteMessage();
	const [formattedDate, setFormattedDate] = useState('');

	const { t, i18n } = useTranslation();

	useEffect(() => {
		if (message.createdAt) {
			setFormattedDate(new Date(message.createdAt).toLocaleString(i18n.language));
		}
	}, [i18n.language, message.createdAt]);

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
			<Group
				justify="space-between"
				wrap="nowrap"
				align="flex-start"
			>
				<Stack
					gap={8}
					style={{ flex: 1, minWidth: 0 }}
				>
					<Text
						size="xs"
						c="dimmed"
						w={150}
						key={i18n.language}
					>
						{formattedDate}
					</Text>
					<Group
						gap={4}
						wrap="nowrap"
						align="flex-start"
						mah={20}
					>
						<Text
							fw={600}
							truncate
						>
							{message.from.name || message.from.address}
						</Text>
					</Group>
					<Text
						fw={500}
						truncate
					>
						{message.subject || t('mail_card_no_theme')}
					</Text>
					<Text
						size="sm"
						c="dimmed"
						truncate
					>
						{message.intro}
					</Text>
				</Stack>

				<Tooltip
					label={t('mail_card_delete_message')}
					withArrow
				>
					<ActionIcon
						variant="light"
						color="red"
						size="lg"
						onClick={handleDelete}
						loading={isPending}
						aria-label={t('mail_card_delete_message')}
					>
						<Trash size={18} />
					</ActionIcon>
				</Tooltip>
			</Group>
		</Paper>
	);
}