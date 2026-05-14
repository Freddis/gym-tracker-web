import {FC} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {keepPreviousData, useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {Exercise, getCrmExercises, patchCrmExercisesById} from '../../../../../common/utils/openapi-client';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {Pagination} from '../../../../../common/components/atoms/Pagination/Pagination';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, routeId, RouteId} from '../../../../../common/utils/route';
import {CrmTable} from '../../../elements/CrmTable/CrmTable';
import {CrmTd} from '../../../elements/CrmTable/CrmTd';
import {AppImage} from '../../../../../common/components/atoms/AppImage/AppImage';
import {AppSearchInput} from '../../../../../common/components/atoms/AppSearchInput/AppSearchInput';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {FaEye, FaEyeSlash, FaPlus} from 'react-icons/fa6';
import {ZodHelper} from '../../../../../../backend/utils/ZodHelper/ZodHelper';
import {Color} from '../../../../../common/utils/design-system/types/Color';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {TableDate} from '../../../elements/TableDate/TableDate';
import {AppSwitch} from '../../../../../common/components/atoms/AppSwitch/AppSwitch';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';

const routeApi = getRouteApi(routeId(RouteId.CrmExerciseList));
export const ExerciseListPage:FC = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const client = useQueryClient();
  const toasts = useToasts();
  const {showToastsAndSetErrors} = useResponseErrors();
  const response = useQuery({
    queryFn: () => getCrmExercises({
      query: {
        page: searchParams.page,
        filter: searchParams.search,
        userId: searchParams.userId,
        parentsOnly: searchParams.parentsOnly,
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
        search: value?.trim() ?? undefined,
        page: 1,
      },
    });
  };
  const onParentsOnSwitchChange = (value: boolean) => {
    navigate({
      search: {
        ...searchParams,
        parentsOnly: value || undefined,
        page: 1,
      },
    });
  };
  const onUserTextInputChange = (value: string| null) => {
    navigate({
      search: {
        ...searchParams,
        userId: ZodHelper.quick((x) => x.numberOrStringNumber, value),
        page: 1,
      },
    });
  };

  const onArchiveClick = async (item: Exercise) => {
    const result = await patchCrmExercisesById({
      path: {
        id: item.id,
      },
      body: {
        isArchived: !item.isArchived,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }

    await client.invalidateQueries({queryKey: ['exercises']});
    toasts.addSuccess('Exercise successfully updated');
  };
  return (
  <>
    <AppBlockHeader className="text-left">Exercise List</AppBlockHeader>
    {response.isLoading && <AppSpinner/>}
    {response.data?.error && <AppApiErrorDisplay error={response.data.error.error}/>}
    {response.data && !response.data.error && (
      <AppBlock className="w-full table-fixed">
        <div className="flex items-center mb-5 gap-5">
        <div className="max-w-100" >
          <AppSearchInput placeholder="Search" onSearch={onSearchChange} value={searchParams.search} />
        </div>
        <div className="max-w-20" >
          <AppSearchInput
          placeholder="User ID"
          minLength={1}
          validator={ZodHelper.validators.numberOrStringNumber}
          onSearch={onUserTextInputChange}
          value={searchParams.userId}
          />
        </div>
        <AppSwitch checked={!!searchParams.parentsOnly} onCheckedChange={onParentsOnSwitchChange} label="Only Parents" />
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
              <CrmTd>Parent</CrmTd>
              <CrmTd>Variations</CrmTd>
              <CrmTd>Muscles</CrmTd>
              <CrmTd>Archived</CrmTd>
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
                <CrmTd className="min-w-30 shrink-0">
                  <RouteLink to={route(RouteId.CrmExerciseUpdate)} params={{id: row.id.toString()}} className="text-on-main">
                    <AppImage src={row.images[0]}/>
                  </RouteLink>
                </CrmTd>
                <CrmTd className="min-w-10">
                  {row.userId}
                </CrmTd>
                <CrmTd className="grow">
                  <RouteLink to={route(RouteId.CrmExerciseUpdate)} params={{id: row.id.toString()}} className="text-on-main">
                    {row.name}
                  </RouteLink>
                </CrmTd>
                <CrmTd>
                  {!row.parentExerciseId && '-'}
                  {!!row.parentExerciseId && (
                    <RouteLink
                      to={route(RouteId.CrmExerciseUpdate)}
                      params={{id: row.parentExerciseId.toString()}}
                      className="text-on-main"
                    >
                      {row.parentExerciseId}
                    </RouteLink>
                  )}
                </CrmTd>
                <CrmTd>{row.variations.length}</CrmTd>
                <CrmTd>
                  <div>
                    {row.muscles.primary.join(', ')}
                  </div>
                  <div>
                    {row.muscles.secondary.join(', ')}
                  </div>
                </CrmTd>
                <CrmTd>{row.isArchived ? 'Yes' : 'No'} </CrmTd>
                <CrmTd>
                  <TableDate>{row.createdAt}</TableDate>
                </CrmTd>
                <CrmTd>
                  <TableDate>{row.createdAt}</TableDate>
                </CrmTd>
                <CrmTd>
                <div className="flex gap-2">
                {!!row.isArchived && (
                  <AppButton palette={Color.Success} className="bg-on-main text-white" onClick={onArchiveClick.bind(null, row)}>
                    <FaEye />
                  </AppButton>
                )}
                {!row.isArchived && (
                  <AppButton palette={Color.Danger} className="bg-on-main text-white" onClick={onArchiveClick.bind(null, row)}>
                    <FaEyeSlash />
                  </AppButton>
                )}
                </div>
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
