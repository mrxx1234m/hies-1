import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService,private configService:ConfigService){}
    async createAccessToken(payload: { email: string }): Promise<string> {
        try {
          return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('ACCESS_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRES') || '48h',
          });
        } catch (error) {
          console.error('createAccessToken error:', error);
          throw new UnauthorizedException(error.message);
        }
      }
}
