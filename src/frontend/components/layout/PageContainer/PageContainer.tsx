import {ReactNode} from '@tanstack/react-router';
import {twMerge} from 'tailwind-merge';

export function PageContainer(props: {children: ReactNode | ReactNode[], className?: string}) {
  const className = twMerge('bg-main text-on-main flex flex-col items-center p-3 md:p-10 min-h-full grow', props.className);
  return <div className={className}>{props.children}</div>;
}
