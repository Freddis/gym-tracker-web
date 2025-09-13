import {Language} from '../../../frontend/components/layout/LanguageProvider/enums/Language';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Translation} from './types/Translation';
import {TranslationType} from './types/TranslationType';
import {eq} from 'drizzle-orm';
import {NewModel} from '../../types/NewModel';
import translator from 'open-google-translator';
export class TranslationService {

  protected drizzle: DrizzleService;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }

  public getDefaultLanguage(): Language {
    return Language.English;
  }

  public async getTranslation(type: TranslationType, key: string, language: Language): Promise<Translation | null> {
    const result = await this.getTranslations(type, [key], language);
    return result[0] ?? null;
  }

  public async getTranslations(type: TranslationType, keys: string[], language: Language): Promise<Translation[]> {
    const db = await this.drizzle.getDb();
    const result = await db.query.translations.findMany({
      where: (t, op) => op.and(
        op.inArray(t.key, keys),
        op.eq(t.type, type),
        op.eq(t.language, language),
      ),
    });
    return result;
  }

  public async upsertAutoTranslation(
    params: {
      type: TranslationType,
      key: string,
      text: string,
      to: Language,
      lazy?: boolean
      numericKey?: number
  }): Promise<Translation> {
    const {type, key, to, text, lazy = false, numericKey = null} = params;
    const existing = await this.getTranslation(type, key, to);
    const db = await this.drizzle.getDb();
    if (numericKey && numericKey.toString() !== key) {
      throw new Error('Numeric key has to reflect the key');
    }
    if (existing) {
      if (lazy) {
        return existing;
      }
      if (existing.locked) {
        throw new Error(`Translation '${existing.key}' is locked`);
      }
    }
    const translated = await this.translate(text, to);
    if (existing) {
      const update: Partial<Translation> = {
        updatedAt: new Date(),
        auto: true,
        value: translated,
      };
      await db.update(db._.fullSchema.translations).set(update).where(
        eq(db._.fullSchema.translations.id, existing.id)
      );
      return {
        ...existing,
        ...update,
      };
    }
    const translation: NewModel<Translation> = {
      key,
      type,
      language: to,
      value: translated,
      auto: true,
      locked: false,
      numericKey,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    const result = await db.insert(db._.fullSchema.translations).values(translation).returning();
    if (!result[0]) {
      throw new Error("Couldn't insert entity");
    }
    return result[0];
  }

  public async translate(text: string, to: Language, from: Language = Language.English): Promise<string> {
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

  async getMap(type: TranslationType, keys: string[], language: Language): Promise<Map<string, string>> {
    const translations = await this.getTranslations(type, keys, language);
    const map = translations.reduce((acc, next) => acc.set(next.key, next.value), new Map<string, string>());
    return map;
  }
}
