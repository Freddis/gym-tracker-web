import {OpenApiLogger} from 'snap-on-openapi';

export class Logger extends OpenApiLogger {
  protected override transformData(data: object): unknown {
    const transformed = super.transformData(data);
    if (typeof transformed === 'object' && transformed !== null) {
      return this.removeLongArrays(transformed, 30);
    }
    return transformed;
  }

  protected removeLongArrays(data: object, maxLength: number): object {
    const visit = (value: unknown): unknown => {
      if (Array.isArray(value)) {
        if (value.length > maxLength) {
          return [
            ...value.slice(0, maxLength),
            `... (${value.length - maxLength} more items omitted)`,
          ];
        }

        return value.map(visit);
      }

      if (value && typeof value === 'object' && !(value instanceof Date)) {
        return Object.fromEntries(
          Object.entries(value).map(([key, val]) => [key, visit(val)]),
        );
      }

      return value;
    };

    return visit(data) as object;
  }
}
