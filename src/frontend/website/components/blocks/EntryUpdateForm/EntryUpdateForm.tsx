import {forwardRef, useState, useImperativeHandle} from 'react';
import {AppDatepicker} from '../../../../common/components/atoms/AppDatepicker/AppDatepicker';
import {AppImageInput} from '../../../../common/components/atoms/AppImageInput/AppImageInput';
import {AppLabel} from '../../../../common/components/atoms/AppLabel/AppLabel';
import {AppSelect} from '../../../../common/components/atoms/AppSelect/AppSelect';
import {SelectValue} from '../../../../common/components/atoms/AppSelect/types/SelectValue';
import {AppTextArea} from '../../../../common/components/atoms/AppTextArea/AppTextArea';
import {InputRow} from '../../../../common/components/atoms/InputRow/InputRow';
import {PostEntryUpsertDto, EntryVisibility, Entry, ImageUpsertDto} from '../../../../common/utils/openapi-client';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {FormSubmitRef} from '../../../../common/types/FormSubmitRef';

interface EntryUpdateFormProps {
  entry: Entry;
  onSubmit: (entry: PostEntryUpsertDto) => void;
}
export const EntryUpdateForm = forwardRef<FormSubmitRef, EntryUpdateFormProps>((props, ref) => {
  const t = useAppPartialTranslation((x) => x.utils.objects.entry);
  const [time, setTime] = useState(props.entry.time);
  const [note, setNote] = useState(props.entry.note ?? '');
  const [image, setImage] = useState<ImageUpsertDto | undefined | null>(undefined);
  const [visibility, setVisibility] = useState(props.entry.visibility);
  const visibilityOptions: SelectValue<EntryVisibility>[] = Object.values(EntryVisibility).map((visibility) => ({
    label: t.f((x) => x.utils.objects.entryVisibility[visibility]),
    value: visibility,
  }));
  useImperativeHandle(ref, () => ({
    submit: () => {
      const newNote = note.trim() === '' ? null : note.trim();
      const postEntry: PostEntryUpsertDto = {
        time,
        note: newNote,
        image: image,
        visibility,
        id: props.entry.id,
        createdAt: props.entry.createdAt,
        updatedAt: null,
        deletedAt: null,
        title: null,
        externalId: null,
        externalSource: null,
        type: 'Post',
        healthkitId: null,
        healthkitAnchor: null,
        healthkitAnchors_3_0: null,
        healthkitSource: null,
        healthkitSourceName: null,
        healthkitDevice: null,
        healthkitDeviceName: null,
      };
      props.onSubmit(postEntry);
    },
  }));
  return (
    <>
      <div className="flex flex-row gap-5 w-full">
        <div className="flex flex-col gap-5">
          <InputRow>
            <AppLabel>{t.p((x) => x.fields.image)}</AppLabel>
            <div className="max-w-full">
              <AppImageInput url={props.entry.image?.url} onUpdate={(i) => setImage({data: i})} onRemove={() => setImage(null)} />
            </div>
          </InputRow>
          <InputRow>
            <AppLabel>{t.p((x) => x.fields.note)}</AppLabel>
            <div className="w-100 h-30 max-w-full">
              <AppTextArea value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </InputRow>
        </div>
        <div className="flex flex-col gap-5 grow items-end">
          <InputRow>
            <AppLabel>{t.p((x) => x.fields.time)}</AppLabel>
            <AppDatepicker
              value={time}
              onChange={setTime}
            />
          </InputRow>
          <InputRow>
            <AppLabel>{t.p((x) => x.fields.visibility)}</AppLabel>
            <div className="w-30 max-w-full">
              <AppSelect options={visibilityOptions} value={visibility} onChange={setVisibility} />
            </div>
          </InputRow>
        </div>
      </div>
    </>
  );
});
