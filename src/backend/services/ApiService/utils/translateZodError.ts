import {ZodIssue} from 'zod';
import {ZodTranslations} from '../types/ZodTranslations';


export function translateZodError(issue: ZodIssue, translations: ZodTranslations): string {
  const {code} = issue;

  // Handle top-level codes with nested object
  if (code === 'invalid_string' && issue.validation) {
    const msgTemplate = translations.errors.invalid_string[issue.validation as keyof typeof translations.errors.invalid_string];
    return interpolate(msgTemplate, issue, translations);
  }

  if ((code === 'too_small' || code === 'too_big') && 'type' in issue) {
    const typeKey = issue.type as keyof typeof translations.errors[typeof code];
    const inclusivity = 'inclusive' in issue ? (issue.inclusive ? 'inclusive' : 'not_inclusive') : 'exact';
    const template =
      translations.errors[code][typeKey]?.[inclusivity] ??
      translations.errors[code][typeKey]?.exact ??
      translations.errors[code];
    return interpolate(template, issue, translations);
  }

  // Handle simple top-level codes
  if (code in translations.errors) {
    const template = translations.errors[code as keyof typeof translations.errors];
    if (typeof template === 'string') return interpolate(template, issue, translations);
  }

  // fallback
  return issue.message ?? 'Ошибка валидации';
}

// simple interpolation for placeholders like {{expected}}, {{received}}, {{minimum}}, {{maximum}}, etc.
function interpolate(template: string, issue: ZodIssue, translations: ZodTranslations): string {
  if (!template) return '';
  return template.replace(/\{\{\s*-?\s*([\w, ]+)\s*\}\}/g, (_, key) => {
    key = key.trim();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (key in issue) return String((issue as any)[key]);
    if (translations.types[key as keyof typeof translations.types]) {
      return translations.types[key as keyof typeof translations.types];
    }
    if (translations.validations[key as keyof typeof translations.validations]) {
      return translations.validations[key as keyof typeof translations.validations];
    }
    return _;
  });
}
