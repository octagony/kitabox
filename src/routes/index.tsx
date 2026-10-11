import { useCreateAccount, useDomain, useMessages } from "@/hooks/useMailRequest";
import { accountStore } from "@/store/accountStore";
import { Container, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { Loader, } from 'lucide-react';
import { createFileRoute } from "@tanstack/react-router";
import { MessageCard } from "#/components/MessageCard";
import { MailInfo } from "#/components/MailInfo";

export const Route = createFileRoute('/')({ component: MailListPage });

export function MailListPage() {
	const { address } = accountStore.state;
	const { data: domains, isLoading: isDomainsLoading } = useDomain();
	const { mutate: createAccount, isPending: isAccountLoading } = useCreateAccount();
	const { data: messages, isLoading: isMessagesLoading } = useMessages();


	const handleCreateNew = () => {
		if (domains && domains.length > 0) {
			const randomDomain = domains[Math.floor(Math.random() * domains.length)].domain;
			createAccount({ domain: randomDomain });
		}
	};

	return (
		<Container size="xl">
			<Stack gap="xl">
				<MailInfo
					address={address}
					isAccountLoading={isAccountLoading} isDomainsLoading={isDomainsLoading}
					onCreateNew={handleCreateNew}
				/>
				<Stack gap="md">
					<Group justify="space-between">
						<Title order={3}>Incoming</Title>
						{isMessagesLoading && <Loader size={20} />}
					</Group>

					{messages && messages.length > 0 ? (
						<Stack gap="xs">
							{messages.map((msg) => (
								<MessageCard message={msg} />
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