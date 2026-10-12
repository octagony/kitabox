import { useAutoCreateAccount } from '@/hooks/useAutoCreateAccount';
import { useMessages } from '@/hooks/useMailRequest';
import { accountStore } from '@/store/accountStore';
import { Container, Group, Paper, Stack, Text, Title, Tooltip, ActionIcon } from '@mantine/core';
import { createFileRoute, useHydrated } from '@tanstack/react-router';
import { MailCard } from '@/components/MailCard';
import { MailInfo } from '@/components/MailInfo';
import { RefreshCcwDotIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute('/')({ component: MailListPage });

function MailListPage() {
	const isHydrated = useHydrated();
	const { address } = accountStore.state;
	const { createNewAccount, isCreating, isDomainsLoading, formattedTime, isActive } = useAutoCreateAccount(isHydrated);
	const { data: messages, refetch: refetchMessages, isRefetching } = useMessages();
	const { t } = useTranslation();

	const handleRefetchMessages = () => {
		refetchMessages();
	};

	if (!isHydrated) {
		return <></>;
	}

	return (
		<Container size="xl" pt={96} pb={76}>
			<Stack gap="xl">
				<MailInfo
					address={address}
					isAccountLoading={isCreating || isDomainsLoading}
					isDomainsLoading={isDomainsLoading}
					onCreateNew={createNewAccount}
					formattedTime={formattedTime}
					isTimerActive={isActive}
				/>

				<Stack gap="md">
					<Group justify="space-between">
						<Title order={3}>
							{t('root_page_incoming')}
						</Title>
						<Tooltip
							label={t('root_page_refresh_messages')} withArrow
						>
							<ActionIcon
								variant="light"
								size="lg"
								onClick={handleRefetchMessages}
								loading={isRefetching}
								disabled={!address}
								aria-label={t('root_page_refresh_messages')}
							>
								<RefreshCcwDotIcon size={18} />
							</ActionIcon>
						</Tooltip>
					</Group>

					{!address ? (
						<Paper
							withBorder
							p="xl"
							radius="md"
							ta="center"
						>
							<Text>
								{t('root_page_creating_mailbox')}...
							</Text>
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
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '8px'
								}}
							>
								{messages.map((msg) => (
									<MailCard key={msg.id} message={msg} />
								))}
							</motion.div>
						</AnimatePresence>
					) : (
						<Paper
							withBorder p="xl"
							radius="md"
							ta="center"
						>
							<Text>
								{t('root_page_waiting_messages')}...
							</Text>
						</Paper>
					)}
				</Stack>
			</Stack>
		</Container >
	);
}