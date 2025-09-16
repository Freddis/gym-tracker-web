import {FC, ComponentProps} from 'react';
import {cn} from '../../../../common/utils/cn';

export const CrmTd: FC<ComponentProps<'td'>> = (props) => {
  return (
  <td {...props} className={cn('p-4 border-b-main border-b-1', props.className)}>
    {props.children}
    </td>
  );
};
