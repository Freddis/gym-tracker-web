import dotenv from 'dotenv';
import {EnumLike, z} from 'zod';
import {Environment} from '../../types/Environment';
import {LogLevel} from '../../types/LogLevel';

export class EnvHelper {
  protected static init = (() => {
    const logLevel = EnvHelper.getEnumValue('log_level', LogLevel, LogLevel.error);
    const debug = logLevel === LogLevel.all;
    // separate call to be able to override NODE_ENV there, without putting in into CLI
    dotenv.config({
      path: ['.env'],
      debug: debug,
    });
    const environment = EnvHelper.getEnumValue('NODE_ENV', Environment, Environment.development);
    let envFile = '.env.producton';
    if (environment === Environment.development || environment === Environment.test) {
      envFile = '.env.development';
    }
    dotenv.config({
      path: [envFile],
      debug: debug,
    });
    // console.log(envFile, environment, conf); // uncomment to debug
  })();

  static getEnumValue<TEnum extends EnumLike>(
    name: string,
    enumLike: TEnum,
    defaultValue?: TEnum[keyof TEnum]
  ): TEnum[keyof TEnum] {
    const value = process.env[name];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`ENV variable ${name} doesn't exist`);
    }
    const result = z.nativeEnum(enumLike).safeParse(value);
    if (!result.success) {
      throw new Error(`ENV variable ${name}, value ${value} is not in enum ${Object.values(enumLike).join(',')}`);
    }
    return result.data;
  }

  static getString(name: string, defaultValue?: string): string {
    const value = process.env[name];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`ENV variable ${name} doesn't exist`);
    }
    return value;
  }

  static getNumber(name: string, defaultValue?: number): number {
    const value = process.env[name];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`ENV variable ${name} doesn't exist`);
    }
    const number = Number(value);
    const notNumber = Number.isFinite(number);
    if (!notNumber) {
      throw new Error(`ENV variable ${name} is not a number`);
    }
    return number;
  }

  static getBoolean(name: string, defaultValue?: boolean): boolean {
    const value = process.env[name];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`ENV variable ${name} doesn't exist`);
    }
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    throw new Error(`ENV variable ${name} has strange value: ${value}, should be either: 'true' or 'false'`);
  }

}
