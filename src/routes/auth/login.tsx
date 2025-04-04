import {createFileRoute} from '@tanstack/react-router';
import {LoginPage} from 'src/frontend/components/pages/Auth/LoginPage/LoginPage';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});
