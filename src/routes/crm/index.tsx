import {createFileRoute} from '@tanstack/react-router';
import {LoginPage} from '../../frontend/components/pages/crm/LoginPage/LoginPage';

export const Route = createFileRoute('/crm/')({
  component: LoginPage,
  notFoundComponent: () => LoginPage,
});

