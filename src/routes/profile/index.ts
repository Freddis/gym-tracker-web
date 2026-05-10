import {createFileRoute} from '@tanstack/react-router';
import {ProfilePage} from '../../frontend/website/components/pages/profile/ProfilePage/components/ProfilePage';

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
});
