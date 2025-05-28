import { Controller, Post, Body, Get, UseGuards, Req, Query, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if (!user.verified) {
      throw new UnauthorizedException('Please verify your email before logging in');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userModel.findById(payload.userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      user.verified = true;
      console.log('Before saving user:', user);
      await user.save();

      return { message: 'Email successfully verified!' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired verification link');
    }
  }
}

