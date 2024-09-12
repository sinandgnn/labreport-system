import { List, ThemeIcon, Text, Stack } from '@mantine/core';
import { IconReportMedical, IconUser, IconFaceMask, IconStethoscope, IconCalendarWeek, IconNurse } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface Report {
    reportNumber: number;
    technician: Technician;
    patient: Patient;
    diagnosisTitle: string;
    diagnosisDetails: string;
    reportDate: string;
}

interface Technician {
    fullName: string;
    hospitalIdentityNumber: number;
    admin: boolean;
}

interface Patient {
    fullName: string;
    identityNumber: number;
}

interface ReportDetailsProps {
    report: Report;
    showAllDetails: boolean;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({ report, showAllDetails }) => {
    const { t } = useTranslation();
    return (
        <List spacing="sm" center>
            <List.Item icon={
                <ThemeIcon color="var(--mantine-color-bright)" size={24} radius="xl">
                    <IconReportMedical color="var(--mantine-color-body)" size={18} />
                </ThemeIcon>}>
                <strong>{t("reports.number")}:</strong> {report.reportNumber}
            </List.Item>

            <List.Item icon={
                <ThemeIcon color="var(--mantine-color-bright)" size={24} radius="xl">
                    <IconUser color="var(--mantine-color-body)" size={18} />
                </ThemeIcon>}>
                <Text>
                    <strong>{t("reports.patient")}:</strong> {report.patient.fullName}
                </Text>

                {showAllDetails &&
                    <Stack gap="0">
                        <Text size="sm"><strong>{t("reports.patientId")}:</strong> {report.patient.identityNumber}</Text>
                    </Stack>}
            </List.Item>

            <List.Item icon={
                <ThemeIcon color="var(--mantine-color-bright)" size={24} radius="xl">
                    <IconFaceMask color="var(--mantine-color-body)" size={18} />
                </ThemeIcon>}>
                <strong>{t("reports.diagnosisTitle")}:</strong> {report.diagnosisTitle}
            </List.Item>

            <List.Item icon={
                <ThemeIcon color="var(--mantine-color-bright)" size={24} radius="xl">
                    <IconStethoscope color="var(--mantine-color-body)" size={18} />
                </ThemeIcon>}>
                <strong>{t("reports.diagnosisDetails")}:</strong> {report.diagnosisDetails}
            </List.Item>

            <List.Item icon={
                <ThemeIcon color="var(--mantine-color-bright)" size={24} radius="xl">
                    <IconCalendarWeek color="var(--mantine-color-body)" size={18} />
                </ThemeIcon>}>
                <strong>{t("reports.reportDate")}</strong> {dayjs(report.reportDate).format('DD-MM-YYYY')}
            </List.Item>

            <List.Item icon={
                <ThemeIcon color="var(--mantine-color-bright)" size={24} radius="xl">
                    <IconNurse color="var(--mantine-color-body)" size={18} />
                </ThemeIcon>}>
                <Text>
                    <strong>{t("technicians.technician")}:</strong> {report.technician.fullName}
                </Text>

                {showAllDetails &&
                    <Stack gap="0">
                        <Text size="sm"><strong>{t("technicians.technicianId")}:</strong> {report.technician.hospitalIdentityNumber}</Text>
                    </Stack>}
            </List.Item>
        </List>
    );
}

export default ReportDetails;
