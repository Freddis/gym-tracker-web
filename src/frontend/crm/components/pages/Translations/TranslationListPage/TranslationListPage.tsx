import {FC} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {getCrmTranslations} from '../../../../../common/utils/openapi-client';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {Pagination} from '../../../../../common/components/atoms/Pagination/Pagination';
import {AppLink} from '../../../../../common/components/atoms/AppLink/AppLink';

const routeApi = getRouteApi('/crm/translations/');
export const TranslationListPage:FC = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const response = useQuery({
    queryFn: () => getCrmTranslations({
      query: {
        page: searchParams.page,
      },
    }),
    queryKey: ['translations', searchParams],
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
    <AppBlockHeader className="text-left">Translation List</AppBlockHeader>
    {response.isLoading && <AppSpinner/>}
    {response.data && !response.data.error && (
      <AppBlock className="w-full table-fixed">
        <table className="w-full table">
          <thead >
            <tr className="font-medium">
              <td className="p-4 border-b-main border-b-1">Id</td>
              <td className="p-4 border-b-main border-b-1">Type</td>
              <td className="p-4 border-b-main border-b-1">Key</td>
              <td className="p-4 border-b-main border-b-1">Translation</td>
              <td className="p-4 border-b-main border-b-1">Auto-Translated</td>
              <td className="p-4 border-b-main border-b-1">Locked</td>
              <td className="p-4 border-b-main border-b-1">Created</td>
              <td className="p-4 border-b-main border-b-1">Updated</td>
            </tr>
          </thead>
          <tbody>
            {response.data.data.items.map((row) => (
              <tr key={row.id} className="border-b-red-200 p1">
                <td className="p-4 border-b-main border-b-1 min-w-20">{row.id}</td>
                <td className="p-4 border-b-main border-b-1">{row.type}</td>
                <td className="p-4 border-b-main border-b-1">
                  <AppLink className="text-on-main">{row.key}</AppLink>
                </td>
                <td className="p-4 border-b-main border-b-1 w-full">{row.value}</td>
                <td className="p-4 border-b-main border-b-1 w-full">{row.auto ? 'Yes' : 'No'}</td>
                <td className="p-4 border-b-main border-b-1 w-full">{row.locked ? 'Yes' : 'No'}</td>
                <td className="p-4 border-b-main border-b-1">{row.createdAt.toISOString()}</td>
                <td className="p-4 border-b-main border-b-1">{row.updatedAt?.toISOString() ?? '-'}</td>
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
