import {FC} from 'react';
import {IoIosMail} from 'react-icons/io';
import {LiaAddressCard} from 'react-icons/lia';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {AppLink} from '../../atoms/AppLink/AppLink';

export const Footer: FC = () => {
  const {i18n, t} = useAppPartialTranslation((x) => x.layout.footer);
  return (
    <div className="palette-darkest  w-full">
      <div className="bg-main text-on-main flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl p-10">
          <div>
            <h5 className="uppercase font-bold mb-4">{t(i18n.about.heading)}</h5>
            <p className="text-sm">{t(i18n.about.content)}.</p>
            {/* <AppLogo className="-mt-5 -ml-3"/> */}
          </div>
          <div>
            <h5 className="uppercase font-bold mb-4">{t(i18n.links.heading)}</h5>
            <div className="flex flex-col ">
              <AppLink to="/articles/terms-of-service" className="text-on-main">{t(i18n.links.links.termsOfService)}</AppLink>
              <AppLink to="/articles/privacy-policy" className="text-on-main">{t(i18n.links.links.privacyPolicy)}</AppLink>
            </div>
          </div>
          <div>
            <h5 className="uppercase font-bold mb-4">{t(i18n.contacts.heading)}</h5>
            <div>
              <IoIosMail className="inline-block mr-2"/>
              <AppLink href="mailto:support@discipline.alex-sarychev.com" className="text-xs text-on-main">
                support@discipline.alex-sarychev.com
              </AppLink>
            </div>
            <div>
              <LiaAddressCard className="inline-block mr-2" />
              <span className="text-xs">{t(i18n.contacts.address)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-main text-xs text-on-main p-5 text-center">{t(i18n.copyright)}</div>
    </div>
  );
};
