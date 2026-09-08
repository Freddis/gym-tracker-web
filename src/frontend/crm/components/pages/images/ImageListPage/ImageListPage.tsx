import {FC} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {keepPreviousData, useQuery, useQueryClient} from '@tanstack/react-query';
import {getRouteApi} from '@tanstack/react-router';
import {deleteCrmImagesById, getCrmImages, Image, ImageType} from '../../../../../common/utils/openapi-client';
import {AppSpinner} from '../../../../../common/components/atoms/AppSpinner/AppSpinner';
import {Pagination} from '../../../../../common/components/atoms/Pagination/Pagination';
import {routeId, RouteId} from '../../../../../common/utils/route';
import {CrmTable} from '../../../elements/CrmTable/CrmTable';
import {CrmTd} from '../../../elements/CrmTable/CrmTd';
import {AppImage} from '../../../../../common/components/atoms/AppImage/AppImage';
import {AppSearchInput} from '../../../../../common/components/atoms/AppSearchInput/AppSearchInput';
import {AppSelect} from '../../../../../common/components/atoms/AppSelect/AppSelect';
import {SelectValue} from '../../../../../common/components/atoms/AppSelect/types/SelectValue';
import {AppLink} from '../../../../../common/components/atoms/AppLink/AppLink';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {FaXmark} from 'react-icons/fa6';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {AppApiErrorDisplay} from '../../../../../common/components/atoms/AppApiErrorDisplay/AppApiErrorDisplay';

const routeApi = getRouteApi(routeId(RouteId.CrmImageList));
export const ImageListPage:FC = () => {
  const searchParams = routeApi.useSearch();
  const toasts = useToasts();
  const navigate = routeApi.useNavigate();
  const {showToastsAndSetErrors} = useResponseErrors();
  const client = useQueryClient();
  const response = useQuery({
    queryFn: () => getCrmImages({
      query: {
        page: searchParams.page,
        search: searchParams.search,
        imageType: searchParams.imageType,
      },
    }),
    queryKey: ['images', searchParams],
    placeholderData: keepPreviousData,
  });
  const imageTypes: SelectValue<ImageType | ''>[] = [
    {value: '', label: 'All Types'},
    ...Object.values(ImageType).map((type) => ({value: type, label: type})),
  ];

  const onPageChanged = (page: number) => {
    navigate({
      search: {
        ...searchParams,
        page,
      },
    });
  };
  const onSearch = (value: string| null) => {
    navigate({
      search: {
        ...searchParams,
        search: value?.trim() ?? undefined,
        page: 1,
      },
    });
  };
  const onImageTypeChange = (value?: ImageType | '') => {
    navigate({
      search: {
        ...searchParams,
        imageType: value === '' ? undefined : value,
        page: 1,
      },
    });
  };
  const onDeleteClick = async (img: Image) => {
    const result = await deleteCrmImagesById({
      path: {
        id: img.id,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }

    await client.invalidateQueries({queryKey: ['images']});
    toasts.addSuccess('Exercise successfully updated');
  };
  return (
  <>
    <AppBlockHeader className="text-left">Image List</AppBlockHeader>
    {response.isLoading && <AppSpinner/>}
    {response.data?.error && (
      <AppApiErrorDisplay error={response.data.error.error}/>
    )}
    {response.data && !response.data.error && (
      <AppBlock className="w-full table-fixed">
        <div className="flex items-center mb-5 gap-5">
          <div className="max-w-100" >
            <AppSearchInput debounce={500} placeholder="Search" onSearch={onSearch} value={searchParams.search} />
          </div>
          <div className="w-40" >
            <AppSelect options={imageTypes} value={searchParams.imageType ?? ''} onChange={onImageTypeChange} />
          </div>
        </div>
        <CrmTable className="w-full table">
          <thead >
            <tr className="font-medium">
              <CrmTd>Id</CrmTd>
              <CrmTd>Image</CrmTd>
              <CrmTd>User</CrmTd>
              <CrmTd>Url</CrmTd>
              <CrmTd>Created</CrmTd>
              <CrmTd>Updated</CrmTd>
              <CrmTd>Actions</CrmTd>
            </tr>
          </thead>
          <tbody>
            {response.data.data.items.map((row) => (
              <tr key={row.id} className="border-b-red-200 p1">
                <CrmTd className="min-w-20">
                    {row.id}
                </CrmTd>
                <CrmTd className="min-w-30">
                  <AppImage src={row.url}/>
                </CrmTd>
                <CrmTd>{row.userId ?? 'None'}</CrmTd>
                <CrmTd className="max-w-100 break-all">
                  <AppLink href={row.url} className="text-on-main">
                    {row.url}
                  </AppLink>
                </CrmTd>
                <CrmTd>{row.createdAt.toISOString()}</CrmTd>
                <CrmTd>{row.updatedAt?.toISOString() ?? '-'}</CrmTd>
                <CrmTd>
                 <AppButton onClick={onDeleteClick.bind(null, row)}>
                  <FaXmark/>
                 </AppButton>
                </CrmTd>
              </tr>
            ))}
          </tbody>
        </CrmTable>
        <Pagination info={response.data.data.info} className="mt-10" onPageChanged={onPageChanged}/>
      </AppBlock>
    )}
  </>
  );
};
