import type { IMailInfoComponentProps } from "#/interfaces/IComponent.interface";
import { Button, CopyButton, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { RefreshCw } from "lucide-react";
import classes from "@/styles/components/MailInfo.module.css";


export function MailInfo({ address, onCreateNew, isAccountLoading, isDomainsLoading }: IMailInfoComponentProps) {
	return (
		<Paper withBorder p="md" radius="md" shadow="sm">
			<Group className={classes.mailbox}>
				<Stack gap={4}>
					<Text size="sm">
						Your temporary address:
					</Text>
					<CopyButton value={address} timeout={2000}>
						{({ copied, copy }) => (
							<Tooltip label={copied ? 'Copied' : 'Click to copy'} withArrow position="bottom">
								<Text size="xl" fw={700} style={{ wordBreak: 'break-all' }} className={classes.mailboxText} onClick={copy}>
									{address}
								</Text>
							</Tooltip>
						)}
					</CopyButton>
				</Stack>

				<Group gap="xs">
					<Button
						className={classes.mailBoxButton}
						leftSection={<RefreshCw size={16} />}
						onClick={onCreateNew}
						loading={isAccountLoading || isDomainsLoading}
					>
						New address
					</Button>
				</Group>
			</Group>
		</Paper>
	);
}