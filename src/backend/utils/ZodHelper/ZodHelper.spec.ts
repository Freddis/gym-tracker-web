import {expect} from 'chai';
import {describe, test} from 'vitest';
import {ZodHelper} from './ZodHelper';
import {typeToFlattenedError, z, ZodError} from 'zod';

describe(ZodHelper.name, () => {

  test('Can validate ISO string date', async () => {
    expect(ZodHelper.validators.dateOrStringDate.safeParse('2024-11-22T18:57:03.907Z').success).to.eq(true);
  });

  test('can validate ISO string from mysql with microseconds', async () => {
    expect(ZodHelper.validators.dateOrStringDate.safeParse('2024-10-17 06:03:22.727000').success).to.eq(true);
  });

  test('Can validate string number', async () => {
    expect(ZodHelper.validators.numberOrStringNumber.safeParse('123').success).to.eq(true);
  });

  test('Doesnt validate non numbers', async () => {
    const valdiated = ZodHelper.validators.numberOrStringNumber.safeParse('12a');
    expect(valdiated.success).to.eq(false);
    expect(valdiated.error?.issues[0]?.message).to.eq('Not a valid number string');
  });

  test('Can validate -0 string', async () => {
    const valdiated = ZodHelper.validators.numberOrStringNumber.safeParse('-0');
    expect(valdiated.success).to.eq(true);
    expect(valdiated.data).to.eq(-0);
  });

  test('Creates proper error with field name', async () => {
    const validated = ZodHelper.validators.numberOrStringNumber.safeParse('12a');

    z.union([
      z.string().refine(() => true, 'fuck'),
      z.number(),
    ]
    ).parse('aaa');
    expect(validated.success).to.eq(false);
    if (!validated.error) {
      throw Error('Error is not present');
    }
    expect(ZodHelper.getFieldError(validated.error)).to.eq('Not a valid number string');

    const validated2 = z.object({
      myfield: ZodHelper.validators.numberOrStringNumber,
    }).safeParse({myfield: '123aa'});
    if (!validated2.error) {
      throw Error('Error is not present');
    }
    expect(ZodHelper.getFieldError(validated2.error)).to.eq('myfield: Not a valid number string');
  });

  test('Throws backup error in case of no errors', async () => {
    const err: ZodError<object> = {
      issues: [],
      errors: [],
      format: function(): {_errors: string[];} {
        throw new Error('Function not implemented.');
      },
      message: '',
      isEmpty: false,
      addIssue: function(): void {
        throw new Error('Function not implemented.');
      },
      addIssues: function(): void {
        throw new Error('Function not implemented.');
      },
      flatten: function(): typeToFlattenedError<unknown, string> {
        throw new Error('Function not implemented.');
      },
      formErrors: {
        formErrors: [],
        fieldErrors: [
        ],
      },
      name: '',
    };
    expect(ZodHelper.getFieldError(err)).to.eq('Unknown validation error');
  });

  test('Can parse huge timestamps from MT5', async () => {
    const result = ZodHelper.validators.bigIntOrString.safeParse('133795858268807905');
    expect(result.success).to.eq(true);
  });

  test('Can parse fractions ending with 0 from MT5', async () => {
    const result = ZodHelper.validators.numberOrStringNumber.safeParse('1734900817.163590');
    expect(result.success).to.eq(true);
    expect(result.data).to.eq(1734900817.16359);
  });

  test('Limits fractions on parsing', async () => {
    const result = ZodHelper.validators.numberOrStringNumber.safeParse('7304.049999999999578');
    expect(result.success).to.eq(true);
    expect(result.data?.toString().substring(0, 10)).to.eq('7304.04999');
  });
});
