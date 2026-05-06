import {FC, useState} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {WeightUpdateForm} from '../common/WeightUpdateForm';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {postWeight} from '../../../../../common/utils/openapi-client';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useNavigate} from '@tanstack/react-router';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {route, RouteId} from '../../../../../common/utils/route';
import {BreadCrumbs} from '../../../blocks/BreadCrumbsBlock/types/BreadCrumbs';
import {BreadCrumbsBlock} from '../../../blocks/BreadCrumbsBlock/BreadCrumbsBlock';
import {BasicPage} from '../../../../../common/components/layout/BasicPage/BasicPage';

export const WeightCreatePage: FC = () => {
  const navigate = useNavigate();
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
  const toasts = useToasts();
  const {errors, showToastsAndSetErrors} = useResponseErrors();
  const [weight, setWeight] = useState<number| null>(null);

  const save = async () => {
    if (!weight) {
      return;
    }
    const result = await postWeight({
      body: {
        weight: weight,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.weight.add.toasts.success));
    navigate({to: '/entries'});
  };

  const breadCrumbs: BreadCrumbs = [
    {label: translations.pages.activities.list.heading, url: route(RouteId.EntryList)},
    {label: t(i18n.list.heading), url: route(RouteId.EntryAdd)},
    {label: t(i18n.weight.add.heading), url: route(RouteId.WeightCreate)},
  ];
  return (
    <PageContainer>
      <BasicPage>
        <BreadCrumbsBlock breadCrumbs={breadCrumbs} />
        <AppBlock>
          <AppBlockHeader>{t(i18n.weight.add.heading)}</AppBlockHeader>
          <WeightUpdateForm onUpdate={setWeight} errors={errors}/>
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
          <div className="mt-5 flex flex-row">
            <RouteLink to={route(RouteId.EntryAdd)}>{translations.utils.generic.buttons.back}</RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton disabled={!weight} onClick={save}>{translations.utils.generic.buttons.save}</AppButton>
            </div>
          </div>
        </AppBlock>
      </BasicPage>
    </PageContainer>
  );
};
