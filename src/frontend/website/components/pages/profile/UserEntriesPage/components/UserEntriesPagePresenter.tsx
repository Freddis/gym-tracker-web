import {FC} from 'react';
import {EntryType, GetEntriesOwnError, GetEntriesOwnResponse, GetFoodError, User} from '../../../../../../common/utils/openapi-client';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {BasicPage} from '../../../../../../common/components/layout/BasicPage/BasicPage';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {AppPageHeading} from '../../../../../../common/components/atoms/AppPageHeading/AppPageHeading';
import {ApiResponse} from '../../../../../../common/types/ApiResponse';
import {AppApiErrorDisplay} from '../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppSpinner} from '../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppLabel} from '../../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppLink} from '../../../../../../common/components/atoms/AppLink/AppLink';
import {AppSidebarBlock} from '../../../../../../common/components/atoms/AppSidebarBlock/AppSidebarBlock';
import {AppToast} from '../../../../../../common/components/atoms/AppToast/AppToast';
import {Pagination} from '../../../../../../common/components/atoms/Pagination/Pagination';
import {Color} from '../../../../../../common/utils/design-system/types/Color';
import {EntryBlock} from '../../../../blocks/EntryBlock/EntryBlock';
import {AppDatepicker} from '../../../../../../common/components/atoms/AppDatepicker/AppDatepicker';
import {AppSwitch} from '../../../../../../common/components/atoms/AppSwitch/AppSwitch';
import {EntryListQueryParams} from '../../../Activities/EntryListPage/validators/entryListQueryParams';
import {UserProfileBlock} from '../../../../layout/UserProfileBlock/UserProfileBlock';

export type GetUserResponse = User;
export type GetUserError = GetFoodError;

interface UserEntriesPagePresenterProps {
  onPageChanged: (page: number) => void;
  onDateChanged: (date: Date | null) => void;
  onFilter: (type: EntryType, checked: boolean) => void;
  onClearFilters: () => void;
  searchParams: EntryListQueryParams;
  response: ApiResponse<GetEntriesOwnResponse, GetEntriesOwnError>;
  userResponse: ApiResponse<GetUserResponse, GetUserError>;
}

export const UserEntriesPagePresenter: FC<UserEntriesPagePresenterProps> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list);
  const {i18n: i18nEntryTypes} = useAppPartialTranslation((x) => x.utils.objects.entryType);
  if (props.response.isLoading || props.userResponse.isLoading) {
    return (
      <PageContainer>
        <AppSpinner />
      </PageContainer>
    );
  }
  if (!props.response.data?.data || !props.userResponse.data?.data) {
    const error = props.response.data?.error?.error;
    return (
      <PageContainer>
        <AppApiErrorDisplay error={error} />
      </PageContainer>
    );
  }
  const user = props.userResponse.data.data;
  const markedDays: Date[] = [];
  const hasFilters = !!props.searchParams.date || !!props.searchParams.type;
  return (
  <PageContainer>
    <BasicPage>
      <div className="w-full text-left mb-5 flex">
          <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="flex flex-col gap-5">
          <UserProfileBlock user={user} />
          <AppSidebarBlock>
            {hasFilters && (
              <AppLink className="absolute top-5 right-5" onClick={props.onClearFilters}>{t(i18n.filter.clearFilters)}</AppLink>
            )}
            <AppLabel className="mb-2 block">{t(i18n.filter.labels.date)}</AppLabel>
            <AppDatepicker
              dateOnly
              className="mb-5"
              markedDays={markedDays}
              onChange={props.onDateChanged}
              value={props.searchParams.date}
            />
            <AppLabel className="mb-2 block">{t(i18n.filter.labels.type)}</AppLabel>
              <div className="mb-5 flex flex-col gap-2">
                {Object.values(EntryType).map((x) => (
                  <AppSwitch
                  className="capitalize"
                  key={x}
                  label={t(i18nEntryTypes[x])}
                  checked={props.searchParams.type?.includes(x) ?? false}
                  onCheckedChange={(e) => props.onFilter(x, e)}
                  />
                ))}
              </div>
          </AppSidebarBlock>
        </div>
        <div className="flex flex-col gap-5 grow w-full" data-testid="main-content">
          {props.response.data?.data && props.response.data.data.items.length > 0 && (
            <>
              {props.response.data.data.items.map((item) => <EntryBlock key={item.id} entry={item} own />)}
              <div className="flex justify-center">
                <Pagination onPageChanged={props.onPageChanged} info={props.response.data?.data.info} />
              </div>
            </>
          )}
          {props.response.data?.data?.items.length === 0 && (
            <AppToast variant={Color.Warning}>{t(i18n.toasts.nothingFound)}</AppToast>
          )}
        </div>
      </div>
    </BasicPage>
  </PageContainer>
  );
};
