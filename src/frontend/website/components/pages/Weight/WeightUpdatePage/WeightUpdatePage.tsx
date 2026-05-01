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
import {getEntriesByIdOptions} from '../../../../../common/utils/openapi-client/@tanstack/react-query.gen';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {route, RouteId} from '../../../../../common/utils/route';
import {api} from '../../../../../common/utils/api';
import {AppToast} from '../../../../../common/components/atoms/AppToast/AppToast';
import {Color} from '../../../../../common/utils/design-system/types/Color';

const routeApi = getRouteApi('/weight/update/$id');
export const WeightUpdatePage: FC = () => {
  const navigate = useNavigate();
  const params = routeApi.useParams();
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
  const toasts = useToasts();
  const {errors, showToastsAndSetErrors} = useResponseErrors();
  const [weight, setWeight] = useState<number| null>(null);
  const response = useQuery(getEntriesByIdOptions({
    path: {
      id: params.id,
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
  if (!response.data.weight) {
    return (
      <PageContainer>
        <AppToast variant={Color.Danger}>{t(i18n.weight.update.toasts.notFound)}</AppToast>
      </PageContainer>
    );
  }

  const save = async () => {
    if (!weight || !response.data.weight) {
      return;
    }
    const result = await patchWeightById({
      path: {
        id: response.data.weight.id,
      },
      body: {
        weight: weight,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.weight.update.toasts.updateSuccess));
    navigate({to: '/entries'});
  };

  const onDeleteClick = async () => {
    const result = await api.deleteEntriesById({
      path: {
        id: params.id,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.weight.update.toasts.deleteSuccess));
    navigate({
      to: route(RouteId.EntryList),
    });
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
          <WeightUpdateForm item={response.data.weight} onUpdate={setWeight} errors={errors}/>
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
          <div className="mt-5 flex flex-row">
            <RouteLink to={route(RouteId.EntryList)}>{translations.utils.generic.buttons.back}</RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton disabled={!weight} onClick={save}>{translations.utils.generic.buttons.save}</AppButton>
              <AppButton onClick={onDeleteClick} color={'error'}>{translations.utils.generic.buttons.delete}</AppButton>
            </div>
          </div>
      </AppBlock>
    </PageContainer>
  );
};
