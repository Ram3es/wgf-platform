import { SAINA_ROUTES } from './constants';
import { CreateStreamDto } from './dto/create-stream.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SainaService } from './saina.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller(SAINA_ROUTES.main)
export class SainaController {
  constructor(private readonly sainaService: SainaService) {}

  @Post(SAINA_ROUTES.createStream)
  async create(@Body() dto: CreateStreamDto) {
    return await this.sainaService.createStream(dto);
  }

  @Post(SAINA_ROUTES.createSubject)
  async createSubject(@Body() dto: CreateSubjectDto) {
    return await this.sainaService.createSubject(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sainaService.findOneById(id);
  }
}
