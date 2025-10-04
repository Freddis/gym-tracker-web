import {createFileRoute} from '@tanstack/react-router';
import {PasswordResetPage} from '../../frontend/website/components/pages/Auth/PasswordResetPage/PasswordResetPage';

export const Route = createFileRoute('/auth/password-reset')({
  component: PasswordResetPage,
});

