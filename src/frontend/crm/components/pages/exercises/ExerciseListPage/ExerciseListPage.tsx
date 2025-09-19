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
import {AppSearchInput} from '../../../../../common/components/atoms/AppSearchInput/AppSearchInput';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {FaPlus} from 'react-icons/fa6';
import {ZodHelper} from '../../../../../../backend/utils/ZodHelper/ZodHelper';

const routeApi = getRouteApi(routeId(RouteId.CrmExerciseList));
export const ExerciseListPage:FC = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const response = useQuery({
    queryFn: () => getCrmExercises({
      query: {
        page: searchParams.page,
        filter: searchParams.filter,
        userId: searchParams.userId,
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
  const onSearchChange = (value: string| null) => {
    navigate({
      search: {
        ...searchParams,
        filter: value?.trim() ?? undefined,
        page: 1,
      },
    });
  };

  const onUserChange = (value: string| null) => {
    navigate({
      search: {
        ...searchParams,
        userId: ZodHelper.quick((x) => x.numberOrStringNumber, value),
        page: 1,
      },
    });
  };
  return (
  <>
    <AppBlockHeader className="text-left">Exercise List</AppBlockHeader>
    {response.isLoading && <AppSpinner/>}
    {response.data && !response.data.error && (
      <AppBlock className="w-full table-fixed">
        <div className="flex items-center mb-5 gap-5">
        <AppSearchInput placeholder="Search" className="max-w-100" onSearch={onSearchChange} value={searchParams.filter} />
        <AppSearchInput
         placeholder="User ID"
         minLength={1}
         className="max-w-20"
         validator={ZodHelper.validators.numberOrStringNumber}
         onSearch={onUserChange}
         value={searchParams.userId}
        />
        <div className="grow flex flex-row-reverse">
          <AppButton variant="lg" className="inline-block">Create <FaPlus className="inline-block"/></AppButton>
        </div>
        </div>
        <CrmTable className="w-full table">
          <thead >
            <tr className="font-medium">
              <CrmTd>Id</CrmTd>
              <CrmTd>Image</CrmTd>
              <CrmTd>User ID</CrmTd>
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
                  <RouteLink to={route(RouteId.CrmExerciseUpdate)} params={{id: row.id.toString()}} className="text-on-main">
                    {row.id}
                  </RouteLink>
                </CrmTd>
                <CrmTd className="min-w-20">
                  <RouteLink to={route(RouteId.CrmExerciseUpdate)} params={{id: row.id.toString()}} className="text-on-main">
                    <AppImage src={row.images[0]}/>
                  </RouteLink>
                </CrmTd>
                <CrmTd className="min-w-20">
                  {row.userId}
                </CrmTd>
                <CrmTd>
                  <RouteLink to={route(RouteId.CrmExerciseUpdate)} params={{id: row.id.toString()}} className="text-on-main">
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
