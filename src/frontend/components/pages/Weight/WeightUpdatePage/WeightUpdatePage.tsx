import {FC, useState} from 'react';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppBlockHeader} from '../../../atoms/AppBlock/components/AppBlockHeader';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {WeightUpdateForm} from '../comon/WeightUpdateForm';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {patchWeightById} from '../../../../utils/openapi-client';
import {useToasts} from '../../../atoms/AppToast/hooks/useToasts';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {useResponseErrors} from '../../../../utils/useResponseErrors';
import {useQuery} from '@tanstack/react-query';
import {getWeightByIdOptions} from '../../../../utils/openapi-client/@tanstack/react-query.gen';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';

const routeApi = getRouteApi('/weight/update/$id');
export const WeightUpdatePage: FC = () => {
  const navigate = useNavigate();
  const params = routeApi.useParams();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
  const toasts = useToasts();
  const {errors, showToastsAndSetErrors} = useResponseErrors();
  const [weight, setWeight] = useState<number| null>(null);
  const id = !Number.isNaN(Number(params.id)) ? Number(params.id) : 0;
  const response = useQuery(getWeightByIdOptions({
    path: {
      id,
    },
  }),
  );
  if (response.isLoading || !response.data) {
    return (
        <PageContainer>
          <AppSpinner />
        </PageContainer>
    );
  }

  const save = async () => {
    if (!weight) {
      return;
    }
    const result = await patchWeightById({
      path: {
        id,
      },
      body: {
        weight: weight,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.weight.update.toasts.success));
    navigate({to: '/entries'});
  };

  return (
    <PageContainer>
       <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <AppLink to="/entries">{t(i18n.list.heading)}</AppLink>
          <span className="ml-2">&gt;&gt;</span>
          <span className="ml-2">{t(i18n.weight.update.heading)}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
        <AppBlockHeader>Add Weight Entry</AppBlockHeader>
          <WeightUpdateForm item={response.data} onUpdate={setWeight} errors={errors}/>
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
          <div className="mt-5 flex flex-row">
            <AppLink to="/entries">Back</AppLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton disabled={!weight} onClick={save}>Save</AppButton>
            </div>
          </div>
      </AppBlock>
    </PageContainer>
  );
};
