import { useState, useEffect } from 'react';
import { useAutoCreateAccount } from '#/hooks/useAutoCreateAccount';
import { useMessages } from '#/hooks/useMailRequest';
import { accountStore } from '#/store/accountStore';
import { Container, Group, Paper, Stack, Text, Title, Loader, Tooltip, ActionIcon } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { MailCard } from '#/components/MailCard';
import { MailInfo } from '#/components/MailInfo';
import { checkLocalStorageAccount } from "#/utils/helpers";
import { TypingTitle } from "#/components/ui/TypingTitle";
import { RefreshCcwDotIcon } from "lucide-react";

export const Route = createFileRoute('/')({ component: MailListPage });

function MailListPage() {
	const [isHydrated, setIsHydrated] = useState(false);

	const { address } = accountStore.state;
	const { createNewAccount, isCreating, isDomainsLoading } = useAutoCreateAccount(isHydrated);
	const { data: messages, isLoading: isMessagesLoading, refetch: refetchMessages, isRefetching } = useMessages();

	useEffect(() => {
		setIsHydrated(true);
		checkLocalStorageAccount(createNewAccount);
	}, []);

	const handleRefetchMessages = () => {
		refetchMessages();
	};

	if (!isHydrated) {
		return (
			<Container size="xl">
				<Stack gap="xl">
					<Paper withBorder p="md" radius="md" shadow="sm">
						<Group justify="space-between">
							<Text c="dimmed">Loading mailbox...</Text>
							<Loader size="sm" />
						</Group>
					</Paper>
					<Paper withBorder p="xl" radius="md" ta="center">
						<Text c="dimmed">Waiting for new messages...</Text>
					</Paper>
				</Stack>
			</Container>
		);
	}

	return (
		<Container size="xl">
			<Stack gap="xl">
				<MailInfo
					address={address}
					isAccountLoading={isCreating || isDomainsLoading}
					isDomainsLoading={isDomainsLoading}
					onCreateNew={createNewAccount}
				/>

				<Stack gap="md">
					<Group justify="space-between">
						<Title order={3}>Incoming</Title>
						<Tooltip label="Refresh messages" withArrow>
							<ActionIcon
								variant="light"
								size="lg"
								onClick={handleRefetchMessages}
								loading={isRefetching}
								disabled={!address}
								aria-label="Refresh messages"
							>
								<RefreshCcwDotIcon size={18} />
							</ActionIcon>
						</Tooltip>

						{isMessagesLoading && <Loader size={20} />}
					</Group>

					{!address ? (
						<Paper withBorder p="xl" radius="md" ta="center">
							<Text>Creating your temporary mailbox...</Text>
						</Paper>
					) : messages && messages.length > 0 ? (
						<Stack gap="xs">
							{messages.map((msg) => (
								<MailCard key={msg.id} message={msg} />
							))}
						</Stack>
					) : (
						<Paper withBorder p="xl" radius="md" ta="center">
							<Text>Waiting for new messages...</Text>
						</Paper>
					)}
				</Stack>
			</Stack>
		</Container >
	);
}