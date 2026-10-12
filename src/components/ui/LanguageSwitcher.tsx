import { useTranslation } from 'react-i18next';
import { Select } from '@mantine/core';

export function LanguageSwitcher() {
	const { i18n, t } = useTranslation();

	const availableLanguages = [
		{ value: 'en', label: 'EN' },
		{ value: 'ru', label: 'RU' },
	];

	const handleChangeLanguage = (value: string | null) => {
		value && i18n.changeLanguage(value);
	};

	return (
		<Select
			value={i18n.language}
			onChange={handleChangeLanguage}
			data={availableLanguages}
			size="xs"
			w={60}
			variant="filled"
			aria-label={t('language')}
		/>
	);
}