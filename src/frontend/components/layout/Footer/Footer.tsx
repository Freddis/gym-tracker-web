import {FC} from 'react';
import {FaFacebook, FaGoogle, FaVk} from 'react-icons/fa';
import {IoIosMail} from 'react-icons/io';
import {LiaAddressCard} from 'react-icons/lia';
import {useAppPartialTranslation} from '../../../i18n/useAppPartialTranslation';
export const Footer: FC = () => {
  const {i18n, t} = useAppPartialTranslation((x) => x.layout.footer);
  return (
    <div className="w-full">
      <div className="bg-darkest text-on-darkest flex justify-center">
        <div className=" max-w-6xl p-10 grid grid-cols-3 gap-6">
          <div>
            <h5 className="uppercase font-bold mb-4">{t(i18n.about.heading)}</h5>
            <p className="color-neutral text-sm">{t(i18n.about.content)}.</p>
          </div>
          <div>
            <h5 className="uppercase font-bold mb-4">{t(i18n.social.heading)}</h5>
            <div className="flex flex-row gap-10">
              <FaFacebook size="30"/>
              <FaGoogle size="30"/>
              <FaVk size="30"/>
            </div>
          </div>
          <div>
            <h5 className="uppercase font-bold mb-4">{t(i18n.contacts.heading)}</h5>
            <div>
              <IoIosMail className="inline-block mr-5"/>
              <span className="text-xs">alex@home-studio.pro</span>
            </div>
            <div>
              <LiaAddressCard className="inline-block mr-5" />
              <span className="text-xs">{t(i18n.contacts.address)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-darkest text-xs text-on-darkest p-5 text-center">{t(i18n.copyright)}</div>
    </div>
  );
};
