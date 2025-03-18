
export abstract class BaseDecorator<T, TOut, TOutRef = TOut> {

  async decorateForCrm(item: T): Promise<TOut> {
    const result = await this.decorateArrayForCrm([item]);
    return result[0];
  }

  async decorateReferencedArray(items: T[]): Promise<TOutRef[]> {
    return items.map((x) => this.decorateReferenced(x));
  }

  abstract decorateArrayForCrm(items: T[]): Promise<TOut[]>

  abstract decorateReferenced(item: T): TOutRef
}
