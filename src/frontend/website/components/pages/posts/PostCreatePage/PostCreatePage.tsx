import {useNavigate} from '@tanstack/react-router';
import {FC} from 'react';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {useResponseErrors} from '../../../../../common/utils/useResponseErrors';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {api} from '../../../../../common/utils/api';
import {PostEntry} from '../../../../../common/utils/openapi-client';
import {PostCreatePagePresenter} from './components/PostCreatePagePresenter';
import {PostUpdateFormProps} from '../PostUpdateForm/types/PostUpdateFormProps';

export const PostCreatePage: FC = () => {
  const navigate = useNavigate();
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities);
  const toasts = useToasts();
  const {errors, showToastsAndSetErrors, sliceErrors} = useResponseErrors<PostEntry>();
  const save: PostUpdateFormProps['onSave'] = async (data) => {
    const result = await api.postPosts({
      body: {
        data: data.data,
        note: data.note,
        time: data.time,
      },
    });
    if (showToastsAndSetErrors(result)) {
      return;
    }
    toasts.addSuccess(t(i18n.posts.add.toasts.success));
    navigate({to: '/entries'});
  };
  return (
    <PostCreatePagePresenter onSave={save} errors={sliceErrors(errors, (x) => x)} />
  );
};
