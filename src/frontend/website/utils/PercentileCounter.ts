export class PercentileCounter {
  private data: Record<string, {count: number, max: number, min: number}> = {};
  private bucketKey: (value: number) => string;
  private excludeZeroes: boolean;

  constructor(bucketkey: (value: number) => string, excludeZeroes: boolean = false) {
    this.bucketKey = bucketkey;
    this.excludeZeroes = excludeZeroes;
  }

  add(value: number) {
    if (this.excludeZeroes && value === 0) {
      return;
    }
    const key = this.bucketKey(value);
    const current = this.data[key] ?? {count: 0, max: value, min: value};
    current.count++;
    current.max = Math.max(current.max, value);
    current.min = Math.min(current.min, value);
    this.data[key] = current;
  }

  getPercentile(
    percentile: number,
    mode: 'max' | 'min' | 'average' = 'average',
  ): number {
    // Convert + sort by numeric speed
    const entries = Object.entries(this.data)
      .map(([, data]) => ({
        value: data.max,
        count: data.count,
        max: data.max,
        min: data.min,
      }))
      .sort((a, b) => a.value - b.value);

    // Total samples
    const total = entries.reduce((sum, e) => sum + e.count, 0);

    const target = total * percentile;

    // Walk cumulative counts
    let cumulative = 0;
    for (const e of entries) {
      cumulative += e.count;

      if (cumulative >= target) {
        return this.getValue(e, mode);
      }
    }
    // fallback (shouldn’t really happen)
    return this.getValue(entries[entries.length - 1] ?? {count: 0, max: 0, min: 0}, mode);
  };

  protected getValue(value: {count: number, max: number, min: number}, mode: 'max' | 'min' | 'average' = 'average'): number {
    switch (mode) {
      case 'max':
        return value.max;
      case 'min':
        return value.min;
      case 'average':
        return (value.max + value.min) / 2;
      default:
        return (value.max + value.min) / 2;
    }
  }

  get95Percentile(): number {
    return this.getPercentile(0.95, 'max');
  }

  get5Percentile(): number {
    return this.getPercentile(0.05, 'min');
  }
  getMedian(): number {
    return this.getPercentile(0.5, 'average');
  }
}
