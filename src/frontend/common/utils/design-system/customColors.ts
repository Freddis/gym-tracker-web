import {CSSProperties} from 'react';

export const customColors = {
  carbs: '#22c55e',
  protein: '#3b82f6',
  fat: '#eab308',
  calories: '#ef4444',
} as const satisfies Record<string, Exclude<CSSProperties['color'], undefined>>;
