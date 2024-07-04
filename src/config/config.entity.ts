interface DbConfig {
  type: string;
  username: string;
  password: string;
  name: string;
  port: number;
  host: string;
}

export interface Config {
  port: number;
  dbConfig: DbConfig;
}
