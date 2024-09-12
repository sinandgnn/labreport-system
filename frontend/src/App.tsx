import { AppShell, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { LoginPage } from "./pages/Login";
import { Notifications } from '@mantine/notifications';
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from "./pages/Home";
import { Header } from "./pages/shared/components/Header";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "./pages/shared/components/Navbar";
import { ReportsPage } from "./pages/Reports";
import { ReportPage } from "./pages/Report";
import { Provider } from "react-redux"
import { store } from "./pages/shared/state/redux";
import { PrivateRoute } from "./pages/shared/PrivateRoute";
import { TechniciansPage } from "./pages/Technicians";

export default function App() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <Provider store={store}>
            <MantineProvider theme={theme}>
                <BrowserRouter>
                    <Notifications />
                    <AppShell
                        header={{ height: 60 }}
                        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
                        padding="md"
                    >
                        <AppShell.Header>
                            <Header opened={opened} toggle={toggle} />
                        </AppShell.Header>
                        <AppShell.Navbar py="md" px={4}>
                            <Navbar toggle={toggle} />
                        </AppShell.Navbar>
                        <AppShell.Main>
                            <Routes>
                                <Route path='/login' element={<LoginPage />} />

                                <Route
                                    path="/"
                                    element={
                                        <PrivateRoute>
                                            <HomePage />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path="/"
                                    element={
                                        <PrivateRoute>
                                            <ReportsPage />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path="/reports"
                                    element={
                                        <PrivateRoute>
                                            <ReportsPage />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path="/report"
                                    element={
                                        <PrivateRoute>
                                            <ReportPage />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path="/report/:id"
                                    element={
                                        <PrivateRoute>
                                            <ReportPage />
                                        </PrivateRoute>
                                    }
                                />


                                <Route
                                    path="/technicians"
                                    element={
                                        <PrivateRoute>
                                            <TechniciansPage />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path="*"
                                    element={
                                        <PrivateRoute>
                                            <div>error</div>
                                        </PrivateRoute>
                                    }
                                />

                            </Routes>
                        </AppShell.Main>
                    </AppShell>
                </BrowserRouter>
            </MantineProvider >
        </Provider>
    );
}
