import {FC, ImgHTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';

type AppImageProps = ImgHTMLAttributes<HTMLImageElement>

export const AppImage: FC<AppImageProps> = (props) => {


  return (
    <img {...props} className={twMerge('object-cover rounded-md w-20 h-20', props.className)} />
  );
};
