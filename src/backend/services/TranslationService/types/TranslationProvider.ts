import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';

export interface TranslationProvider {
  translate(text: string, to: Language, from?: Language): Promise<string>;
}
