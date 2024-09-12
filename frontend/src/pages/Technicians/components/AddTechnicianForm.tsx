import { useEffect, useState } from "react";
import { TextInput, PasswordInput, Checkbox, Button, Stack, Title } from "@mantine/core";
import { IconUser, IconMail, IconLock, IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { saveTechnician } from "../api";
import { useTranslation } from "react-i18next";
import { useForm } from "@mantine/form";

interface TechnicianFormProps {
    onTechnicianAdded: () => void;
}

export function AddTechnicianForm({ onTechnicianAdded }: TechnicianFormProps) {
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [generalError, setGeneralError] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        if (generalError !== '') {
            notifications.show({
                title: t('error'),
                message: generalError,
                color: 'red',
                icon: <IconX size={16} />,
            });
        }
        setGeneralError('');
    }, [generalError])

    const form = useForm({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            isAdmin: false
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        setDisableButton(true);
        try {
            await saveTechnician({
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                admin: values.isAdmin,
            });

            notifications.show({
                title: t("common.success"),
                message: t("technicians.success"),
                color: 'green',
                icon: <IconCheck size={16} />,
            });

            form.reset();
            onTechnicianAdded();
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
        } finally {
            setDisableButton(false);
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Title order={3}>{t("technicians.addTechnician")}</Title>
                <TextInput
                    label={t("auth.name")}
                    {...form.getInputProps('fullName')}
                    withAsterisk
                    leftSection={<IconUser size={18} stroke={1.5} />}
                />
                <TextInput
                    label={t("auth.email")}
                    {...form.getInputProps('email')}
                    withAsterisk
                    leftSection={<IconMail size={18} stroke={1.5} />}
                />
                <PasswordInput
                    label={t("auth.password")}
                    {...form.getInputProps('password')}
                    withAsterisk
                    leftSection={<IconLock size={18} stroke={1.5} />}
                />

                <Checkbox
                    label={t("technicians.admin")}
                    {...form.getInputProps('isAdmin', { type: 'checkbox' })}
                    description={t("technicians.adminDescription")}
                />
                <Button disabled={disableButton || !form.isDirty() || Object.keys(form.errors).length !== 0} type="submit">{t("technicians.addTechnician")}</Button>
            </Stack>
        </form>
    );
}
