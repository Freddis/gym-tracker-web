import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {getRouteApi, Link} from '@tanstack/react-router';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {AppButton} from 'src/frontend/components/atoms/AppButton/AppButton';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {Pagination} from '../../../atoms/Pagination/Pagination';
import {AppApiErrorDisplay} from '../../../atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppToast} from '../../../atoms/AppToast/AppToast';
import {Color} from '../../../../utils/design-system/types/Color';
import {EntryType, getEntriesOwn} from '../../../../utils/openapi-client';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {AppLabel} from '../../../atoms/AppLabel/AppLabel';
import {AppPageHeading} from '../../../atoms/AppPageHeading/AppPageHeading';
import {AppSidebarBlock} from '../../../atoms/AppSidebarBlock/AppSidebarBlock';
import {AppSwitch} from '../../../atoms/AppSwitch/AppSwitch';
import {EntryBlock} from '../../../blocks/EntryBlock/EntryBlock';
import {AppLink} from '../../../atoms/AppLink/AppLink';

const routeApi = getRouteApi('/entries/');
export function EntryListPage() {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list);
  const {i18n: i18nEntryTypes} = useAppPartialTranslation((x) => x.utils.objects.entryType);
  const searchParams = routeApi.useSearch();
  const response = useQuery({
    queryFn: () => getEntriesOwn({
      query: {
        page: searchParams.page,
        type: searchParams.type,
      },
    }),
    queryKey: ['workouts', searchParams],
    placeholderData: keepPreviousData,
  });
  const navigate = routeApi.useNavigate();
  const onPageChanged = (page: number) => {
    console.log(searchParams);
    navigate({
      search: {
        ...searchParams,
        page,
      }});
  };

  const filterByType = (type: EntryType, checked: boolean) => {
    const existing = searchParams.type?.filter((x) => x !== type) ?? [];
    if (checked) {
      existing.push(type);
    }
    const types = existing.length > 0 ? existing : undefined;
    navigate({
      search: {
        ...searchParams,
        type: types,
        page: undefined,
      },
    });
  };

  if (response.isLoading) {
    return (
      <PageContainer className="bg-main">
        <AppSpinner/>
      </PageContainer>
    );
  }
  if (response.isError || response.data?.error) {
    const error = response.data?.error?.error;
    return (
        <PageContainer>
          <AppApiErrorDisplay error={error} />
        </PageContainer>
    );
  }

  return (
 <PageContainer className="bg-main">
         <div className="flex flex-col max-w-5xl w-full">
           <div className="w-full text-left mb-5 flex">
             <AppPageHeading>{t(i18n.heading)}</AppPageHeading>
             <div className="grow flex flex-row-reverse gap-5 items-center">
              <Link to="/entries/add" className="z-0">
                <AppButton>{t(i18n.buttons.addEntry)}</AppButton>
              </Link>
              <AppLink to="/workouts/types" className="z-0">
                {t(i18n.buttons.types)}
              </AppLink>
              </div>
           </div>
           <div className="flex flex-col md:flex-row gap-5 items-start">
             <AppSidebarBlock>
               <AppLabel className="mb-2 block">{t(i18n.filter.labels.type)}</AppLabel>
               <div className="mb-5 flex flex-col gap-2">
                 {Object.values(EntryType).map((x) => (
                   <AppSwitch
                   className="capitalize"
                   key={x}
                   label={t(i18nEntryTypes[x])}
                   checked={searchParams.type?.includes(x) ?? false}
                   onCheckedChange={(e) => filterByType(x, e)}
                   ></AppSwitch>
                 ))}
               </div>
             </AppSidebarBlock>
             <div className="flex flex-col gap-5 grow w-full">
                {response.data && response.data.data.items.length > 0 && (
                  <>
                    {/* <div className="flex justify-center mb-3">
                      <Pagination onPageChanged={onPageChanged} info={response.data?.data.info} />
                    </div> */}
                    {response.data?.data.items.map((item) => <EntryBlock key={item.id} entry={item} own />)}
                    <div className="flex justify-center">
                      <Pagination onPageChanged={onPageChanged} info={response.data?.data.info} />
                    </div>
                  </>
                )}
                {response.data?.data.items.length === 0 && <AppToast variant={Color.Warning}>No Acitivities Found</AppToast>}
             </div>
           </div>
         </div>
       </PageContainer>
  );
}
