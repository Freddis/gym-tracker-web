import {FC, useEffect, useState} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {
  getCrmTranslationsById,
  patchCrmTranslationsById,
  PatchCrmTranslationsByIdData,
} from '../../../../../common/utils/openapi-client';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {route, RouteId} from '../../../../../common/utils/route';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../../../common/components/atoms/AppTextInput/AppTextInput';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {AppInputError} from '../../../../../common/components/atoms/AppInputError/AppInputError';

const routeApi = getRouteApi(route(RouteId.CrmTranslationUpdate));
export const TranslationUpdatePage: FC = () => {
  const params = routeApi.useParams();
  const navigate = routeApi.useNavigate();
  const toasts = useToasts();
  const client = useQueryClient();
  const {getSmartError, showToastsAndSetErrors} =
    useResponseErrors<
      Exclude<PatchCrmTranslationsByIdData['body'], undefined>
    >();
  const [value, setValue] = useState('');
  const id = !Number.isNaN(Number(params.id)) ? Number(params.id) : 0;
  const response = useQuery({
    queryFn: () =>
      getCrmTranslationsById({
        path: {
          id,
        },
      }),
    queryKey: ['translations', id],
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (response.data?.data) {
      setValue(response.data.data.value);
    }
  }, [response.data?.data]);

  if (response.isLoading) {
    return <AppSpinner />;
  }
  if (!response.isSuccess || response.data.error) {
    return <AppApiErrorDisplay error={response.data?.error?.error} />;
  }

  const onSaveClick = async () => {
    const result = await patchCrmTranslationsById({
      path: {
        id: id,
      },
      body: {
        value,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }

    await client.invalidateQueries({queryKey: ['translations']});
    toasts.addSuccess('Translation successfully updated');
    navigate({
      to: route(RouteId.CrmTranslationList),
    });
  };
  const item = response.data.data;
  return (
    <>
      <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <RouteLink to={route(RouteId.CrmTranslationList)}>
            Tranlation List
          </RouteLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">Edit Translation{item.id.toString()}</span>
        </div>
      </div>
      <AppBlock className="w-full table-fixed">
        <AppBlock className="w-full">
          <AppBlockHeader>Edit Translation {item.id.toString()}</AppBlockHeader>
          <div className="grid grid-cols-1 gap-x-2 gap-y-0 sm:grid-cols-[auto_auto_1fr] items-start sm:gap-x-5  mb-5">
            <AppLabel>Value</AppLabel>
            <div className="relative">
              <AppTextInput
                className="w-200 max-w-full"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <AppInputError
                className="w-[327px] max-w-full "
                error={getSmartError((x) => x.value)}
              />
            </div>
            <div />

            <div />
          </div>
          <div className="mt-5 border-b-1 border-neutral-on-surface" />
          <div className="mt-5 flex flex-row">
            <RouteLink to={route(RouteId.CrmTranslationList)}>Back</RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton onClick={onSaveClick}>Save</AppButton>
            </div>
          </div>
        </AppBlock>
      </AppBlock>
    </>
  );
};
