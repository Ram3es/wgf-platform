import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LimitsAvidTrainerEmailDto } from './dto/limits-avid.dto';
import { LimitsEntity } from './entities/limits.entity';
import { LimitsService } from './limits.service';

import { LIMITS_ROUTES } from './limits.constants';

@ApiTags(LIMITS_ROUTES.main)
@Controller(LIMITS_ROUTES.main)
export class LimitsController {
  constructor(private readonly limitsService: LimitsService) {}

  @Post(LIMITS_ROUTES.getTrainerAvidLimits)
  @ApiOperation({ summary: LIMITS_ROUTES.getTrainerAvidLimits })
  @ApiResponse({
    status: HttpStatus.OK,
    description: LIMITS_ROUTES.getTrainerAvidLimits,
    type: LimitsEntity,
  })
  @HttpCode(HttpStatus.OK)
  public async getTrainerAvidLimits(@Body() body: LimitsAvidTrainerEmailDto) {
    return await this.limitsService.getTrainerAvidLimits(body.email);
  }
}
