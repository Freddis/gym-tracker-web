import {useContext} from 'react';
import {ToastContext} from '../types/ToastContext';


export const useToasts = () => {
  const context = useContext(ToastContext);
  return context;
};
