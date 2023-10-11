export const AppConfig = {
  appName: process.env.APP_NAME,
  jwtSecret: process.env.SECRET,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  mongoUrl: process.env.CONNECTION_STRING,
};
