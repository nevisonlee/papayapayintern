import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, AuthModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');

        if (!uri) {
          console.error('MONGODB_URI is not defined in the .env file');
          process.exit(1); // Exit the app if no DB URI is set
        }

        try {
          await mongoose.connect(uri);
          console.log('Connected to database!');
        } catch (error) {
          console.error('Database connection failed:', error);
          process.exit(1); // Exit if connection fails
        }

        return { uri };
      },
    }),
    ProductModule,
  ],
})
export class AppModule {}
