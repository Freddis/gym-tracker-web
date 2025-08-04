import {FC} from 'react';
import {AppLink} from '../../../../atoms/AppLink/AppLink';
import {AppBlock} from '../../../../atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../atoms/AppBlock/components/AppBlockHeader';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {getCrmManagers} from '../../../../../utils/openapi-client';
import {AppSpinner} from '../../../../atoms/AppSpinner/AppSpinner';
import {Pagination} from '../../../../atoms/Pagination/Pagination';

const routeApi = getRouteApi('/crm/managers/');
export const ManagerListPage:FC = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const response = useQuery({
    queryFn: () => getCrmManagers({
      query: {
        page: searchParams.page,
      },
    }),
    queryKey: ['users', searchParams],
    placeholderData: keepPreviousData,
  });

  const onPageChanged = (page: number) => {
    navigate({
      search: {
        ...searchParams,
        page,
      },
    });
  };

  return (
  <>
    <AppBlockHeader className="text-left">Manager List</AppBlockHeader>
    {response.isLoading && <AppSpinner/>}
    {response.data && !response.data.error && (
      <AppBlock className="w-full h-full table-fixed">
        <table className="w-full table">
          <thead >
            <tr className="font-medium">
              <td className="p-4 border-b-main border-b-1">Id</td>
              <td className="p-4 border-b-main border-b-1">Name</td>
              <td className="p-4 border-b-main border-b-1">Email</td>
              <td className="p-4 border-b-main border-b-1">Created</td>
              <td className="p-4 border-b-main border-b-1">Updated</td>
            </tr>
          </thead>
          <tbody>
            {response.data.data.items.map((user) => (
              <tr key={user.id} className="border-b-red-200 p1">
                <td className="p-4 border-b-main border-b-1 min-w-20">
                  {user.id}
                </td>
                <td className="p-4 border-b-main border-b-1 w-full">
                  <AppLink className="text-on-main">{user.name}</AppLink>
                </td>
                <td className="p-4 border-b-main border-b-1 w-full">
                  <AppLink className="text-on-main">{user.email}</AppLink>
                </td>
                <td className="p-4 border-b-main border-b-1 min-w-80">
                  {user.createdAt?.toISOString()}
                  </td>
                <td className="p-4 border-b-main border-b-1 min-w-80">
                  {user.updatedAt?.toISOString()}
                  </td>
            </tr>
            ))}
          </tbody>
        </table>
        <Pagination info={response.data.data.info} className="mt-10" onPageChanged={onPageChanged}/>
      </AppBlock>
    )}
  </>
  );
};
