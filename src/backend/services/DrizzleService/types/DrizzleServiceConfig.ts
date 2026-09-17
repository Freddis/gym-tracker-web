export interface DrizzleServiceConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: boolean
  logs: {
    enabled: boolean;
    useColors: boolean;
  };
}
