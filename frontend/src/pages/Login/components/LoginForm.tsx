import { Button, Divider, Group, LoadingOverlay, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconLock, IconLogin, IconMail, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { login } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../shared/state/redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

export function LoginForm() {
    const [visible, setVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (generalError !== '') {
            notifications.show({
                title: t('common.error'),
                message: generalError,
                color: 'red',
                icon: <IconX size={16} />,
            });
        }
    }, [generalError])

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        }
    });


    const handleLogin = async (values: typeof form.values) => {
        setGeneralError('');
        setVisible(true);

        const timeoutId = setTimeout(() => {
            notifications.show({
                message: (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: t("common.apiError"),
                        }}
                    />
                ),
                color: 'red',
                position: 'bottom-left',
                autoClose: 15000,
            });
        }, 2000);

        try {
            const response = await login({
                email: values.email,
                password: values.password,
            })

            notifications.clean();
            clearTimeout(timeoutId);
            dispatch(loginSuccess(response.data))
            navigate("/")

            notifications.show({
                title: t("common.success"),
                message: t("auth.loginSuccess"),
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
                clearTimeout(timeoutId);
            } else {
                setGeneralError(t("common.genericError"));
            }
        } finally {
            setVisible(false);
        }
    };

    return (
        <Paper w={{ base: '100%', md: '30%' }} pos='relative' shadow="sm" withBorder radius="md" p="xl">
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            <Group justify="center">
                <Title ta="center" order={2}>{t('auth.login')}</Title>
                <IconLogin />
            </Group>
            <Divider my="md" />
            <form onSubmit={form.onSubmit(handleLogin)}>
                <Stack>
                    <TextInput
                        label={t('auth.email')}
                        {...form.getInputProps('email')}
                        leftSection={<IconMail size={18} stroke={1.5} />}
                    />
                    <PasswordInput
                        label={t('auth.password')}
                        {...form.getInputProps('password')}
                        leftSection={<IconLock size={18} stroke={1.5} />}
                    />
                    <Button disabled={!form.isDirty() || Object.keys(form.errors).length !== 0} type="submit" mt="lg">{t('auth.login')}</Button>
                </Stack>
            </form>
        </Paper>
    )
}