import {FC} from 'react';
import {ImCheckboxUnchecked, ImCheckboxChecked} from 'react-icons/im';

export const PricingBlock: FC = () => {
  return (
    <div className=" justify-center p-20 flex bg-darkest text-on-darkest">
      <div className="max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-2xl text-center uppercase mb-5">Our prcing plan</h2>
          <div className="border-b-2 border-accent w-100 mb-5 m-auto"></div>
          <p>As we mentioned it already, our pricing policy is simple as a stick.
             You get everything you can do in excel spreadsheets for <span className="text-accent">free! </span>
            We only charge for things that requires active suppoort and expenses.</p>
        </div>
        <div className="grid grid-cols-2 gap-10">
            <div className="bg-darkest-surface text-on-darkest-surface p-10">
              <h3 className="uppercase block text-center font-bold text-lg mb-5">Free Plan</h3>
              <div className="text-green-800 text-center text-lg mb-5 font-bold">Free</div>
              <ul>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Workout Tracking</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  Calorie Tracking
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Activity Tracking</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Own analytics</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Export your data to CSV</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Cloud storage for data</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxUnchecked size={20}/>
                  <span>Cloud storage for pictures and videos</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxUnchecked size={20}/>
                  <span>Social features</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxUnchecked size={20}/>
                  <span>Coaching</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxUnchecked size={20}/>
                  <span>Community-wide analytics</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxUnchecked size={20}/>
                  <span>Food database</span>
                </li>
              </ul>
            </div>
            <div className="bg-darkest-surface text-on-darkest-surface p-10">
            <h3 className="uppercase block text-center font-bold text-lg mb-5">Pro</h3>
            <div className="text-green-800 text-center text-lg mb-5 font-bold">$30 / year</div>
              <ul>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Workout Tracking</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  Calorie Tracking
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Activity Tracking</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Own analytics</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Export your data to CSV</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Cloud storage for data</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Cloud storage for pictures and videos</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Social features</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Coaching</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Community-wide analytics</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20}/>
                  <span>Food database</span>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
};
