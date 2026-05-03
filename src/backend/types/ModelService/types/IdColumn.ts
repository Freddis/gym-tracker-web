import {PgColumn} from 'drizzle-orm/pg-core';

/**
 * Type of the primary key which can be either autoincrement integer or uuid
 */
export type IdColumn<TKey extends number | string> = PgColumn<{
    name: 'id';
    tableName: string;
    dataType: TKey extends number ? 'number' : 'string';
    columnType: TKey extends number ? 'PgInteger' : 'PgUUID';
    data: TKey;
    driverParam: string | number;
    notNull: true;
    hasDefault: TKey extends number ? true : false;
    isPrimaryKey: true;
    isAutoincrement: false,
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: TKey extends number ? 'byDefault' : undefined;
    generated: undefined;
}>;
