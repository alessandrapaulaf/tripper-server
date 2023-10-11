import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfig } from './constants.config';

const { port, host, username, password, database } = AppConfig;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: Number(port),
  host,
  username,
  password,
  database,
  autoLoadEntities: true,
  synchronize: true,
};
