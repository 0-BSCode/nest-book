import { Config } from './config.entity';

export const config = (): Config => ({
  port: parseInt(process.env.SERVER_PORT),
  dbConfig: {
    // TODO: Make this switchable depending on db user will use
    type: process.env.DB_TYPE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
  },
});
