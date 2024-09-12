import { Modal, Button, Group, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { useTranslation } from "react-i18next";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const { t } = useTranslation();

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title={t("reports.deleteConfirm")}
        >
            <Text>{t("reports.deleteConfirmText")}</Text>
            <Group mt="md">
                <Button variant="outline" onClick={onClose}>
                    {t("common.cancel")}
                </Button>
                <Button color="red" onClick={onConfirm} rightSection={<IconTrash size={16} />}>
                    {t("common.confirm")}
                </Button>
            </Group>
        </Modal>
    );
}

export default ConfirmDeleteModal;
