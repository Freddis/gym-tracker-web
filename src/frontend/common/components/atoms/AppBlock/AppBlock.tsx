import {FC, ReactNode} from 'react';
import {cn} from '../../../utils/cn';
import {AppLink} from '../AppLink/AppLink';
interface AppBlockProps {
  ['data-testid']?: string;
  image?: string;
  imageTo?: string;
  imageHeight?: number;
  className?: string;
  children: ReactNode | ReactNode[] | string;
}
export const AppBlock: FC<AppBlockProps> = (props) => {
  const classes = cn(
    'bg-surface text-on-surface overflow-hidden rounded-md w-full shadow-md',
    props.image ? 'p-0' : 'p-5',
    props.className
  );
  return (
    <div className={classes} data-testid={props['data-testid']}>
      {props.image && (
        <div className="relative">
          {props.imageTo && (
            <AppLink href={props.imageTo}>
              <img src={props.image} className="w-full object-cover" style={{height: props.imageHeight}} />
            </AppLink>
          )}
          {!props.imageTo && (
            <img src={props.image} className="w-full object-cover" style={{height: props.imageHeight}} />
          )}
        </div>
      )}
      <div className="">
      {props.children}
      </div>
    </div>
  );
};
