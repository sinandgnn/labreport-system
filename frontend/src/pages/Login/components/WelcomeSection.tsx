import { Paper, Stack, Image, Text } from "@mantine/core"
import { useTranslation } from "react-i18next";

export function WelcomeSection() {
    const { t } = useTranslation();

    return (
        <Paper shadow="sm" withBorder radius="md" w={{base: '100%', md: '70%'}}>
            <Stack p="xl" justify="center">
                <Image src="/logo.svg" />
                <Text m={'xs'}>{t('auth.welcomeMessage')}</Text>
            </Stack>
        </Paper>
    )
}