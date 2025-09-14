import {PgColumn} from 'drizzle-orm/pg-core';

export type IdColumn = PgColumn<{
    name: 'id';
    tableName: string;
    dataType: 'number';
    columnType: 'PgInteger';
    data: number;
    driverParam: string | number;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: true;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: 'byDefault';
    generated: undefined;
}>;
