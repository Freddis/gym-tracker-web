import {z, ZodError} from 'zod';

export class ZodHelper {

  public static validators = {
    dateOrStringDate: z.union([
      z.date(),
      z.string()
                .refine((input) => {
                  try {
                    const output = new Date(Date.parse(input));
                    let outputStr = output.toISOString().replace('T', ' ');
                    let inputStr = input.replace('T', ' ');
                    // picking up easy cases of non ISO strings from MYSQL
                    if (input.endsWith('000')) {
                      inputStr = input.slice(0, input.length - 3) + 'Z';
                      outputStr = new Date(Date.parse(inputStr)).toISOString().replace('T', ' ');
                    }
                    // console.log(inputStr, outputStr, inputStr === outputStr);
                    return inputStr === outputStr;
                  } catch {
                    // console.log(e);
                    return false;
                  }
                }, 'Not a valid date string')
                .transform((x) => {
                  return new Date(Date.parse(x));
                }),
    ]),
    numberOrStringNumber: z.union([
      z.number(),
      z.string()
                .refine((input) => {
                  try {
                    if (input === '-0') {
                      return true;
                    }
                    const parts = input.split('.');
                    if (parts[1]) {
                      parts[1] = parts[1].substring(0, 5);
                      input = parts.join('.');
                    }

                    const allZeroes = input.replace('.', '')
                                            .split('')
                                            .reduce((acc, next) => acc && next === '0', true);
                    if (allZeroes) {
                      return true;
                    }

                    const number = Number(input);
                    const outputStr = number.toString();
                    const noTrailingZeroesInput = input.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1');


                    return noTrailingZeroesInput === outputStr;
                  } catch {
                    return false;
                  }
                }, 'Not a valid number string')
                .transform((x) => {
                  return Number(x);
                }),
    ]),
    bigIntOrString: z.union([
      z.bigint(),
      z.string()
                .refine((input) => {
                  try {
                    if (input === '-0') {
                      return true;
                    }
                    const number = BigInt(input);
                    const outputStr = number.toString();
                    // console.log(input, outputStr);
                    return input === outputStr;
                  } catch {
                    return false;
                  }
                }, 'Not a valid number string')
                .transform((x) => {
                  return BigInt(x);
                }),
    ]),
  } as const;

  static getFieldError(error: ZodError): string {
    const firstError = error.errors[0];
    if (!firstError) {
      return 'Unknown validation error';
    }
    const path = firstError.path.length > 0 ? `${firstError.path.join('.')}: ` : '';
    return `${path}${firstError.message}`;
  }
}
