import { Modal, Button } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import ReportDetails from "../../Report/components/ReportDetails";
import { Link } from "react-router-dom";
import { Report } from "../../shared/types"
import { useTranslation } from "react-i18next";

interface ReportDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    report: Report;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ isOpen, onClose, report }) => {
    const { t } = useTranslation();

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title={t("reports.reportDetail")}
        >
            {report && (
                <>
                    <ReportDetails report={report} showAllDetails={false} />
                    <Link to={`../report/${report.reportNumber}`}>
                        <Button my="sm" variant="default" rightSection={<IconPhoto size={16} />}>
                            {t("reports.goPage")}
                        </Button>
                    </Link>
                </>
            )}
        </Modal>
    );
}

export default ReportDetailsModal;
