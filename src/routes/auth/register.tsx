import {createFileRoute} from '@tanstack/react-router';
import {RegistrationPage} from 'src/frontend/components/pages/Auth/RegistationPage/RegistrationPage';

export const Route = createFileRoute('/auth/register')({
  component: RegistrationPage,
});

