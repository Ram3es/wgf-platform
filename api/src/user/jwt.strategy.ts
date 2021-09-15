import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'src/constants/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: async (
        request: Request,
        rawJwtToken: string,
        done: (err: any, secret: string) => void
      ) => {
        const decodedToken: { id: string } = jwt.decode(rawJwtToken) as {
          id: string;
        };

        const user = await this.userService.getUserById(decodedToken.id);
        const JWT_SECRET = configService.get('JWT_SECRET');
        const jwtSecret = configService.get('jwtSecret');

        console.log(JWT_SECRET, 'configService JWT_SECRET');

        console.log(jwtSecret, 'configService jwtSecret');

        console.log(config().jwtSecret, 'config()');

        console.log(process.env.JWT_SECRET, 'process.env');

        console.log(process.env.JWT_SECRET, 'process.env');

        done(null, `${JWT_SECRET}${user.publicKey}`);
      },
    });
  }

  async validate(payload: any) {
    return this.userService.getUserById(payload.id);
  }
}
