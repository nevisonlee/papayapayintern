// Sends verification emails (Using nodemailer).

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or use SMTP host, port, etc.
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationLink = `https://automatic-succotash-5gwx96prj74fvxwj-3000.app.github.dev/auth/verify?token=${token}`;
    
    await this.transporter.sendMail({
      from: this.configService.get<string>('EMAIL_FROM'),
      to: email,
      subject: 'Email Verification',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });
  }
}
