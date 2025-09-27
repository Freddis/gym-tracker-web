import {FC} from 'react';
import {dateToTimeString} from '../../../../website/utils/dateToTimeString';

export const TableDate: FC<{children?: Date}> = (props) => {

  const formatted = props.children ? `${props.children.toLocaleDateString()} ${dateToTimeString(props.children, true)}` : '-';
  return (
    <div>{formatted}</div>
  );
};
