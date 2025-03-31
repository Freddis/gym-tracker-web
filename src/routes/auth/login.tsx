import {createFileRoute} from '@tanstack/react-router';
import {LoginPage} from 'src/components/pages/Auth/LoginPage/LoginPage';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});
