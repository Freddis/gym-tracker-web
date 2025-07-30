declare module '*.css?url';
declare module '*.css';

declare module '@tanstack/react-start/server?server' {
  export * from '@tanstack/react-start/server';
}

interface ObjectConstructor {
    keys<T extends string, V>(obj: Record<T, V>): T[]
}
