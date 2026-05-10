import {createFileRoute} from '@tanstack/react-router';
import {SettingsPage} from '../../frontend/website/components/pages/settings/SettingsPage/SettingsPage';

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
});
