import { Table, Pagination, Group, Alert, Stack, LoadingOverlay } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { Technician } from '../../shared/types'
import { useTranslation } from "react-i18next";


interface TechnicianTableProps {
    technicians: {
        content: Technician[];
        totalPages: number;
    };
    activePage: number;
    error: string;
    disabled: boolean;
    onPageChange: (page: number) => void;
}

export function TechnicianTable({
    technicians,
    activePage,
    error,
    disabled,
    onPageChange,
}: TechnicianTableProps) {
    const { t } = useTranslation();
    const rows = technicians.content.map((technician: Technician) => (
        <Table.Tr key={technician.hospitalIdentityNumber}>
            <Table.Td>{technician.fullName}</Table.Td>
            <Table.Td>{technician.hospitalIdentityNumber}</Table.Td>
            <Table.Td>{technician.email}</Table.Td>
            <Table.Td>{technician.admin ? t("common.yes") : t("common.no")}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Stack w={"100%"} pos={"relative"}>
            <LoadingOverlay visible={disabled} />

            <Table.ScrollContainer minWidth={600} pb={"sm"} >
                <Table pos={'relative'} striped highlightOnHover verticalSpacing="xs">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={'22%'}>{t("auth.name")}</Table.Th>
                            <Table.Th w={'23%'}>{t("technicians.technicianId")}</Table.Th>
                            <Table.Th w={'40%'}>{t("auth.email")}</Table.Th>
                            <Table.Th w={'15%'}>{t("technicians.admin")}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            {technicians.totalPages > 1 && (
                <Pagination.Root total={technicians.totalPages} size={"sm"} value={activePage} onChange={onPageChange} disabled={disabled}>
                    <Group w={"100%"} gap={5} justify="center">
                        <Pagination.First />
                        <Pagination.Previous />
                        <Pagination.Items />
                        <Pagination.Next />
                        <Pagination.Last />
                    </Group>
                </Pagination.Root>
            )}

            {(technicians.content.length === 0) &&
                <Alert variant="light" color="red" title={t("common.error")} icon={<IconExclamationCircle />}>
                    {t(error)}
                </Alert>
            }
        </Stack>
    );
}
