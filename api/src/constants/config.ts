import 'dotenv/config';

export const config = () => ({
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET,
  database: {
    url: process.env.DB_DATABASE_URL,
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.js'],
    migrationsTableName: 'migration',
    migrations: ['src/migration/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
    },
  },
  transport: {
    transport: {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADRESS_FROM,
      },
    },
  },
  urls: {
    webUrl: process.env.WEB_BASE_URL,
  },
  aws: {
    key: process.env.AWS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
  },
});
