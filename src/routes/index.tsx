import {createFileRoute} from '@tanstack/react-router';
import {HomePage} from '../frontend/website/components/pages/Home/HomPage';

export const Route = createFileRoute('/')({
  component: HomePage,
});
