import { Button, LoadingOverlay, Paper, Stack, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react';
import ReportTable from '../../shared/components/ReportsTable';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../shared/state/redux';
import { Report } from '../../shared/types'
import { useTranslation } from 'react-i18next';

interface LastAddedReportsProps {
    lastReports: {
        content: Report[];
    };
    loading: boolean;
}

export function LastAddedReports({ lastReports, loading }: LastAddedReportsProps) {
    const authState = useSelector((store: RootState) => store.auth);
    const { t } = useTranslation();

    return (
        <Paper
            w={{ base: '100%', sm: '60%' }}
            shadow="sm"
            withBorder
            radius="md"
            p="xl"
        >
            <Stack justify="center">
                <Title order={2}>
                    {t("home.welcome")} {authState.fullName}!
                </Title>
                <Title order={3}>
                    {t("home.lastReports")}
                </Title>
                <Stack w="100%" pos={'relative'}>
                    <LoadingOverlay visible={loading} />
                    <ReportTable
                        reports={lastReports.content}
                        onViewDetails={() => { }}
                        onDelete={() => { }}
                        showIcons={false}
                        isLoading={loading}
                    />
                    <Link to="/reports">
                        <Button
                            variant="default"
                            rightSection={<IconArrowRight size={16} />}
                        >
                            {t("home.allReports")}
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Paper>
    )
}
