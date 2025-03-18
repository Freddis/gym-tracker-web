import {Logger} from 'drizzle-orm/logger';

export class QueryLogger implements Logger {
  protected isProductionLike: boolean;
  protected useColors: boolean;
  protected dbType: 'mysql' | 'postgres';

  constructor(isProductionLike = false, useColors = true, dbType: 'mysql' | 'postgres' = 'postgres') {
    this.isProductionLike = isProductionLike;
    this.useColors = useColors;
    this.dbType = dbType;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logQuery(query: string, parameters?: any[]): void {
    if (this.isProductionLike) {
      return;
    }

    const useColors = this.useColors;
    let sql = query;
    parameters?.forEach((value, index) => {
      const paramName = this.dbType === 'postgres' ? '$' + (index + 1) : '?';
      // console.log(paramName, value) // debug
      if (typeof value === 'string') {
        sql = sql.replace(paramName, `'${value}'`);
      }
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          if (value.length === 0) {
            sql = sql.replace(paramName, 'DEFAULT');
          } else {
            const values = value.map((element) => (typeof element === 'string' ? `'${element}'` : element)).join(',');
            sql = sql.replace(paramName, values);
          }
        } if (value instanceof Date) {
          sql = sql.replace(paramName, `'${value.toJSON().replace('T', ' ').replace('Z', '')}'`);
        }
        if (value === undefined) {
          sql = sql.replace(paramName, 'DEFAULT');
        } else {
          sql = sql.replace(paramName, value);
        }
      }
      if (['number', 'boolean'].includes(typeof value)) {
        sql = sql.replace(paramName, `${value.toString()}`);
      }
    });
    const cyan = useColors ? '\x1b[36m' : '';
    const reset = useColors ? '\x1b[0m' : '';
    sql = sql.replace(/ +(?= )/g, '') // removing spaces
             .replace(/\n/g, '') // line brakes
            //  .replace(/"/g, '`')
             .replace(
              /(select|where|inner join|left join|join|from|order by|limit|values|returning|insert into)/g,
               `\n${cyan}$1${reset}`);
    // easier identification of specific queries if params are still displayed beneath.
    const paramString = `${cyan}sql params:${reset} [${parameters?.map((x) => {
      if (x === null) {
        return 'null';
      }
      if (x === undefined) {
        return 'undefined';
      }
      if (x instanceof Date) {
        return x.toISOString();
      }
      if (typeof x === 'string') {
        return `'${x}'`;
      }
      return x;
    }).join(',')}]`;
    console.log(`\n${paramString}${sql}`);
  }
}
