import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import JwtAuthenticationGuard from 'src/shared/guards/auth.guard';
import { VerificationService } from './verification.service';

import { VERIFICATION_ROUTES } from './verification.constants';

@ApiTags(VERIFICATION_ROUTES.main)
@Controller(VERIFICATION_ROUTES.main)
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post(VERIFICATION_ROUTES.sendCode)
  @ApiOperation({ summary: VERIFICATION_ROUTES.sendCode })
  @ApiResponse({
    status: HttpStatus.OK,
    description: VERIFICATION_ROUTES.sendCode,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async sendCode(@Body() body: { email: string; userName: string }) {
    return this.verificationService.sendCode(body);
  }

  @Post(VERIFICATION_ROUTES.verifyCode)
  @ApiOperation({ summary: VERIFICATION_ROUTES.verifyCode })
  @ApiResponse({
    status: HttpStatus.OK,
    description: VERIFICATION_ROUTES.verifyCode,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  public async verifyCode(
    @User('id') id: string,
    @Body() body: { codeToSend: number; newEmail: string }
  ) {
    return this.verificationService.verifyCode(id, body);
  }
}
