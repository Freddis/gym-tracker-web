import {translationRowValidator} from '../../../../DrizzleService/types/TranslationRow';
import {Translation} from '../../../../TranslationService/types/Translation';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../utils/RouteFactory';

const descriptions: OpenApiDescriptions<Translation> = {
  id: 'Id of the manager',
  createdAt: 'Date record was added to CRM',
  updatedAt: 'Last time record was updated',
  deletedAt: "The date record was deleted from CRM. Deleted records don't appear on most pages",
  key: 'Key that identifies the translation',
  numericKey: 'Technical',
  value: 'Translated text',
  type: 'Type of translation. Usually identifies which object translations describe',
  language: 'Language of the translation',
  auto: 'If true, it record was translation via automated translation (google-translate) last time.',
  locked: 'If true, the record will not be vaild for automated translation in future',
};
export const translationValidator = RouteFactory.validators.describeShape(translationRowValidator, descriptions).openapi({
  description: 'Translation Record',
  ref: 'Translation',
});
