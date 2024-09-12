import React, { useEffect, useState } from 'react';
import { Button, FileInput, ScrollArea, Stack, TextInput, Textarea, Title, Paper, NumberInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { DateInput, DateInputProps, DatesProvider } from '@mantine/dates';
import { IconCalendar, IconCheck, IconFaceMask, IconNumber, IconPhoto, IconStethoscope, IconUser, IconX } from '@tabler/icons-react';
import { saveReport } from '../api';
import { RootState } from '../../shared/state/redux';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import 'dayjs/locale/en';
import { useForm } from '@mantine/form';

interface AddReportFormProps {
    onReportAdded: () => void;
}

export const AddReportForm: React.FC<AddReportFormProps> = ({ onReportAdded }) => {
    const authState = useSelector((store: RootState) => store.auth);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string>('');
    const [generalError, setGeneralError] = useState('');
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result as string);
                form.setFieldError('imagePath', undefined)
            };
        } else {
            setImage('');
        }
    }, [file]);

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

    const dateParser: DateInputProps['dateParser'] = (input) => {
        return new Date(dayjs(input).format('YYYY-DD-MM'))
    };

    const form = useForm({
        initialValues: {
            patientFullName: '',
            patientIdentityNumber: '',
            diagnosisTitle: '',
            diagnosisDetails: '',
            reportDate: null,
            imagePath: '',
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        setDisableButton(true);
        try {
            const formattedDate = dayjs(values.reportDate).format('YYYY-MM-DD');

            await saveReport({
                technicianId: authState.id,
                patientIdentityNumber: values.patientIdentityNumber,
                patientFullName: values.patientFullName,
                diagnosisTitle: values.diagnosisTitle,
                diagnosisDetails: values.diagnosisDetails,
                reportDate: formattedDate === "Invalid Date" ? undefined : formattedDate,
                imagePath: image,
            });

            notifications.show({
                title: t("common.success"),
                message: t("reports.addReportSuccess"),
                color: 'green',
                icon: <IconCheck size={16} />,
            });

            form.reset();
            setFile(null);
            setImage('');
            onReportAdded();
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
        <Paper w={{ base: '100%', sm: '40%' }} shadow="sm" withBorder radius="md" py="xl" pl="xl" pr="xs">
            <Title order={3} mb="lg">{t("reports.addReport")}</Title>
            <ScrollArea h={360} offsetScrollbars>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack pr="sm">
                        <TextInput
                            label={t("reports.patientName")}
                            {...form.getInputProps('patientFullName')}
                            withAsterisk
                            leftSection={<IconUser size={18} stroke={1.5} />}
                        />
                        <NumberInput
                            label={t("reports.patientId")}
                            hideControls
                            {...form.getInputProps('patientIdentityNumber')}
                            withAsterisk
                            leftSection={<IconNumber size={18} stroke={1.5} />}
                        />
                        <TextInput
                            label={t("reports.diagnosisTitle")}
                            {...form.getInputProps('diagnosisTitle')}
                            withAsterisk
                            leftSection={<IconFaceMask size={18} stroke={1.5} />}
                        />
                        <Textarea
                            label={t("reports.diagnosisDetails")}
                            autosize
                            maxRows={5}
                            {...form.getInputProps('diagnosisDetails')}
                            withAsterisk
                            leftSection={<IconStethoscope size={18} stroke={1.5} />}
                        />
                        <DatesProvider settings={{ locale: i18n.language }}>
                            <DateInput
                                label={t("reports.reportDate")}
                                valueFormat="DD-MM-YYYY"
                                placeholder={t("reports.dateFormat")}
                                maxDate={new Date()}
                                dateParser={dateParser}
                                {...form.getInputProps('reportDate')}
                                withAsterisk
                                leftSection={<IconCalendar size={18} stroke={1.5} />}
                            />
                        </DatesProvider>
                        <FileInput
                            label={t("reports.image")}
                            placeholder={t("reports.upload")}
                            accept="image/png,image/jpeg"
                            value={file}
                            onChange={setFile}
                            withAsterisk
                            leftSection={<IconPhoto size={18} stroke={1.5} />}
                            error={form.errors.imagePath}
                        />
                        <Button disabled={disableButton || !form.isDirty() || Object.keys(form.errors).length !== 0} type="submit">{t("reports.addReport")}</Button>
                    </Stack>
                </form>
            </ScrollArea>
        </Paper>
    );
};



