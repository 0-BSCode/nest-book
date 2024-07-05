# Book API

A simple API to practice NestJS fundamentals.

## Development
1. Clone the codebase
2. Run `npm i` to install all dependencies
3. Create a copy of `.env.example` and rename it to `.env`
4. Populate the environment variables with the appropriate values
5. If you want to run the db and backend together, run `docker:build`
6. If you want to run the db and backend separately, run `docker:db` to run the db only, then run `npm run start:dev` to run the backend

## Environment Variables
The different environment variables needed for this program to work are listed below:

| **Variable**  | **Meaning**                                                                                     |
|---------------|-------------------------------------------------------------------------------------------------|
| `SERVER_PORT` | The port that the nestjs server will run on. For example, `5000`                                |
| `DB_TYPE`     | The type of database to connect to. Right now, we only support `postgres`                       |
| `DB_PORT`     | The port number the database is run on. For example, `5432`                                     |
| `DB_HOST`     | The host that the database is running on.                                                       |
| `DB_USERNAME` | The username of the user we're logging in as to the postgres container. For example, `postgres` |
| `DB_PASSWORD` | The password of the user we're logging in as to the postgres container. For example, `postgres` |
| `DB_DATABASE` | The name of the database we're using in the postgres container. For example, `postgres`         |
| `PGADMIN_EMAIL` | The email of the user account used in pgadmin. For example, `test@gmail.com` |
| `PGADMIN_PASSWORD` | The password of the user account used in pgadmin. For example, `password`         |
