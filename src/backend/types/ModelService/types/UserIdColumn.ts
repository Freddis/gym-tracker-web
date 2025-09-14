import {PgColumn} from 'drizzle-orm/pg-core';

export type UserIdColumn = PgColumn<{
    name: 'userId';
    tableName: string;
    dataType: 'number';
    columnType: 'PgInteger';
    data: number;
    driverParam: string | number;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
}>
