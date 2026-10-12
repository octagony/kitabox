import { Notifications } from "@mantine/notifications";
import classes from '@/styles/components/ui/DisplayNotification.module.css';
import '@mantine/notifications/styles.css';

export function DisplayNotification() {
	return (
		<Notifications className={classes.notification} position="top-right" limit={3} />
	);
}