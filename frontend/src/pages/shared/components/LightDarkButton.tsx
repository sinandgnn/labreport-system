import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export function LightDarkButton() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const { t } = useTranslation();

    return (
        <Tooltip label={computedColorScheme === 'light' ? t("theme.darkTheme") : t("theme.lightTheme")} withArrow>
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                radius="md"
                size="xl"
            >
                <IconSun display={computedColorScheme === 'light' ? 'none' : 'block'} size={20} />
                <IconMoon display={computedColorScheme === 'dark' ? 'none' : 'block'} size={20} />
            </ActionIcon>
        </Tooltip>
    );
}