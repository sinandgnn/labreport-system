import { Container, Group, Input, LoadingOverlay, Pagination, Stack, Title } from "@mantine/core";
import ReportTable from "../shared/components/ReportsTable";
import { useCallback, useEffect, useState } from "react";
import { SortSelect } from "./components/SortSelect";
import ReportDetailsModal from "./components/ReportDetailsModal";
import ConfirmDeleteModal from "../shared/components/ConfirmDeleteModal";
import { deleteReport, loadReports } from "./api";
import { IconCheck, IconSearch, IconX } from "@tabler/icons-react";
import { Report } from '../shared/types'
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

export function ReportsPage() {
    const [detailModalOpened, setDetailModalOpened] = useState<boolean>(false);
    const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<Report>();
    const [disabled, setDisabled] = useState<boolean>(false);
    const [sortValue, setSortValue] = useState<string>('reportDate,desc');
    const [activePage, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [generalError, setGeneralError] = useState('');
    const { t } = useTranslation();

    const [reportsPage, setReportsPage] = useState({
        content: [] as Report[],
        totalPages: 0,
    });

    const getReports = useCallback(async (page: number, sort: string, search: string) => {
        setDisabled(true);
        try {
            const response = await loadReports(page, sort, search);
            setReportsPage(response.data);
            setPage(response.data.number + 1);
        } catch (error) {
            setGeneralError(t("common.genericError"));
        } finally {
            setDisabled(false);
        }
    }, [])

    useEffect(() => {
        getReports(0, sortValue, searchQuery);
    }, []);

    const handlePageChange = (page: number) => {
        getReports(page - 1, sortValue, searchQuery);
    };

    const handleSortValue = (sort: string) => {
        setPage(1);
        setSortValue(sort);
        getReports(0, sort, searchQuery);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.currentTarget.value);
        setPage(1);
        getReports(0, sortValue, event.currentTarget.value);
    };

    const handleViewDetails = (element: any) => {
        setSelectedElement(element);
        setDetailModalOpened(true);
    };

    const handleDelete = (element: any) => {
        setSelectedElement(element);
        setDeleteModalOpened(true);
    };

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

    const handleConfirmDelete = async () => {
        if (selectedElement) {
            try {
                await deleteReport(selectedElement.reportNumber);
                setReportsPage(prev => ({
                    ...prev,
                    content: prev.content.filter(report => report.reportNumber !== selectedElement.reportNumber)
                }));
                setSelectedElement(undefined);
                setDeleteModalOpened(false);
                notifications.show({
                    title: t('common.success'),
                    message: t('reports.deleted', { "id": selectedElement.reportNumber }),
                    color: 'green',
                    icon: <IconCheck size={16} />,
                });
            } catch (error) {
                console.error("Failed to delete report:", error);
            }
        }
    };

    return (
        <Container size="lg">
            <Group justify='space-between'>
                <Title order={1}>{t("reports.reports")}</Title>
                <SortSelect value={sortValue} onChange={handleSortValue} />
            </Group>

            <Input
                mb="sm"
                rightSection={<IconSearch size={18} />}
                radius="md"
                placeholder={t("reports.search")}
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <Stack gap={0} align='center' pos={"relative"}>
                <LoadingOverlay visible={disabled} />
                <ReportTable
                    reports={reportsPage.content}
                    onViewDetails={handleViewDetails}
                    onDelete={handleDelete}
                    showIcons={true}
                    isLoading={disabled}
                />
                {reportsPage.totalPages > 1 && <Pagination.Root size={"sm"} total={reportsPage.totalPages} value={activePage} onChange={handlePageChange} disabled={disabled}>
                    <Group w={"100%"} gap={3} justify="center">
                        <Pagination.First />
                        <Pagination.Previous />
                        <Pagination.Items />
                        <Pagination.Next />
                        <Pagination.Last />
                    </Group>
                </Pagination.Root>}
            </Stack>

            {selectedElement && <ReportDetailsModal
                isOpen={detailModalOpened}
                onClose={() => setDetailModalOpened(false)}
                report={selectedElement}
            />}

            <ConfirmDeleteModal
                isOpen={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                onConfirm={handleConfirmDelete}
            />

        </Container>
    )
}