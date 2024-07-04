import { Config } from './config.entity';

export const config = (): Config => ({
  port: parseInt(process.env.SERVER_PORT),
  dbConfig: {
    // TODO: Make this switchable depending on db user will use
    type: process.env.POSTGRES,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DATABASE,
    port: parseInt(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
  },
});
