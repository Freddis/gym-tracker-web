import {FC, useState} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {
  getCrmExercisesById,
  patchCrmExercisesById,
  PatchCrmExercisesByIdData,
} from '../../../../../common/utils/openapi-client';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {route, RouteId} from '../../../../../common/utils/route';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {ExerciseUpdateDto, ExerciseUpdateForm} from './components/ExerciseUpdateForm';

const routeApi = getRouteApi(route(RouteId.CrmExerciseUpdate));
export const ExerciseUpdatePage: FC = () => {
  const params = routeApi.useParams();
  const navigate = routeApi.useNavigate();
  const toasts = useToasts();
  const client = useQueryClient();
  const [dto, setDto] = useState<ExerciseUpdateDto| null>(null);
  const {showToastsAndSetErrors} =
    useResponseErrors<
      Exclude<PatchCrmExercisesByIdData['body'], undefined>
    >();
  const response = useQuery({
    queryFn: () =>
      getCrmExercisesById({
        path: {
          id: params.id,
        },
      }),
    queryKey: ['exercises', params.id],
    placeholderData: keepPreviousData,
  });
  if (response.isLoading) {
    return <AppSpinner />;
  }
  if (!response.isSuccess || response.data.error) {
    return <AppApiErrorDisplay error={response.data?.error?.error} />;
  }

  const onSaveClick = async () => {
    const result = await patchCrmExercisesById({
      path: {
        id: params.id,
      },
      body: dto ?? undefined,
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }

    await client.invalidateQueries({queryKey: ['exercises']});
    toasts.addSuccess('Exercise successfully updated');
    navigate({
      to: route(RouteId.CrmExerciseList),
    });
  };
  const item = response.data.data;

  return (
    <>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <RouteLink to={route(RouteId.CrmExerciseList)}>
            Exercise List
          </RouteLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">Edit Exercise {item.id.toString()}</span>
        </div>
      </div>
      <AppBlock className="w-full table-fixed">
          <AppBlockHeader>Edit Exercise {item.id.toString()}</AppBlockHeader>
          <div className="grid grid-cols-1 gap-x-2 gap-y-0 sm:grid-cols-[auto_auto_1fr] items-start sm:gap-x-5  mb-5">
            <ExerciseUpdateForm exercise={item} onChange={setDto} />
          </div>
          <div className="mt-5 border-b-1 border-neutral-on-surface" />
          <div className="mt-5 flex flex-row">
            <RouteLink to={route(RouteId.CrmExerciseList)}>Back</RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton onClick={onSaveClick}>Save</AppButton>
            </div>
          </div>
      </AppBlock>
    </>
  );
};
