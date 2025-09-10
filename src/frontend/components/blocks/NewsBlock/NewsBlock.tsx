import {FC} from 'react';
import {AppAvatar} from '../../atoms/AppAvatar/AppAvatar';
import {User} from '../../../utils/openapi-client';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';

interface NewsBlockProps {
  news: {title: string, short: string}
  user: User,
  own?: boolean
}
export const NewsBlock: FC<NewsBlockProps> = ({own = false, news, user}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.components.newsBlock);

  return (
    <div className="bg-surface text-on-surface flex flex-col shadow-neutral-shadow shadow-md rounded-md">
      <img className="h-50 md:h-100 w-full object-cover rounded-t-md" src="/images/pages/home/news2.jpg" />
      <div className="p-5 grow flex flex-col">
        <h3 className="uppercase mb-2 font-semibold">{news.title}</h3>
        <p>{news.short}
          <span className="text-accent block">{t(i18n.labels.readMore)}</span>
          </p>
        {!own && (
          <div className="grow flex flex-row-reverse">
            <div className="flex flex-row  items-center">
              <span className="text-accent">{user.name}</span>
              <AppAvatar user={user} className="ml-2"/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
