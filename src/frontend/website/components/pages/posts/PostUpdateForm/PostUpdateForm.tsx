import {FC, useState} from 'react';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';
import {AppImageInput} from '../../../../../common/components/atoms/AppImageInput/AppImageInput';
import {AppInputError} from '../../../../../common/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../common/components/atoms/AppLabel/AppLabel';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {PostEntry} from '../../../../../common/utils/openapi-client';
import {route, RouteId} from '../../../../../common/utils/route';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {PostUpdateFormProps} from './types/PostUpdateFormProps';
import {AppTextArea} from '../../../../../common/components/atoms/AppTextArea/AppTextArea';
import {AppDatepicker} from '../../../../../common/components/atoms/AppDatepicker/AppDatepicker';

export const PostUpdateForm: FC<PostUpdateFormProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities);
  const {getSmartError} = useResponseErrors<PostEntry>(props.errors);
  const [data, setData] = useState<string| null>(null);
  const [note, setNote] = useState<string>(props.entry.note ?? '');
  const [time, setTime] = useState<Date>(props.entry.time);
  const [url] = useState<string | undefined>(props.entry.image?.url);

  const saveButtonClick = async () => {
    const trimmed = note.trim() === '' ? null : note.trim();
    props.onSave({data, note: trimmed, time});
  };
  return (
    <>
      <AppLabel>{t(i18n.list.objects.post.time)}</AppLabel>
      <div className="relative">
        <AppDatepicker value={time} onChange={(e) => setTime(e)} className="w-100" />
        <AppInputError
        className="w-[327px] max-w-full "
        error={getSmartError((x) => x.time)}
        />
      </div>
      <div/>
      <AppLabel>{t(i18n.list.objects.post.note)}</AppLabel>
      <div className="relative">
        <div className="w-100 max-w-full">
          <AppTextArea onChange={(e) => setNote(e.target.value)} value={note} />
        </div>
        <AppInputError
        className="w-[327px] max-w-full "
        error={getSmartError((x) => x.note)}
        />
      </div>
      <div />
      <AppLabel>{t(i18n.list.objects.post.image)}</AppLabel>
      <div className="relative">
        <AppImageInput url={url} onUpdate={setData} className="w-80 h-80" />
        <AppInputError
        className="w-[327px] max-w-full "
        error={getSmartError((x) => x.image?.url)}
        />
      </div>
      <div />
      <div className="mt-5 border-b-1 border-neutral-on-surface"/>
      <div className="mt-5 flex flex-row">
        <RouteLink to={route(RouteId.EntryList)}>{translations.utils.generic.buttons.back}</RouteLink>
        <div className="grow flex flex-row-reverse gap-2">
          <AppButton onClick={saveButtonClick}>{translations.utils.generic.buttons.save}</AppButton>
        </div>
      </div>
    </>
  );
};
