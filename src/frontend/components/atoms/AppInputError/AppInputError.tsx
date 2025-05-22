import {FC} from 'react';

export const AppInputError: FC<{error: string | null}> = (props) => {
  if (!props.error) {
    return null;
  }
  return (
    <div className="text-danger font-bold">{props.error}</div>
  );
};
