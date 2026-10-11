import type { IMailInfoComponentProps } from "#/interfaces/IComponent.interface";
import { ActionIcon, Button, CopyButton, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { Check, Copy, RefreshCw } from "lucide-react";

export function MailInfo({ address, onCreateNew, isAccountLoading, isDomainsLoading }: IMailInfoComponentProps) {
	return (
		<Paper withBorder p="md" radius="md" shadow="sm">
			<Group justify="space-between" wrap="nowrap">
				<Stack gap={4}>
					<Text size="sm" c="dimmed">
						Your temporary address:
					</Text>
					<Text size="xl" fw={700} style={{ wordBreak: 'break-all' }}>
						{address}
					</Text>
				</Stack>

				<Group gap="xs">
					{address && (
						<CopyButton value={address} timeout={2000}>
							{({ copied, copy }) => (
								<Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
									<ActionIcon color={copied ? 'teal' : 'brand'} variant="light" onClick={copy}>
										{copied ? <Check width={18} height={18} /> : <Copy width={18} height={18} />}
									</ActionIcon>
								</Tooltip>
							)}
						</CopyButton>
					)}

					<Button
						leftSection={<RefreshCw size={16} />}
						onClick={onCreateNew}
						loading={isAccountLoading || isDomainsLoading}
						variant="filled"
					>
						New address
					</Button>
				</Group>
			</Group>
		</Paper>
	);
}