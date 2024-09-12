import { Container, Flex } from '@mantine/core';
import { LastAddedReports } from './components/LastAddedReports';
import { AddReportForm } from './components/AddReportForm';
import { useCallback, useEffect, useState } from 'react';
import { loadReports } from './api';
import { Report } from '../shared/types'


export function HomePage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [lastReports, setLastReports] = useState({
        content: [] as Report[],
    });

    const getReports = useCallback(async () => {
        setLoading(true);
        try {
            const response = await loadReports();
            setLastReports(response.data);
        } catch (error) {
            console.error("Failed to fetch reports:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getReports();
    }, [getReports]);

    return (
        <Container size="lg">
            <Flex
                align={{ base: 'stretch', md: 'center' }}
                direction={{ base: 'column', sm: 'row' }}
                gap="xl"
                justify="center"
                h={{ base: 'auto', sm: 'calc(100vh - 92px)' }}
            >
                <LastAddedReports lastReports={lastReports} loading={loading} />
                <AddReportForm onReportAdded={() => getReports()} />
            </Flex>
        </Container>
    )
}