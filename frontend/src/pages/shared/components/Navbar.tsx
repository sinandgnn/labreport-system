import { Stack, Button, Group, UnstyledButton } from "@mantine/core";
import { LightDarkButton } from "./LightDarkButton";
import { LogoutButton } from "./LogoutButton";
import { LanguageSelector } from "./LanguageSelector";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/redux";
import { useTranslation } from "react-i18next";

export const Navbar: React.FC<{ toggle: () => void }> = ({ toggle }) => {
    const authState = useSelector((store: RootState) => store.auth);
    const { t } = useTranslation();

    return (
        <Stack px="lg">
            {authState.id !== 0 && <>
                <Link to="/" onClick={toggle}>
                    <Button variant="transparent" p={"xs"} color="var(--mantine-color-text)">
                        {t("home.home")}
                    </Button>
                </Link>
                <Link to="/reports" onClick={toggle}>
                    <Button variant="transparent" p={"xs"} color="var(--mantine-color-text)">
                        {t("reports.reports")}
                    </Button>
                </Link>
            </>}
            {authState.admin && <>
                <Link to="/technicians" onClick={toggle}>
                    <Button variant="transparent" p={"xs"} color="var(--mantine-color-text)">
                        {t("technicians.technicians")}
                    </Button>
                </Link>
            </>}
            <Group>
                <LightDarkButton />

                {authState.id !== 0 && <LogoutButton onClick={toggle}/>}
                
                <UnstyledButton onClick={toggle}>
                    <LanguageSelector />
                </UnstyledButton>
            </Group>
        </Stack>
    );
};