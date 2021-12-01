import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ERRORS } from 'src/constants/errors';
import { AuthService } from '../auth.service';
import { FacebookAuthDto } from './dto/facebook-auth.dto';

@Injectable()
export class FacebookAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService
  ) {}

  async authenticate(body: FacebookAuthDto) {
    const { token, ...userInfo } = body;

    const { data } = await this.httpService
      .get(`https://graph.facebook.com/v8.0/me?access_token=${token}`)
      .toPromise();

    if (!data.id) {
      throw new HttpException(ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    return this.authService.socialLogIn(userInfo);
  }
}
