import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    console.log('Logging in user:', user);

    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

async register(userDto: any) {
  const hashedPassword = await bcrypt.hash(userDto.password, 10);

  // Create user with hashed password
  const user = await this.usersService.create({
    ...userDto,
    password: hashedPassword,
    verified: false, // Ensure this field exists in your schema
  });

  // Generate verification token
  const token = this.jwtService.sign(
    { userId: user._id },
    { secret: process.env.JWT_SECRET, expiresIn: '1d' }
  );

  // Send verification email
  await this.emailService.sendVerificationEmail(user.email, token);

  return { message: 'User registered. Please check your email to verify your account.' };
}
}
