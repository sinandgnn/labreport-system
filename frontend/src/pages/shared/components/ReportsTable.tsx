import React from 'react';
import { Table, Group, ActionIcon, Tooltip, Stack, Alert } from '@mantine/core';
import { IconExclamationCircle, IconFileDescription, IconTrash, IconZoom } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Report } from '../types'
import { useSelector } from 'react-redux';
import { RootState } from '../state/redux';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface ReportTableProps {
    reports: Report[];
    onViewDetails: (report: Report) => void;
    onDelete: (report: Report) => void;
    showIcons: boolean;
    isLoading: boolean;
}

const ReportTable: React.FC<ReportTableProps> = ({ reports, onViewDetails, showIcons, onDelete, isLoading }) => {
    const authState = useSelector((store: RootState) => store.auth);
    const { t } = useTranslation();

    const rows = reports.map((report) => (
        <Table.Tr key={report.reportNumber}>
            <Table.Td>{report.reportNumber}</Table.Td>
            <Table.Td>{report.technician.fullName}</Table.Td>
            <Table.Td>{report.patient.fullName}</Table.Td>
            <Table.Td>{dayjs(report.reportDate).format('DD-MM-YYYY')}</Table.Td>
            <Table.Td>
                <Group wrap="nowrap">
                    {showIcons &&
                        <Tooltip label={t("reports.view")} withArrow>
                            <ActionIcon variant="filled" onClick={() => onViewDetails(report)}>
                                <IconZoom stroke={1.5} />
                            </ActionIcon>
                        </Tooltip>}

                    <Tooltip label={t("reports.goPage")} withArrow>
                        <ActionIcon variant="filled" component={Link} to={`/report/${report.reportNumber}`}>
                            <IconFileDescription stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>

                    {showIcons &&
                        <Tooltip label={t("reports.delete")} withArrow >
                            <ActionIcon variant="filled" disabled={!authState.admin} onClick={() => onDelete(report)}>
                                <IconTrash stroke={1.5} />
                            </ActionIcon>
                        </Tooltip>}
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Stack w={'100%'}>
            <Table.ScrollContainer minWidth={595} pb={"sm"} >
                <Table pos={'relative'} striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t("reports.number")}</Table.Th>
                            <Table.Th>{t("technicians.technician")}</Table.Th>
                            <Table.Th>{t("reports.patient")}</Table.Th>
                            <Table.Th>{t("reports.date")}</Table.Th>
                            <Table.Th>{t("reports.actions")}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            {(reports.length === 0 && !isLoading) &&
                <Alert variant="light" color="red" title={t("common.error")} icon={<IconExclamationCircle />}>
                    {t("reports.noReport")}
                </Alert>}
        </Stack>
    );
};

export default ReportTable;