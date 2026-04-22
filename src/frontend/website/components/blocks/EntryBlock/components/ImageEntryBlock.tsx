import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Entry, Image} from '../../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../common/utils/route';
import {AppImage} from '../../../../../common/components/atoms/AppImage/AppImage';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockDate} from './EntryBlockDate';

export const ImageEntryBlock: FC<{image: Image, entry: Entry, own?: boolean}> = ({image, entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.image);
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          {!own && `${t(i18n.type)}: ${image.id}`}
          {own && (
            <RouteLink to={route(RouteId.ImageUpdate)} params={{id: entry.id.toString()}}>{t(i18n.type)}: {image.id}</RouteLink>
          )}
        </div>
        <div className="grow flex flex-row sm:justify-end">
          <EntryBlockDate date={entry.time} />
        </div>
      </div>
      <div className="flex flex-col">
        <div></div>
      </div>
      <div className="flex flex-row justify-center items-end">
        <AppImage src={image.url} className="w-full h-full max-h-150" />
      </div>
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};
