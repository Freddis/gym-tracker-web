import {createFileRoute} from '@tanstack/react-router';
import {LoginPage} from '../../frontend/crm/components/pages/LoginPage/LoginPage';

export const Route = createFileRoute('/crm/')({
  component: LoginPage,
  notFoundComponent: () => LoginPage,
});

