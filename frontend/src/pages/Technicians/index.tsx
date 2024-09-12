import { useCallback, useEffect, useState } from "react";
import { loadTechnicians } from "./api";
import { Container, Flex, Paper, Input, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { TechnicianTable } from "./components/TechnicianTable";
import { AddTechnicianForm } from "./components/AddTechnicianForm";
import { useSelector } from "react-redux";
import { RootState } from "../shared/state/redux";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


export function TechniciansPage() {
    const authState = useSelector((store: RootState) => store.auth);

    const [loading, setLoading] = useState<boolean>(false);
    const [activePage, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [generalError, setGeneralError] = useState('');
    const { t } = useTranslation();
    const [technicians, setTechnicians] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0
    });

    if (!authState.admin) {
        return <Navigate to={"/"}></Navigate>
    }

    const getTechnicians = useCallback(async (page: number, search: string) => {
        setLoading(true);
        try {
            const response = await loadTechnicians(page, search);
            setTechnicians(response.data);
            setPage(response.data.number + 1);

            if(response.data.content.length === 0) {
                setGeneralError("technicians.noTechnician")
            }

        } catch (error) {
            setGeneralError("common.internalServerError");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getTechnicians(0, searchQuery);
    }, [getTechnicians, searchQuery]);

    const handlePageChange = (page: number) => {
        getTechnicians(page - 1, searchQuery);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.currentTarget.value);
        setPage(1);
        getTechnicians(0, event.currentTarget.value);
    };

    return (
        <Container size="lg">
            <Flex
                align={{ base: 'stretch', md: 'center' }}
                direction={{ base: 'column', sm: 'row' }}
                gap="xl"
                justify="center"
                h={{ base: 'auto', sm: 'calc(100vh - 92px)' }}
            >
                <Paper
                    w={{ base: '100%', sm: '60%' }}
                    shadow="sm"
                    withBorder
                    radius="md"
                    p="xl"
                >
                    <Title order={3}>{t("technicians.technicians")}</Title>
                    <Input
                        my="md"
                        rightSection={<IconSearch size={18} />}
                        radius="md"
                        placeholder={t("technicians.search")}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    <TechnicianTable
                        technicians={technicians}
                        activePage={activePage}
                        disabled={loading}
                        error={generalError}
                        onPageChange={handlePageChange}
                    />
                </Paper>

                <Paper
                    w={{ base: '100%', sm: '40%' }}
                    shadow="sm"
                    withBorder
                    radius="md"
                    p="xl"
                >
                    <AddTechnicianForm onTechnicianAdded={() => getTechnicians(0, searchQuery)} />
                </Paper>
            </Flex>
        </Container>
    );
}
