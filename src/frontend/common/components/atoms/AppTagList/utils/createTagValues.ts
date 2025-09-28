import {TagValue} from '../types/TagValue';

export const createTagValues = (obj: object | string[]): TagValue[] => {
  if (Array.isArray(obj)) {
    return obj.map((x) => ({
      id: x,
      label: x,
    }));
  }
  return Object.values(obj).map((x) => ({
    id: x,
    label: x,
  }));
};
