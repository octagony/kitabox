import { useState, useEffect } from 'react';
import { useAutoCreateAccount } from '#/hooks/useAutoCreateAccount';
import { useMessages } from '#/hooks/useMailRequest';
import { accountStore, accountActions } from '#/store/accountStore';
import { APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY } from '#/utils/constants';
import { Container, Group, Paper, Stack, Text, Title, Loader } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { MessageCard } from '#/components/MessageCard';
import { MailInfo } from '#/components/MailInfo';
import { checkLocalStorageAccount } from "#/utils/helpers";

export const Route = createFileRoute('/')({ component: MailListPage });

function MailListPage() {
	const [isHydrated, setIsHydrated] = useState(false);

	const { address } = accountStore.state;
	const { createNewAccount, isCreating, isDomainsLoading } = useAutoCreateAccount(isHydrated);
	const { data: messages, isLoading: isMessagesLoading } = useMessages();

	useEffect(() => {
		setIsHydrated(true);
		checkLocalStorageAccount(createNewAccount);
	}, []);

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
						{isMessagesLoading && <Loader size={20} />}
					</Group>

					{!address ? (
						<Paper withBorder p="xl" radius="md" ta="center">
							<Text c="dimmed">Creating your temporary mailbox...</Text>
						</Paper>
					) : messages && messages.length > 0 ? (
						<Stack gap="xs">
							{messages.map((msg) => (
								<MessageCard key={msg.id} message={msg} />
							))}
						</Stack>
					) : (
						<Paper withBorder p="xl" radius="md" ta="center">
							<Text c="dimmed">Waiting for new messages...</Text>
						</Paper>
					)}
				</Stack>
			</Stack>
		</Container>
	);
}