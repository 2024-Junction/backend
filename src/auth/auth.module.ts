import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './guards/google-oauth.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { JwtStrategy } from './guards/jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PassportModule, ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      secret: config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '3d' }
    }),
    inject: [ConfigService]
  }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, JwtStrategy, UsersService]
})
export class AuthModule { }
