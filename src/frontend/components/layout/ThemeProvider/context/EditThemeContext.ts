import {createContext} from 'react';
import {Theme} from '../enums/Theme';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EditThemeContext = createContext({setTheme: (theme: Theme) => {return;}});
