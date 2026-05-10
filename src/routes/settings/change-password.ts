import {createFileRoute} from '@tanstack/react-router';
import {
  PasswordChangePage,
} from '../../frontend/website/components/pages/settings/PasswordChangePage/PasswordChangePage';

export const Route = createFileRoute('/settings/change-password')({
  component: PasswordChangePage,
});
