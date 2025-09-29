import 'snap-on-openapi';
import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';
import {Logger} from '../../src/backend/utils/Logger/Logger';
import {argv} from 'process';
import {nativeEnum} from 'zod';
import {Language} from '../../src/frontend/common/components/layout/LanguageProvider/enums/Language';
import {TranslationType} from '../../src/backend/services/TranslationService/types/TranslationType';
import {TranslationProviderType} from '../../src/backend/services/TranslationService/types/TranslationProviderType';

const logger = new Logger('Translate Exercises');
const translationService = await globalServiceFactory.translation();
const exerciseService = await globalServiceFactory.exercise();
const to = argv[2];
if (!to) {
  logger.info('Please pass the language as first paremeter');
  process.exit();
}
const validatedLanguage = nativeEnum(Language).safeParse(to);
if (validatedLanguage.error) {
  logger.info(`Language is not valid, allowed values: ${Object.values(Language).join(',')}`);
  process.exit();
}

let processed = 0;
let page = 1;
while (true) {
  const chunk = await exerciseService.paginate({page: page++});
  if (chunk.items.length === 0) {
    break;
  }
  for (const item of chunk.items) {
    logger.info(`Processing exercise ${++processed}/${chunk.info.count} : '${item.id} - ${item.name}'`);
    const translation = await translationService.upsertAutoTranslation({
      type: TranslationType.ExeciseName,
      numericKey: item.id,
      key: item.id.toString(),
      text: item.name,
      to: Language.Russian,
      lazy: true,
      provider: TranslationProviderType.LocalLLM,
    });
    logger.info(translation.value);
    const tranlsation2 = await translationService.upsertAutoTranslation({
      type: TranslationType.ExeciseDescription,
      key: item.id.toString(),
      text: item.description ?? '',
      to: Language.Russian,
      lazy: true,
      provider: TranslationProviderType.LocalLLM,
    });
    logger.info(tranlsation2.value);
  }
  if (chunk.items.length < chunk.info.pageSize) {
    break;
  }
}


logger.info('Cleaning up');
await globalServiceFactory.cleanup();
