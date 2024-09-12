import { Modal, Stack, TextInput, Textarea, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { updateReport } from "../api";
import { Report } from "../../shared/types";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface EditReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    report: Report;
    onSave: (updatedReport: Report) => void;
}

export const EditReportModal: React.FC<EditReportModalProps> = ({ isOpen, onClose, report, onSave }) => {
    const [generalError, setGeneralError] = useState('');
    const { t } = useTranslation();

    const form = useForm({
        initialValues: {
            diagnosisTitle: report.diagnosisTitle,
            diagnosisDetails: report.diagnosisDetails,
        },
    });

    useEffect(() => {
        if (generalError !== '') {
            notifications.show({
                title: t('common.error'),
                message: generalError,
                color: 'red',
                icon: <IconX size={16} />,
            });
            setGeneralError('');
        }
    }, [generalError])

    const handleSave = async () => {
        try {
            const updatedReport = await updateReport(report.reportNumber, form.values);
            onSave(updatedReport.data);
            onClose();

            notifications.show({
                title: t("common.success"),
                message: t("reports.editSuccess"),
                color: 'green',
                icon: <IconCheck size={16} />,
            });
        } catch (error: any) {
            if (error.response?.data) {
                if (error.response.data.status === 400) {
                    form.setErrors(error.response.data.validationErrors);
                } else {
                    setGeneralError(error.response.data.message);
                }
            } else {
                setGeneralError(t("common.genericError"));
            }
        }
    };

    return (
        <Modal opened={isOpen} onClose={onClose} title={t("reports.editText", { id: report.reportNumber })}>
            <Stack>
                <form onSubmit={form.onSubmit(handleSave)}>
                    <TextInput
                        label={t("reports.diagnosisTitle")}
                        {...form.getInputProps('diagnosisTitle')}
                    />
                    <Textarea
                        label={t("reports.diagnosisDetails")}
                        autosize
                        maxRows={5}
                        {...form.getInputProps('diagnosisDetails')}
                    />
                    <Group mt="md">
                        <Button variant="outline" onClick={onClose}>{t("common.cancel")}</Button>

                        <Button disabled={!form.isDirty() || Object.keys(form.errors).length !== 0}  type="submit">{t("common.save")}</Button>
                    </Group>
                </form>
            </Stack>
        </Modal>
    );
};
