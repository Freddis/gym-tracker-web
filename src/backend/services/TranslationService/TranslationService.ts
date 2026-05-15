import {Language} from '../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {Translation} from './types/Translation';
import {TranslationType} from './types/TranslationType';
import {and, eq, inArray, SQL} from 'drizzle-orm';
import {NewModel} from '../../types/NewModel';
import {ModelService} from '../../types/ModelService/ModelService';
import {TranslationRow} from '../DrizzleService/types/TranslationRow';
import {Filter} from '../../types/ModelService/types/Filter';
import {PgColumn} from 'drizzle-orm/pg-core';
import {TranslationProvider} from './types/TranslationProvider';
import {TranslationProviderType} from './types/TranslationProviderType';
import {GoogleTranslationProvider} from './utils/GoogleTranslationProvider/GoogleTranslationProvider';
import {LLMTranslationProvider} from './utils/LLMTranslationProvider/LLMTranslationProvider';

export class TranslationService extends ModelService<number, TranslationRow, Translation, Filter> {

  protected providers: Record<TranslationProviderType, TranslationProvider> = {
    [TranslationProviderType.Google]: new GoogleTranslationProvider(),
    [TranslationProviderType.LocalLLM]: new LLMTranslationProvider(),
  };

  protected getTable() {
    return this.drizzle.getSchema().translations;
  }
  protected getWhere(filter: Filter): SQL<unknown> | undefined {
    return and(
      filter.ids ? inArray(this.getTable().id, filter.ids) : undefined
    );
  }
  protected async decorateRows(rows: TranslationRow[]): Promise<Translation[]> {
    return rows;
  }
  protected getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return this.drizzle.getSchema().translations.key;
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
      provider?: TranslationProviderType
  }): Promise<Translation> {
    const {type, key, to, text, lazy = false, numericKey = null, provider = TranslationProviderType.Google} = params;
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
    const translated = await this.translate(text, to, undefined, provider);
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

  public async updateTranslationById(id: number, value: string, auto?: boolean): Promise<Translation> {
    const db = await this.drizzle.getDb();
    const update: Partial<Translation> = {
      updatedAt: new Date(),
      auto: auto,
      locked: !auto,
      value: value,
    };
    await db.update(db._.fullSchema.translations).set(update).where(
        eq(db._.fullSchema.translations.id, id)
      );
    const translaton = await this.getById(id);
    if (!translaton) {
      throw new Error("Caouldn't update tranlsation");
    }
    return translaton;
  }

  public async translate(
    text: string,
    to: Language,
    from: Language = Language.English,
    provider: TranslationProviderType = TranslationProviderType.Google
  ): Promise<string> {
    return this.providers[provider].translate(text, to, from);
  }

  async getMap(type: TranslationType, keys: string[], language: Language): Promise<Map<string, string>> {
    const translations = await this.getTranslations(type, keys, language);
    const map = translations.reduce((acc, next) => acc.set(next.key, next.value), new Map<string, string>());
    return map;
  }
}
