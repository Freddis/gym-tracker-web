import {ReactNode} from 'react';
import {cn} from '../../../utils/cn';

export function PageContainer(props: {children: ReactNode | ReactNode[], className?: string}) {
  const className = cn('bg-main text-on-main flex flex-col items-center p-3 py-5 md:p-5 min-h-full grow', props.className);
  return <div className={className}>{props.children}</div>;
}
