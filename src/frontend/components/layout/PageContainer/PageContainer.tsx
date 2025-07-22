import {ReactNode} from '@tanstack/react-router';
import {twMerge} from 'tailwind-merge';

export function PageContainer(props: {children: ReactNode | ReactNode[], className?: string}) {
  const className = twMerge('max-w-5-xl bg-main text-on-main flex flex-col items-center p-10 min-h-full grow', props.className);
  return <div className={className}>{props.children}</div>;
}
