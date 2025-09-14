import {createFileRoute} from '@tanstack/react-router';
import {TranslationUpdatePage} from '../../../../frontend/crm/components/pages/Translations/TranslationUpdatePage/TranslationUpdatePage';

export const Route = createFileRoute('/crm/translations/update/$id')({
  component: TranslationUpdatePage,
});
