import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './util/env.validation';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validate
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        retryAttempts: config.get('NODE_ENV') === 'prod' ? 10 : 1,
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [
          // path.join(__dirname, '../**/*.entity.{js,ts}'),
          "dist/**/*.entity.js"
        ],
        synchronize: true,
        logging: true,
        timezone: 'local',
      })
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
