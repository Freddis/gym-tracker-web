import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useOpenApiQuery} from 'src/frontend/utils/useOpenApiQuery';
import {ArgusCheckinSubtype} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinSubtype';
import {Pagination} from 'src/frontend/components/atoms/Pagination/Pagination';
import {getRouteApi} from '@tanstack/react-router';
import {ArgusCheckinType} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
import {ArgusStatusCheckinBlock} from './components/ArgusStatusCheckinBlock/ArgusStatusCheckinBlock';
import {ArgusCheckinBlock} from './components/ArgusCheckinBlock';
import {ArgusWeatherCheckinBlock} from './components/ArgusWeatherCheckinBlock/ArgusWeatherCheckinBlock';
import {ArgusWorkoutCheckinBlock} from './components/ArgusWorkoutCheckinBlock/ArgusWorkoutCheckinBlock';
import {ArgusWeightCheckinBlock} from './components/ArgusWeightCheckinBlock/ArgusWeightCheckinBlock';
import {getArgusCheckinOptions, getArgusCheckinTypesOptions} from '../../../../utils/openapi-client/@tanstack/react-query.gen';
import {AppButton} from '../../../atoms/AppButton/AppButton';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppSpinner} from '../../../atoms/AppSpinner/AppSpinner';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';


const routeApi = getRouteApi('/argus/');

export function ArgusCheckinListPage() {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.argusCheckins);
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const entriesResponse = useOpenApiQuery(getArgusCheckinOptions, {
    query: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: searchParams.type as any,
      page: searchParams.page,
    },
  });
  const typesResponse = useOpenApiQuery(getArgusCheckinTypesOptions, {});
  if (entriesResponse.isLoading || typesResponse.isLoading) {
    return (
      <PageContainer>
        <AppSpinner/>
      </PageContainer>
    );
  }

  const filterByType = (type?: string) => {
    navigate({
      search: {
        page: 1,
        type,
      }});
  };
  const onPageChanged = (page: number) => {
    navigate({
      search: {
        ...searchParams,
        page,
      }});
  };

  return (
    <PageContainer>
      <h1>{t(i18n.labels.entries)}</h1>
      <div className="flex flex-col gap-5 max-w-full w-2xl">
        <AppBlock className="">
          <h3>{t(i18n.labels.types)}</h3>
          <AppButton key="all" onClick={() => filterByType()} className="mr-2" >{t(i18n.buttons.all)}</AppButton>
          {typesResponse.data?.items.map((item) => (
            <AppButton key={item} onClick={() => filterByType(item)} className="capitalize mr-2 mb-2">{item}</AppButton>
          ))}
        </AppBlock>
        {entriesResponse.data?.items.map((item) => {
          switch (item.type) {
            case ArgusCheckinType.Weather:
              return <ArgusWeatherCheckinBlock key={item.id} item={item}/>;
            case ArgusCheckinType.Weight:
              return <ArgusWeightCheckinBlock key={item.id} item={item}/>;
            case ArgusCheckinType.Status:
              return <ArgusStatusCheckinBlock key={item.id} item={item}/>;
            default:
              switch (item.subtype) {
                case ArgusCheckinSubtype.Workout:
                  return <ArgusWorkoutCheckinBlock key={item.id} item={item}/>;
                default:
                  return <ArgusCheckinBlock key={item.id} item={item}/>;
              }
          }
        })}
        <div className="flex justify-center">
        {entriesResponse.data && <Pagination onPageChanged={onPageChanged} info={entriesResponse.data?.info} />}
        </div>
      </div>
    </PageContainer>
  );
}
