import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { TRFlag, USFlag } from 'mantine-flagpack';
import 'mantine-flagpack/styles.css';
import { useTranslation } from 'react-i18next';

export function LanguageSelector() {

    const { i18n } = useTranslation();

    const onSelectLanguage = (language: string) => {
        i18n.changeLanguage(language);
        localStorage.setItem('lang', language);
    }

    return (
        <Group>
            <Tooltip label="Türkçe" withArrow>
                <ActionIcon
                    variant="default"
                    radius="md"
                    size="xl"
                    onClick={() => onSelectLanguage('tr')}
                >
                    <TRFlag style={{ cursor: "pointer" }} w={24} />
                </ActionIcon>
            </Tooltip>

            <Tooltip label="English" withArrow>
                <ActionIcon
                    variant="default"
                    radius="md"
                    size="xl"
                    onClick={() => onSelectLanguage('en')}
                >
                    <USFlag style={{ cursor: "pointer" }} w={24} />
                </ActionIcon>
            </Tooltip>

        </Group>

    )
}