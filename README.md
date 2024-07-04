# Book API

A simple API to practice NestJS fundamentals.

## Development
1. Clone the codebase
2. Run `npm i` to install all dependencies
3. Set up the environment variables (see below)

## Environment Variables
1. Create a copy of `.docker-compose.env.example` and rename it to `.docker-compose.env`
2. Create a copy of `.env.example` and rename it to `.env`
3. Populate the environment variables with the appropriate values

| **Variable**  | **Meaning**                                                                                     |
|---------------|-------------------------------------------------------------------------------------------------|
| `SERVER_PORT` | The port that the nestjs server will run on. For example, `5000`                                |
| `DB_TYPE`     | The type of database to connect to. Right now, we only support `postgres`                       |
| `DB_PORT`     | The port number the database is run on. For example, `5432`                                     |
| `DB_HOST`     | The host that the database is running on.                                                       |
| `DB_USERNAME` | The username of the user we're logging in as to the postgres container. For example, `postgres` |
| `DB_PASSWORD` | The password of the user we're logging in as to the postgres container. For example, `postgres` |
| `DB_DATABASE` | The name of the database we're using in the postgres container. For example, `postgres`         |

4. If you want to run the db and backend together, run `docker:build`
5. If you want to run the db and backend separately, run `docker:db` to run the db only, then run `npm run start:dev` to run the backend