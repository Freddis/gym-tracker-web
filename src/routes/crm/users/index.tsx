import {createFileRoute} from '@tanstack/react-router';
import {UserListPage} from '../../../frontend/components/pages/crm/Users/UserListPage/UserLIstPage';
import {userListQueryParams} from '../../../frontend/components/pages/crm/Users/UserListPage/validators/userListQueryParams';

export const Route = createFileRoute('/crm/users/')({
  component: UserListPage,
  validateSearch: userListQueryParams,
});
