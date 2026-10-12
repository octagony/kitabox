import { useState, useEffect } from 'react';
import { useAutoCreateAccount } from '#/hooks/useAutoCreateAccount';
import { useMessages } from '#/hooks/useMailRequest';
import { accountStore } from '#/store/accountStore';
import { Container, Group, Paper, Stack, Text, Title, Loader, Tooltip, ActionIcon } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { MailCard } from '#/components/MailCard';
import { MailInfo } from '#/components/MailInfo';
import { checkLocalStorageAccount } from "#/utils/helpers";
import { RefreshCcwDotIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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
			<Container size="xl" pt={90}>
				<Stack gap="xl">
					<Paper withBorder p="md" radius="md" shadow="sm">
						<Group justify="space-between">
							<Text c="dimmed">Loading mailbox...</Text>
							<Loader size="sm" />
						</Group>
					</Paper>
				</Stack>
			</Container>
		);
	}

	return (
		<Container size="xl" pt={96} pb={76}>
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
						<AnimatePresence mode="popLayout">
							<motion.div
								variants={{
									hidden: { opacity: 0 },
									show: {
										opacity: 1,
										transition: {
											staggerChildren: 0.07,
										},
									},
								}}
								initial="hidden"
								animate="show"
								style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
							>
								{messages.map((msg) => (
									<MailCard key={msg.id} message={msg} />
								))}
							</motion.div>
						</AnimatePresence>
					) : (
						<Paper withBorder p="xl" radius="md" ta="center">
							<Text>Waiting for new messages... </Text>
						</Paper>
					)}
				</Stack>
			</Stack>
		</Container >
	);
}