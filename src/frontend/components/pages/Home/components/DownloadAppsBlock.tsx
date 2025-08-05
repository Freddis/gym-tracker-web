import {FC} from 'react';
import {useToasts} from '../../../atoms/AppToast/hooks/useToasts';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {HeadingBlock} from './HeadingBlock/HeadingBlock';

export const DownloadAppsBlock: FC = () => {
  const toasts = useToasts();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.static.home);
  const storeButtonClick = () => {
    toasts.addWarning(t(i18n.hero.toasts.appNotYetPublished));
  };
  return (
    <div className="bg-main text-on-main justify-center py-20 px-5 flex">
      <div className="w-xl max-w-full text-center">
        <HeadingBlock title={t(i18n.download.heading)}>
          {t(i18n.download.subheading)}
        </HeadingBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
          <div className="flex justify-center">
            <img
            onClick={storeButtonClick}
            className="w-63 object-contain cursor-pointer"
            src="/images/pages/home/google-play-download-link.png"
            />
          </div>
          <div className="flex justify-center">
            <img
            onClick={storeButtonClick}
            className="w-50 py-5 object-contain cursor-pointer"
            src="/images/pages/home/appstore-download-link.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
