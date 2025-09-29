import axios from 'axios';
import {Language} from '../../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {TranslationProvider} from '../../types/TranslationProvider';
import {LMStudioCompletionRequest} from './types/LMStudioCompletionRequest';
import {lmStudioCompletionResponseValidator} from './validators/LMStudioCompletionResponse';

export class LLMTranslationProvider implements TranslationProvider {
  protected config = {
    url: 'http://192.168.0.66:1234/v1/chat/completions',
    extraContext: 'Consider these English to Russian translations: Pull Up Bar = Перекладина, Overhand Grip = Прямой хват',
  } as const;

  async translate(text: string, to: Language, from: Language): Promise<string> {
    const langNames: Record<Language, string> = {
      [Language.English]: 'English',
      [Language.Russian]: 'Russian',
    };
    const req: LMStudioCompletionRequest = {
      model: 'qwen3-coder-30b',
      messages: [
        {
          role: 'system',
          // eslint-disable-next-line max-len
          content: `I need you to answer only with translations. I will send you information related in ${langNames[from]} to Gym exercises and I want to get ${langNames[to]} translations in return`},
        {
          role: 'system',
          content: this.config.extraContext,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.1,
      max_tokens: -1,
      stream: false,
    };
    const result = await axios(this.config.url, {
      method: 'POST',
      data: req,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const validated = lmStudioCompletionResponseValidator.safeParse(result.data);
    if (!validated.success) {
      throw new Error("Can't parse LLM response");
    }
    const response = validated.data;
    if (!response.choices[0]) {
      throw new Error('Empty response');
    }
    return response.choices[0].message.content;
  }

}
