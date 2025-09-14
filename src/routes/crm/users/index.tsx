import {createFileRoute} from '@tanstack/react-router';
import {UserListPage} from '../../../frontend/crm/components/pages/Users/UserListPage/UserLIstPage';
import {userListQueryParams} from '../../../frontend/crm/components/pages/Users/UserListPage/validators/userListQueryParams';

export const Route = createFileRoute('/crm/users/')({
  component: UserListPage,
  validateSearch: userListQueryParams,
});
