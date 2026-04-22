import {FC} from 'react';
import {AppApiErrorDisplay} from '../../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {AppLabel} from '../../../../../../common/components/atoms/AppLabel/AppLabel';
import {AppPageHeading} from '../../../../../../common/components/atoms/AppPageHeading/AppPageHeading';
import {AppSidebarBlock} from '../../../../../../common/components/atoms/AppSidebarBlock/AppSidebarBlock';
import {AppSpinner} from '../../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {AppSwitch} from '../../../../../../common/components/atoms/AppSwitch/AppSwitch';
import {AppToast} from '../../../../../../common/components/atoms/AppToast/AppToast';
import {Pagination} from '../../../../../../common/components/atoms/Pagination/Pagination';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {Color} from '../../../../../../common/utils/design-system/types/Color';
import {
  EntryType,
  GetEntriesOwnResponse,
  GetEntriesOwnError,
  GetEntriesOwnDatesError,
  GetEntriesOwnDatesResponse} from '../../../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {EntryBlock} from '../../../../blocks/EntryBlock/EntryBlock';
import {EntryListQueryParams} from '../validators/entryListQueryParams';
import {ApiResponse} from '../../../../../../common/types/ApiResponse';
import {AppDatepicker} from '../../../../../../common/components/atoms/AppDatepicker/AppDatepicker';
import {Link} from '@tanstack/react-router';
import {AppLink} from '../../../../../../common/components/atoms/AppLink/AppLink';


type EntryListPagePresenterProps = {
  response: ApiResponse<GetEntriesOwnResponse, GetEntriesOwnError>;
  datesResponse: ApiResponse<GetEntriesOwnDatesResponse, GetEntriesOwnDatesError>;
  onPageChanged: (page: number) => void;
  onDateChanged: (date: Date | null) => void;
  onFilter: (type: EntryType, checked: boolean) => void;
  onClearFilters: () => void;
  searchParams: EntryListQueryParams;
}
export const EntryListPagePresenter: FC<EntryListPagePresenterProps> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list);
  const {i18n: i18nEntryTypes} = useAppPartialTranslation((x) => x.utils.objects.entryType);
  if (props.response.isLoading) {
    return (
      <PageContainer className="bg-main">
        <AppSpinner/>
      </PageContainer>
    );
  }
  if (props.response.isError || props.response.data?.error) {
    const error = props.response.data?.error?.error;
    return (
        <PageContainer>
          <AppApiErrorDisplay error={error} />
        </PageContainer>
    );
  }
  const markedDays = props.datesResponse.data?.data?.map((x) => x.value) ?? [];
  const hasFilters = !!props.searchParams.date || !!props.searchParams.type;
  return (
 <PageContainer className="bg-main">
    <div className="flex flex-col max-w-5xl w-full">
      <div className="w-full text-left mb-5 flex">
        <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
        <div className="grow flex flex-row-reverse gap-5 items-center">
        <Link to={route(RouteId.EntryAdd)} className="z-0">
          <AppButton>{t(i18n.buttons.addEntry)}</AppButton>
        </Link>
        <RouteLink to={route(RouteId.WorkoutTypeList)} className="z-0">
          {t(i18n.buttons.types)}
        </RouteLink>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-start">
      <AppSidebarBlock>
      {hasFilters && <AppLink className="absolute top-5 right-5" onClick={props.onClearFilters}>{t(i18n.filter.clearFilters)}</AppLink>}
      <AppLabel className="mb-2 block">{t(i18n.filter.labels.date)}</AppLabel>
      <AppDatepicker dateOnly className="mb-5" markedDays={markedDays} onChange={props.onDateChanged} value={props.searchParams.date}/>
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
    </div>
  </PageContainer>
  );
};
