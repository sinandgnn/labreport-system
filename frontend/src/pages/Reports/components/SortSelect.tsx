import { Select } from "@mantine/core";
import { IconArrowsSort } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface SortSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
    const { t } = useTranslation();
    const sortOptions = [
        { value: 'reportDate,desc', label: t("reports.dateNew")},
        { value: 'reportDate,asc', label: t("reports.dateOld") },
        { value: 'reportNumber,desc', label: t("reports.numberDesc")},
        { value: 'reportNumber,asc', label: t("reports.numberAsc") },
    ];
    
    const handleSortChange = (value: string | null) => {
        if (value) {
            onChange(value);
        }
    };

    return (
        <Select
            mt="sm"
            w={{base: "100%", sm: "300"}}
            label={t("reports.sort")}
            data={sortOptions}
            value={value}
            rightSection={<IconArrowsSort size="16" />}
            onChange={handleSortChange}
            mb="md"
        />
    );
};

