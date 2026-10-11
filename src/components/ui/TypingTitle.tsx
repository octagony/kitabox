import { Group, Text } from "@mantine/core";
import ReactRotatingText from 'react-rotating-text';
import classes from '@/styles/components/ui/TypingTitle.module.css';

export function TypingTitle() {
	return (
		<Group className={classes.typingTitle} justify="center" gap={4}>
			<Text size="lg">Keep</Text>
			<Text size="lg">
				<ReactRotatingText clasName="" items={['spam', 'junk', 'trash']} />
			</Text>
			<Text size="lg">behind</Text>
		</Group>
	);
}