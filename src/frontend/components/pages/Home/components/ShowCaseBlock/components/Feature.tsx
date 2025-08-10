import {FC} from 'react';
import {IconType} from 'react-icons/lib';

export const Feature: FC<{title: string, description: string, icon: IconType}> = ({title, description, icon}) => {

  return (
  <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
    {icon({size: 70, className: 'min-w-15'})}
    <div className="max-w-100">
      <h3 className="text-accent text-center md:text-left text-xl mb-2">{title}</h3>
      <p className="text-lg text-center md:text-left">{description}</p>
    </div>
  </div>
  );
};
