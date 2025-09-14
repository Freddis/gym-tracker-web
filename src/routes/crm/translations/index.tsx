import {createFileRoute} from '@tanstack/react-router';
import {TranslationListPage} from '../../../frontend/crm/components/pages/Translations/TranslationListPage/TranslationListPage';
import {paginatedQueryValidator} from '../../../frontend/crm/utils/validators/paginatedQueryValidator';

export const Route = createFileRoute('/crm/translations/')({
  component: TranslationListPage,
  validateSearch: paginatedQueryValidator,
});
