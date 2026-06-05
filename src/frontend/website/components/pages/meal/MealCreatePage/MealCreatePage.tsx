import {FC} from 'react';
import {
  Entry,
  EntryType,
  EntryVisibility,
  Meal,
  MealEntryUpsertDto,
  MealType,
} from '../../../../../common/utils/openapi-client';
import {useRequiredAuth} from '../../../../../common/components/layout/AuthProvider/utils/useRequiredAuth';
import {v4} from 'uuid';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {route, RouteId} from '../../../../../common/utils/route';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {api} from '../../../../../common/utils/api';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useNavigate} from '@tanstack/react-router';
import {MealCreatePagePresenter} from './components/MealCreatePagePresenter';

export const MealCreatePage: FC = () => {
  const {user} = useRequiredAuth();
  const toasts = useToasts();
  const navigate = useNavigate();
  const {showToastsAndSetErrors} = useResponseErrors<Meal>();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.meals);
  const meal: Meal = {
    type: MealType.BREAKFAST,
    food: [],
  };
  const entry: Entry = {
    id: v4(),
    type: EntryType.MEAL,
    meal,
    user: user,
    visibility: EntryVisibility.PUBLIC,
    time: new Date(),
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    title: null,
    note: null,
    externalId: null,
    externalSource: null,
    healthkitId: null,
    healthkitAnchor: null,
    healthkitAnchors_3_0: null,
    healthkitSource: null,
    healthkitSourceName: null,
    healthkitDevice: null,
    healthkitDeviceName: null,
  };
  const onSave = async (meal: MealEntryUpsertDto) => {
    const response = await api.putEntries({
      body: {
        items: [meal],
      },
    });
    if (response.error) {
      showToastsAndSetErrors(response);
      return;
    }
    toasts.addSuccess(t(i18n.create.toasts.success));
    navigate({to: route(RouteId.EntryList)});
  };
  return <MealCreatePagePresenter meal={meal} entry={entry} onSave={onSave} />;
};
