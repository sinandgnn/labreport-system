import { ActionIcon, Modal, Tooltip, Text, Group, Button } from '@mantine/core';
import { IconCheck, IconLogout } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from '../state/redux';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

interface LogoutButtonProps {
    onClick?: () => void;
}

export function LogoutButton({ onClick }: LogoutButtonProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { t } = useTranslation();


    const handleLogout = () => {
        setModalOpen(false);
        dispatch(logoutSuccess());
        navigate("/login");

        if (onClick) onClick();

        notifications.show({
            title: t('common.success'),
            message: t('auth.logoutSuccess'),
            color: 'green',
            icon: <IconCheck size={16} />,
        });
    };

    return (
        <>
            <Tooltip label={t("auth.logout")} withArrow>
                <ActionIcon
                    variant="default"
                    radius="md"
                    size="xl"
                    onClick={() => setModalOpen(true)}
                >
                    <IconLogout />
                </ActionIcon>
            </Tooltip>
            <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={t("auth.logout")}>
                <Text>{t("auth.logoutConfirm")}</Text>
                <Group mt="md">
                    <Button variant="outline" onClick={() => setModalOpen(false)}>{t("common.cancel")}</Button>
                    <Button color="red" onClick={handleLogout} rightSection={<IconLogout size={16} />}>
                        {t("auth.logout")}
                    </Button>
                </Group>
            </Modal>
        </>
    );
}