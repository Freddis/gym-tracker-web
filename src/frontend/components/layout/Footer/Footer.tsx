import {FC} from 'react';
import {FaFacebook, FaGoogle, FaVk} from 'react-icons/fa';
import {IoIosMail} from 'react-icons/io';
import {LiaAddressCard} from 'react-icons/lia';
export const Footer: FC = () => {
  return (
    <div className="w-full">
      <div className="bg-darkest text-on-darkest flex justify-center">
        <div className=" max-w-6xl p-10 grid grid-cols-3 gap-6">
          <div>
            <h5 className="uppercase font-bold mb-4">About Us</h5>
            <p className="color-neutral">Praesent vel rutrum purus. Nam vel dui eu risus duis dignissim dignissim.
              Suspen disse at eros tempus, congueconsequat.Fusce sit amet urna feugiat.Praesent vel rutrum purus.
              Nam vel dui eu risus.</p>
          </div>
          <div>
            <h5 className="uppercase font-bold mb-4">Social Networks</h5>
            <div className="flex flex-row gap-10">
              <FaFacebook size="30"/>
              <FaGoogle size="30"/>
              <FaVk size="30"/>
            </div>
          </div>
          <div>
            <h5 className="uppercase font-bold mb-4">Contacts</h5>
            <div>
              <IoIosMail className="inline-block mr-5"/>
              <span className="text-xs">alex@home-studio.pro</span>
            </div>
            <div>
              <LiaAddressCard className="inline-block mr-5" />
              <span className="text-xs">44 New Design Street, rne 005</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-darkest text-on-darkest p-5 text-center">
          © Copyright Home Studio 2025. All Right Reserved. Designed and Developed by Alex S.
        </div>
    </div>
  );
};
