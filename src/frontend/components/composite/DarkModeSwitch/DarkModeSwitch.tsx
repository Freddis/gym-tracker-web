import {FC} from 'react';
import {FaSun, FaMoon} from 'react-icons/fa';
import {Conditional} from '../../layout/Header/Header';

export const DarkModeSwitch: FC<{onClick: () => void, checked: boolean}> = (props) => {

  return (
  <div className="flex flex-row items-center cursor-pointer" onClick={props.onClick}>
    <Conditional condition={!props.checked}>
      <FaMoon className="ml-2" onClick={props.onClick} size={18}/>
    </Conditional>
    <Conditional condition={!!props.checked}>
      <FaSun className="ml-2" size={20}/>
    </Conditional>
  </div>
  );
};
