import { Container, Group, Title, Button, Divider, Grid, Modal, Image, LoadingOverlay, Alert } from "@mantine/core";
import { IconCheck, IconEdit, IconExclamationCircle, IconTrash, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import ReportDetails from "./components/ReportDetails";
import { EditReportModal } from "./components/EditReportModal";
import ConfirmDeleteModal from "../shared/components/ConfirmDeleteModal";
import { getReport } from "./api";
import { deleteReport } from "../Reports/api";
import { useNavigate } from "react-router-dom";
import { Report } from '../shared/types'
import { useSelector } from "react-redux";
import { RootState } from "../shared/state/redux";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

export function ReportPage() {
    const authState = useSelector((store: RootState) => store.auth);
    const navigate = useNavigate();
    const { id } = useParams()
    const [report, setReport] = useState<Report | null>(null);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [imageWidth, setImageWidth] = useState<number | string>('auto');
    const [loading, setLoading] = useState<boolean>(true);
    const [imageExists, setImageExists] = useState<boolean>(true);
    const [generalError, setGeneralError] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        if (id) {
            setLoading(true);
            getReport(Number(id)).then(response => {
                setReport(response.data);
            }).catch(() => {
                setGeneralError(t("common.genericError"));
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [id]);

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
        if (report) {
            try {
                await deleteReport(report.reportNumber);
                setDeleteModalOpened(false);
                navigate("/reports");

                notifications.show({
                    title: t('common.success'),
                    message: t('reports.deleted', {"id": report.reportNumber}),
                    color: 'green',
                    icon: <IconCheck size={16} />,
                });
            } catch (error) {
                setGeneralError(t("common.genericError"));
            }
        }
    };

    const handleEditSave = async (updatedReport: Report) => {
        setReport(updatedReport);
        setEditModalOpened(false);
        try {
            const response = await getReport(updatedReport.reportNumber);
            setReport(response.data);
        } catch (error) {
            console.error("Failed to fetch updated report:", error);
        }
    };

    const [imageModalOpened, setImageModalOpened] = useState(false);

    const handleImageClick = () => {
        setImageModalOpened(true);
    };

    useEffect(() => {
        if (report?.imagePath) {
            const imageUrl = `/reports_img/${report.imagePath}`;

            fetch(imageUrl, { method: 'HEAD' })
                .then(res => {
                    if (!res.ok) {
                        setImageExists(false);
                    } else {
                        setImageExists(true);
                        const img = new window.Image();
                        img.src = imageUrl;
                        img.onload = () => {
                            setImageWidth(img.width > 920 ? '100%' : img.width);
                        };
                    }
                })
                .catch(() => setImageExists(false));
        }
    }, [report?.imagePath]);

    if (!report) {
        return (
            <Container size="lg" pos={"relative"}>
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Group justify='space-between' mt="sm">
                    <Title order={1}>{t("reports.report")} {id} {t("reports.detail")}</Title>
                    <Group mt="md">
                        <Button disabled onClick={() => setEditModalOpened(true)} rightSection={<IconEdit size={16} />} variant="outline">
                            Edit
                        </Button>
                        <Button disabled rightSection={<IconTrash size={16} />} color="red" onClick={() => setDeleteModalOpened(true)}>
                            Delete
                        </Button>
                    </Group>
                </Group>
                <Divider my="md" />
                {!loading && <Alert variant="light" color="red" title="" icon={<IconExclamationCircle />}>
                    There is no such report.
                </Alert>}
            </Container>
        )
    }

    return (
        <Container size="lg" pos={"relative"}>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Group justify='space-between' mt="sm">
                <Title order={1}>{t("reports.report")} {id} {t("reports.detail")}</Title>
                <Group mt="md">
                    <Button onClick={() => setEditModalOpened(true)} rightSection={<IconEdit size={16} />} variant="outline">
                        {t("reports.edit")}
                    </Button>
                    <Button disabled={!authState.admin} rightSection={<IconTrash size={16} />} color="red" onClick={() => setDeleteModalOpened(true)}>
                        {t("reports.delete")}
                    </Button>
                </Group>
            </Group>

            <Divider my="md" />

            <Grid>
                <Grid.Col span={{ base: 12, md: 7 }}>
                    <ReportDetails report={report} showAllDetails />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 5 }}>
                    {imageExists ? (
                        <Image w="100%" style={{ cursor: 'zoom-in' }} src={`/reports_img/${report.imagePath}`} fit="contain" onClick={handleImageClick} />
                    ) : (
                        <Alert variant="light" color="red" title={t("common.error")} icon={<IconExclamationCircle />}>
                            {t("reports.noImage")}
                        </Alert>
                    )}
                </Grid.Col>

            </Grid>

            <Modal
                opened={imageModalOpened}
                onClose={() => setImageModalOpened(false)}
                title={`${t("reports.report")} ${report.reportNumber}`}
                size={imageWidth}
            >
                <Image
                    src={`/reports_img/${report.imagePath}`}
                    fit="contain"
                    mah="920"
                    radius="md" />
            </Modal>

            <ConfirmDeleteModal
                isOpen={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                onConfirm={handleConfirmDelete}
            />

            <EditReportModal
                isOpen={editModalOpened}
                onClose={() => setEditModalOpened(false)}
                report={report}
                onSave={handleEditSave}
            />
        </Container>
    );
}