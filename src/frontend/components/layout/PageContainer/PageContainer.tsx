import {ReactNode} from '@tanstack/react-router';
import {twMerge} from 'tailwind-merge';

export function PageContainer(props: {children: ReactNode | ReactNode[], className?: string}) {
  const className = twMerge('max-w-5-xl bg-neutral text-on-neutral flex flex-col items-center p-10 min-h-full', props.className);
  return <div className={className}>{props.children}</div>;
}
