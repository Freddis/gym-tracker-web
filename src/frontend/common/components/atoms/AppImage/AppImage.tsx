import {FC, ImgHTMLAttributes} from 'react';
import {cn} from '../../../utils/cn';

type AppImageProps = ImgHTMLAttributes<HTMLImageElement>

export const AppImage: FC<AppImageProps> = (props) => {
  return (
    <img {...props} className={cn('object-cover rounded-md w-20 h-20', props.className)} />
  );
};
