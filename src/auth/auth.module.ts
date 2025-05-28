// NestJS module that bundles AuthService, AuthController, and providers like strategies and guards.

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../users/user.schema';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { EmailService } from './email.service';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h'},
    }),
  }),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [AuthService, JwtStrategy, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
