import { Group, Text } from "@mantine/core";
import ReactRotatingText from 'react-rotating-text';
import classes from '@/styles/components/ui/TypingTitle.module.css';
import { useTranslation } from "react-i18next";

export function TypingTitle() {
	const { t, i18n } = useTranslation();

	return (
		<Group className={classes.typingTitle} justify="center" gap={4}>
			<Text size="lg">{t('typing_title_keep')}</Text>
			<Text size="lg" key={i18n.language}>
				<ReactRotatingText clasName="" items={[t('typing_title_spam'), t('typing_title_junk'), t('typing_title_trash')]} />
			</Text>
			<Text size="lg">{t('typing_title_behind')}</Text>
		</Group>
	);
}