import {createFileRoute} from '@tanstack/react-router';
import {SettingsUpdatePage} from '../../frontend/website/components/pages/settings/SettingsUpdatePage/SettingsUpdatePage';

export const Route = createFileRoute('/settings/edit')({
  component: SettingsUpdatePage,
});
