import {FC} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {getCrmExercises} from '../../../../../common/utils/openapi-client';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {Pagination} from '../../../../../common/components/atoms/Pagination/Pagination';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, routeId, RouteId} from '../../../../../common/utils/route';
import {CrmTable} from '../../../elements/CrmTable/CrmTable';
import {CrmTd} from '../../../elements/CrmTable/CrmTd';
import {AppImage} from '../../../../../common/components/atoms/AppImage/AppImage';

const routeApi = getRouteApi(routeId(RouteId.CrmExerciseList));
export const ExerciseListPage:FC = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const response = useQuery({
    queryFn: () => getCrmExercises({
      query: {
        page: searchParams.page,
      },
    }),
    queryKey: ['exercises', searchParams],
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
    <AppBlockHeader className="text-left">Exercise List</AppBlockHeader>
    {response.isLoading && <AppSpinner/>}
    {response.data && !response.data.error && (
      <AppBlock className="w-full table-fixed">
        <CrmTable className="w-full table">
          <thead >
            <tr className="font-medium">
              <CrmTd>Id</CrmTd>
              <CrmTd>Image</CrmTd>
              <CrmTd>Name</CrmTd>
              <CrmTd>Variations</CrmTd>
              <CrmTd>Created</CrmTd>
              <CrmTd>Updated</CrmTd>
              <CrmTd>Actions</CrmTd>
            </tr>
          </thead>
          <tbody>
            {response.data.data.items.map((row) => (
              <tr key={row.id} className="border-b-red-200 p1">
                <CrmTd className="min-w-20">
                  <RouteLink to={route(RouteId.CrmTranslationUpdate)} params={{id: row.id.toString()}} className="text-on-main">
                    {row.id}
                  </RouteLink>
                </CrmTd>
              <CrmTd className="min-w-20">
                  <RouteLink to={route(RouteId.CrmTranslationUpdate)} params={{id: row.id.toString()}} className="text-on-main">
                    <AppImage src={row.images[0]}/>
                  </RouteLink>
                </CrmTd>
                <CrmTd>
                  <RouteLink to={route(RouteId.CrmTranslationUpdate)} params={{id: row.id.toString()}} className="text-on-main">
                    {row.name}
                  </RouteLink>
                </CrmTd>
                <CrmTd>{row.variations.length}</CrmTd>
                <CrmTd>{row.createdAt.toISOString()}</CrmTd>
                <CrmTd>{row.updatedAt?.toISOString() ?? '-'}</CrmTd>
                <CrmTd>
                 ...
                </CrmTd>
              </tr>
            ))}
          </tbody>
        </CrmTable>
        <Pagination info={response.data.data.info} className="mt-10" onPageChanged={onPageChanged}/>
      </AppBlock>
    )}
  </>
  );
};
