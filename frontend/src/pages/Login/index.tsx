import {
    Container,
    Flex,
} from '@mantine/core';
import { LoginForm } from './components/LoginForm';
import { WelcomeSection } from './components/WelcomeSection';

export function LoginPage() {
    return (
        <Container size="lg">
            <Flex
                align={{ base: 'stretch', md: 'center' }}
                justify="center"
                gap={{ base: 'xl', md: '100' }}
                direction={{ base: 'column', sm: 'row' }}
                h="calc(100vh - 92px)"
            >
                <WelcomeSection />
                <LoginForm />
            </Flex>
        </Container >
    );
}