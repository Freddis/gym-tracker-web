import {createFileRoute} from '@tanstack/react-router';
import {HomePage} from '../pages/HomePage';
import {z} from 'zod';

const queryParams = z.object({
  page: z.number().optional(),
  type: z.string().optional(),
});

export const Route = createFileRoute('/')({
  component: HomePage,
  validateSearch: queryParams,
});
