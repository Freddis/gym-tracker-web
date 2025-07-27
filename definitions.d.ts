
interface ObjectConstructor {
    keys<T extends string, V>(obj: Record<T, V>): T[]
}
