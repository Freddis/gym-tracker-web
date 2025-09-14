import {createFileRoute} from '@tanstack/react-router';
import {LoginPage} from '../../frontend/website/components/pages/Auth/LoginPage/LoginPage';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});
