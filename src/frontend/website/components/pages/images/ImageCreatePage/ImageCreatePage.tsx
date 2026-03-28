import {useNavigate} from '@tanstack/react-router';
import {FC} from 'react';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {api} from '../../../../../common/utils/api';
import {Image} from '../../../../../common/utils/openapi-client/types.gen';
import {ImageCreatePagePresenter} from './components/ImageCreatePagePresenter';

export const ImageCreatePage: FC = () => {
  const navigate = useNavigate();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
  const toasts = useToasts();
  const {errors, showToastsAndSetErrors, sliceErrors} = useResponseErrors<Image>();
  const save = async (data: {data:string}) => {
    const result = await api.postImages({
      body: {
        data: data.data,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.images.add.toasts.success));
    navigate({to: '/entries'});
  };
  return (
    <ImageCreatePagePresenter onSave={save} errors={sliceErrors(errors, (x) => x)} />
  );
};
