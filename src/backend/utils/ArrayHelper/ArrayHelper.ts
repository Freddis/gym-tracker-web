export class ArrayHelper {

  static async inBatch<T>(batchSize: number, array: T[], callback: (batch: T[]) => Promise<boolean>): Promise<boolean> {
    for (let i = 0; i < array.length; i += batchSize) {
      const batch = array.slice(i, i + batchSize);
      const result = await callback(batch);
      if (!result) {
        return false;
      }
    }
    return true;
  }
}
