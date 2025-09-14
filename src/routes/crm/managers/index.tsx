import {createFileRoute} from '@tanstack/react-router';
import {ManagerListPage} from '../../../frontend/crm/components/pages/Managers/ManagerListPage/ManagerListPage';
import {userListQueryParams} from '../../../frontend/crm/components/pages/Users/UserListPage/validators/userListQueryParams';

export const Route = createFileRoute('/crm/managers/')({
  component: ManagerListPage,
  validateSearch: userListQueryParams,
});

