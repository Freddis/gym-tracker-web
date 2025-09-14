import {FC} from 'react';
import {IoIosMail} from 'react-icons/io';
import {LiaAddressCard} from 'react-icons/lia';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {route, RouteId} from '../../../../common/utils/route';
import {AppLink} from '../../../../common/components/atoms/AppLink/AppLink';
import {RouteLink} from '../../../../common/components/atoms/RouteLink/RouteLink';


export const Footer: FC = () => {
  const {i18n, t} = useAppPartialTranslation((x) => x.layout.footer);
  return (
    <div className="palette-darkest w-full">
      <div className="bg-main text-on-main flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl p-10">
          <div>
            <h5 className="uppercase font-bold mb-4">{t(i18n.about.heading)}</h5>
            <p className="text-sm">{t(i18n.about.content)}</p>
          </div>
          <div>
            <h5 className="uppercase font-bold mb-4">{t(i18n.links.heading)}</h5>
            <div className="flex flex-col gap-2">
              <RouteLink to={route(RouteId.TermsOfService)} className="text-on-main text-sm">
                {t(i18n.links.links.termsOfService)}
              </RouteLink>
              <RouteLink to={route(RouteId.PrivacyPolicy)} className="text-on-main text-sm">
                {t(i18n.links.links.privacyPolicy)}
                </RouteLink>
            </div>
          </div>
          <div>
            <h5 className="uppercase font-bold mb-4">{t(i18n.contacts.heading)}</h5>
            <div className="flex flex-col gap-2">
              <div>
                <IoIosMail className="inline-block mr-2"/>
                <AppLink href="mailto:support@discipline.alex-sarychev.com" className="text-sm text-on-main">
                  support@discipline.alex-sarychev.com
                </AppLink>
              </div>
              <div>
                <LiaAddressCard className="inline-block mr-2" />
                <span className="text-sm">{t(i18n.contacts.address)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-main text-xs text-on-main pb-5 px-5 text-center">
        <AppLink href="https://alex-sarychev.com" className="text-on-main">{t(i18n.copyright)}</AppLink>
      </div>
    </div>
  );
};
