import {FC, useState} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {WeightUpdateForm} from '../common/WeightUpdateForm';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {patchWeightById} from '../../../../../common/utils/openapi-client';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {getRouteApi, useNavigate} from '@tanstack/react-router';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useQuery} from '@tanstack/react-query';
import {getWeightByIdOptions} from '../../../../../common/utils/openapi-client/@tanstack/react-query.gen';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {route, RouteId} from '../../../../../common/utils/route';

const routeApi = getRouteApi('/weight/update/$id');
export const WeightUpdatePage: FC = () => {
  const navigate = useNavigate();
  const params = routeApi.useParams();
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
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
          <RouteLink to={route(RouteId.EntryList)}>{t(i18n.list.heading)}</RouteLink>
          <span className="mx-2">&gt;&gt;</span>
          <span>{t(i18n.weight.update.heading)}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
        <AppBlockHeader>{t(i18n.weight.update.heading)}</AppBlockHeader>
          <WeightUpdateForm item={response.data} onUpdate={setWeight} errors={errors}/>
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
          <div className="mt-5 flex flex-row">
            <RouteLink to={route(RouteId.EntryList)}>{translations.utils.generic.buttons.back}</RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton disabled={!weight} onClick={save}>{translations.utils.generic.buttons.save}</AppButton>
            </div>
          </div>
      </AppBlock>
    </PageContainer>
  );
};
