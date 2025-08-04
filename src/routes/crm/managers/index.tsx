import {createFileRoute} from '@tanstack/react-router';
import {ManagerListPage} from '../../../frontend/components/pages/crm/Managers/ManagerListPage/ManagerListPage';
import {userListQueryParams} from '../../../frontend/components/pages/crm/Users/UserListPage/validators/userListQueryParams';

export const Route = createFileRoute('/crm/managers/')({
  component: ManagerListPage,
  validateSearch: userListQueryParams,
});

