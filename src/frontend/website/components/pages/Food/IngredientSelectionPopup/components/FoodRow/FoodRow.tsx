import {FC} from 'react';
import {Food} from '../../../../../../../common/utils/openapi-client';

export const FoodRow: FC<{item: Food, focused: boolean, onSelect?: (food: Food)=> void}> = (props) => {
  const item = props.item;
  const click = () => {
    if (!props.onSelect) {
      return;
    }
    props.onSelect(item);
  };
  const focusedCl = props.focused ? 'bg-black/10' : '';
  return (
    <div
      key={item.id}
      className={`flex flex-row items-center p-2 mb-2 hover:bg-black/10 rounded-xs cursor-pointer ${focusedCl}`}
      onClick={click}
    >
      <img className="w-15 h-15 object-cover rounded-md" src={item.image?.url} />
      <label className="ml-5">{item.name}</label>
    </div>
  );
};
