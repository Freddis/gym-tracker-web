import {FC} from 'react';

export const DownloadAppsBlock: FC = () => {
  return (
    <div className="bg-main text-on-main justify-center p-20 flex">
      <div className="max-w-5xl text-center">
        <div className="text-center mb-20">
            <h2 className="text-2xl text-center uppercase mb-5">Download App</h2>
            <div className="border-b-2 border-accent w-100 mb-5 m-auto"></div>
            <p>"COME ON!! DO IT!!! DO IT NOW!!!! (c) Arnold Schwarzenegger</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
          <div className="flex justify-center">
            <img className="w-58" src="/images/pages/home/google-play-download-link.png" />
          </div>
          <div className="flex justify-center">
            <img className="w-50 py-5" src="/images/pages/home/appstore-download-link.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
