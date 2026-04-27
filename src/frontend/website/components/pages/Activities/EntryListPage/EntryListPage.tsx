import {getRouteApi} from '@tanstack/react-router';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {EntryType} from '../../../../../common/utils/openapi-client';
import {EntryListPagePresenter} from './EntryListPagePresenter/EntryListPagePresenter';
import {FC} from 'react';
import {api} from '../../../../../common/utils/api';

const routeApi = getRouteApi('/entries/');
export const EntryListPage: FC = () => {
  const searchParams = routeApi.useSearch();
  const response = useQuery({
    queryFn: () => api.getEntriesOwn({
      query: {
        page: searchParams.page,
        type: searchParams.type,
        date: searchParams.date,
      },
    }),
    queryKey: ['workouts', searchParams],
    placeholderData: keepPreviousData,
  });
  const datesResponse = useQuery({
    queryFn: () => api.getEntriesOwnDates({
      query: {
        date: searchParams.date ?? new Date(),
        type: searchParams.type,
      },
    }),
    queryKey: ['entries-dates', searchParams],
    placeholderData: keepPreviousData,
  });
  const navigate = routeApi.useNavigate();
  const onPageChanged = (page: number) => {
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
  const onDateChanged = (date: Date | null) => {
    navigate({
      search: {
        ...searchParams,
        date: date ?? undefined,
        page: undefined,
      },
    });
  };
  const onClearFilters = () => {
    navigate({
      search: {
        ...searchParams,
        date: undefined,
        type: undefined,
        page: undefined,
      },
    });
  };
  return (
    <EntryListPagePresenter
      response={response}
      onClearFilters={onClearFilters}
      onPageChanged={onPageChanged}
      onDateChanged={onDateChanged}
      onFilter={filterByType}
      searchParams={searchParams}
      datesResponse={datesResponse} />
  );
};
