import {FC} from 'react';
import {ImCheckboxUnchecked, ImCheckboxChecked} from 'react-icons/im';
import {HeadingBlock} from './HeadingBlock/HeadingBlock';

export const PricingBlock: FC = () => {
  return (
    <div className=" justify-center py-20 px-5 flex bg-main text-on-main">
      <div className="w-4xl max-w-full">
        <HeadingBlock title= {'Our prcing plan'}>
          As we mentioned it already, our pricing policy is simple as a stick.
          You get everything you can do in excel spreadsheets for <span className="text-accent">free! </span>
          We only charge for things that requires active suppoort and expenses.
        </HeadingBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="bg-surface text-on-surface p-10 rounded-xl">
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
            <div className="bg-surface text-on-surface p-10 rounded-xl">
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
