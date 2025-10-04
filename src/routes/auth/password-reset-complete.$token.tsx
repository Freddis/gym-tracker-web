import {createFileRoute} from '@tanstack/react-router';
import {PaswordResetCompletePage} from '../../frontend/website/components/pages/Auth/PaswordResetCompletePage/PaswordResetCompletePage';

export const Route = createFileRoute('/auth/password-reset-complete/$token')({
  component: PaswordResetCompletePage,
});

