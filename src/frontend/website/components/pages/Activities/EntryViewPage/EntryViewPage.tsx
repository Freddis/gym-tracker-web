import {getRouteApi} from '@tanstack/react-router';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {FC} from 'react';
import {api} from '../../../../../common/utils/api';
import {route, RouteId} from '../../../../../common/utils/route';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';
import {AppPageHeading} from '../../../../../common/components/atoms/AppPageHeading/AppPageHeading';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {PageContainer} from '../../../../../common/components/layout/PageContainer/PageContainer';
import {EntryBlock} from '../../../blocks/EntryBlock/EntryBlock';

const routeApi = getRouteApi(route(RouteId.EntryView));
export const EntryViewPage: FC = () => {
  const searchParams = routeApi.useParams();
  const response = useQuery({
    queryFn: () => api.getEntriesById({
      path: {
        id: searchParams.id,
      },
    }),
    queryKey: ['workouts', searchParams],
    placeholderData: keepPreviousData,
  });

  return (
    <PageContainer className="bg-main">
    <div className="flex flex-col max-w-5xl w-full">
      <div className="w-full text-left min-h-8 mb-5 flex">
        <AppPageHeading> </AppPageHeading>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-start">
      <div className="flex flex-col gap-5">
        </div>
        <div className="flex flex-col gap-5 grow w-full" data-testid="main-content">
          {response.isLoading && <AppSpinner/>}
          {response.isError || response.data?.error && <AppApiErrorDisplay error={response.data?.error?.error} />}
          {response.data?.data && <EntryBlock entry={response.data.data} own />}
        </div>
      </div>
    </div>
  </PageContainer>
  );
};
