import type { IMailInfoComponentProps } from "@/interfaces/IComponent.interface";
import { Button, CopyButton, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { RefreshCw } from "lucide-react";
import classes from "@/styles/components/MailInfo.module.css";
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from "react-i18next";


export function MailInfo({ address, onCreateNew, isAccountLoading, isDomainsLoading }: IMailInfoComponentProps) {
	const { t } = useTranslation();

	return (
		<Paper withBorder p="md" radius="md" shadow="sm">
			<Group className={classes.mailbox}>
				<Stack gap={4}>
					<Text size="sm">
						{t('mail_info_temporary_address_subtitle')}
					</Text>
					<AnimatePresence mode="wait">
						<motion.div
							key={address || 'empty'}
							initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
							animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							style={{ width: '100%', overflow: 'hidden' }}
						>
							<CopyButton value={address} timeout={2000}>
								{({ copied, copy }) => (
									<Tooltip
										label={copied
											? t('copied_text')
											: t('click_to_copy_text')}
										withArrow
										position="bottom"
									>
										<Text
											size="xl"
											fw={700}
											style={{ wordBreak: 'break-all' }} className={classes.mailboxText}
											onClick={copy}
										>
											{address}
										</Text>
									</Tooltip>
								)}
							</CopyButton>
						</motion.div>
					</AnimatePresence>
				</Stack>

				<Group gap="xs">
					<Button
						className={classes.mailBoxButton}
						leftSection={<RefreshCw size={16} />}
						onClick={onCreateNew}
						loading={isAccountLoading || isDomainsLoading}
					>
						{t('mail_info_new_address')}
					</Button>
				</Group>
			</Group>
		</Paper>
	);
}