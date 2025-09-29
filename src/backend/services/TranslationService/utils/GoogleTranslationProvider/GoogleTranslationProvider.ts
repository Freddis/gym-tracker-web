import {Language} from '../../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {TranslationProvider} from '../../types/TranslationProvider';
import translator from 'open-google-translator';

export class GoogleTranslationProvider implements TranslationProvider {
  async translate(text: string, to: Language, from: Language): Promise<string> {
    const result = await translator.TranslateLanguageData({
      listOfWordsToTranslate: [
        text,
      ],
      fromLanguage: from,
      toLanguage: to,
    });
    if (!result[0]) {
      throw new Error(`Couldn't translate ${text}`);
    }
    return result[0].translation;
  }
}
