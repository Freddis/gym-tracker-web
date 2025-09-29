import {z} from 'zod';

export const lmStudioCompletionResponseValidator = z.object({
  id: z.string(),
  object: z.literal('chat.completion'),
  created: z.number(),
  model: z.string(),
  choices: z.array(
    z.object({
      index: z.number(),
      message: z.object({
        role: z.literal('assistant'),
        content: z.string(),
        tool_calls: z.array(z.unknown()), // can refine later if tool_calls has structure
      }),
      logprobs: z.nullable(z.record(z.any())).optional(), // null or object
      finish_reason: z.string(),
    })
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
  stats: z.record(z.unknown()),
  system_fingerprint: z.string(),
});

export type LMStudioCompletionResponse = z.infer<typeof lmStudioCompletionResponseValidator>;
