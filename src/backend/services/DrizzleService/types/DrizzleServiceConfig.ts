export interface DrizzleServiceConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  schema: string,
  ssl: boolean
}
