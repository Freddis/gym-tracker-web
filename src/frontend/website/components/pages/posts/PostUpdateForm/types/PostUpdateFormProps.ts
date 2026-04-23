import {PostEntry} from '../../../../../../common/utils/openapi-client';
import {ErrorSlice} from '../../../../../../common/utils/useResponseErrors';

export interface PostUpdateFormProps {
  entry: Omit<PostEntry, 'id'|'user'>
  onSave: (data: {data:string | null, note: string | null, time: Date}) => void
  errors?: ErrorSlice<PostEntry>
}
