import {createFileRoute} from '@tanstack/react-router';
import {HomePage} from 'src/components/pages/Home/HomPage';

export const Route = createFileRoute('/')({
  component: HomePage,
});
