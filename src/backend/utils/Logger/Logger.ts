import {OpenApiLogger} from 'snap-on-openapi';

export class Logger extends OpenApiLogger {
  protected override transformData(data: object): unknown {
    const reducedData = this.removeLongArrays(data, 30);
    return super.transformData(reducedData);
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

      if (value && typeof value === 'object') {
        return Object.fromEntries(
          Object.entries(value).map(([key, val]) => [key, visit(val)]),
        );
      }

      return value;
    };

    return visit(data) as object;
  }
}
