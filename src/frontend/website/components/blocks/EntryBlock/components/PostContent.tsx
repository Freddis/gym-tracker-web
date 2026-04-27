import {AppImage} from '../../../../../common/components/atoms/AppImage/AppImage';
import {cn} from '../../../../../common/utils/cn';
import {Entry} from '../../../../../common/utils/openapi-client';
import {FC} from 'react';

export const PostContent: FC<{entry: Entry}> = ({entry}) => {
  return (
    <div className="w-full">
    {entry.title && (
      <div className="text-lg font-normal mb-5">
        {entry.title}
      </div>
    )}
    {entry.note && (
      <div className="text font-normal mb-5">
        {entry.note}
      </div>
    )}
    {entry.image && (
      <div className={cn('flex flex-row justify-center items-end')}>
      <AppImage src={entry.image.url} className="w-full h-full max-h-150" />
    </div>
    )}
    </div>
  );
};
