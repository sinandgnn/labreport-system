import { Burger, Button, Flex, Group, Image } from "@mantine/core";
import { LanguageSelector } from "./LanguageSelector";
import { LightDarkButton } from "./LightDarkButton";
import { LogoutButton } from "./LogoutButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/redux";
import { useTranslation } from "react-i18next";


interface HeaderProps {
    opened: boolean;
    toggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ opened, toggle }) => {
    const authState = useSelector((store: RootState) => store.auth);
    const { t } = useTranslation();

    return (
        <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group justify="space-between" style={{ flex: 1 }}>
                <Link to="/">
                    <Image h={48} w="auto" fit="contain" src="/logo.png" style={{ cursor: 'pointer' }} />
                </Link>

                <Flex
                    visibleFrom="sm"
                    mih={50}
                    gap="md"
                    justify="flex-end"
                    align="center"
                    direction="row"
                    wrap="nowrap"
                >
                    {authState.id !== 0 && <>
                        <Link to="/">
                            <Button variant="transparent" p={"xs"} color="var(--mantine-color-text)">
                                {t("home.home")}
                            </Button>
                        </Link>
                        <Link to="/reports">
                            <Button variant="transparent" p={"xs"} color="var(--mantine-color-text)">
                                {t("reports.reports")}
                            </Button>
                        </Link>
                    </>}
                    {authState.admin && <>
                        <Link to="/technicians">
                            <Button variant="transparent" p={"xs"} color="var(--mantine-color-text)">
                                {t("technicians.technicians")}
                            </Button>
                        </Link>
                    </>}
                    <LightDarkButton />
                    <LanguageSelector />
                    {authState.id !== 0 && <LogoutButton />}
                </Flex>
            </Group>
        </Group>
    );
}