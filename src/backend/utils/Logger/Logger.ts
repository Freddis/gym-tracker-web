import {OpenApiLogger} from 'snap-on-openapi';
import {NonEmptyArray} from '../../types/NonEmptyArray';

export class Logger extends OpenApiLogger {

  protected override transformData(data: object): unknown {
    const transformed = super.transformData(data);
    if (typeof transformed === 'object' && transformed !== null) {
      return this.removeLongArrays(transformed, [30, 10, 5]);
    }
    return transformed;
  }

  protected removeLongArrays(
    data: object,
    maxLengths: NonEmptyArray<number>,
  ): object {
    const nextLimits = (limits: NonEmptyArray<number>): NonEmptyArray<number> => {
      const [, second, ...rest] = limits;
      return second === undefined ? limits : [second, ...rest];
    };

    const visit = (value: unknown, limits: NonEmptyArray<number>): unknown => {
      const [maxLength] = limits;
      if (Array.isArray(value)) {
        const childLimits = nextLimits(limits);
        const mapped = value.map((item) => visit(item, childLimits));
        if (mapped.length > maxLength) {
          return [
            ...mapped.slice(0, maxLength),
            `... (${mapped.length - maxLength} more items omitted)`,
          ];
        }
        return mapped;
      }

      if (value !== null && typeof value === 'object' && !(value instanceof Date)) {
        return Object.fromEntries(
          Object.entries(value).map(([key, val]) => [
            key,
            visit(val, limits),
          ]),
        );
      }
      return value;
    };

    return visit(data, maxLengths) as object;
  }
}
