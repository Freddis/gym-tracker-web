import {FC} from 'react';
import {Exercise} from 'src/frontend/openapi-client';

export const ExerciseRow: FC<{item: Exercise, onSelect?: (item: Exercise)=> void}> = (props) => {
  const item = props.item;
  const click = () => {
    if (!props.onSelect) {
      return;
    }
    props.onSelect(item);
  };
  return (
    <div key={item.id} className="flex flex-row items-center p-2 mb-2 hover:bg-black/10 cursor-pointer" onClick={click}>
      <img className="w-15 h-15 object-cover rounded-md" src={item.images[0]} />
      <label className="ml-5">{item.name}</label>
    </div>
  );
};
