import {FC, useState} from 'react';
import {AppBlock} from '../../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../../common/components/atoms/AppBlock/components/AppBlockHeader';
import {AppButton} from '../../../../../../common/components/atoms/AppButton/AppButton';
import {AppImageInput} from '../../../../../../common/components/atoms/AppImageInput/AppImageInput';
import {AppInputError} from '../../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../../common/components/atoms/AppLabel/AppLabel';
import {RouteLink} from '../../../../../../common/components/atoms/RouteLink/RouteLink';
import {PageContainer} from '../../../../../../common/components/layout/PageContainer/PageContainer';
import {route, RouteId} from '../../../../../../common/utils/route';
import {ErrorSlice, useResponseErrors} from '../../../../../../common/utils/useResponseErrors';
import {Image} from '../../../../../../common/utils/openapi-client/types.gen';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';

interface ImageCreatePagePresenterProps {
  onSave: (image: {data:string}) => void
  errors?: ErrorSlice<Image>
}

export const ImageCreatePagePresenter: FC<ImageCreatePagePresenterProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
  const {getSmartError} = useResponseErrors<Image>(props.errors);
  const [data, setData] = useState<string| null>(null);
  const saveButtonClick = async () => {
    if (!data) {
      throw new Error('Data is required');
    }
    props.onSave({data});
  };

  return (
    <PageContainer>
       <div className="flex flex-col max-w-5xl w-full">
        <div className="mb-5 -mt-5">
          <RouteLink to={route(RouteId.EntryList)}>{t(i18n.list.heading)}</RouteLink>
          <span className="mx-2">&gt;&gt;</span>
          <RouteLink to={route(RouteId.EntryAdd)}>{t(i18n.create.heading)}</RouteLink>
          <span className="mx-2">&gt;&gt;</span>
          <span>{t(i18n.images.add.heading)}</span>
        </div>
      </div>
      <AppBlock className="max-w-5xl">
          <AppBlockHeader>{t(i18n.images.add.heading)}</AppBlockHeader>
          <AppLabel>Image</AppLabel>
          <div className="relative">
          <AppImageInput url={undefined} onUpdate={setData} className="w-80 h-80" />
            <AppInputError
            className="w-[327px] max-w-full "
            error={getSmartError((x) => x.url)}
          />
        </div>
        <div />
          <div className="mt-5 border-b-1 border-neutral-on-surface"/>
          <div className="mt-5 flex flex-row">
            <RouteLink to={route(RouteId.EntryAdd)}>{translations.utils.generic.buttons.back}</RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton disabled={!data} onClick={saveButtonClick}>{translations.utils.generic.buttons.save}</AppButton>
            </div>
          </div>
      </AppBlock>
    </PageContainer>
  );
};
