import { CreateStreamDto } from './dto/create-stream.dto';
import { ERoutes } from './constants';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SainaService } from './saina.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller(ERoutes.MAIN)
export class SainaController {
  constructor(private readonly sainaService: SainaService) {}

  @Post(ERoutes.STREAM)
  async create(@Body() dto: CreateStreamDto) {
    return await this.sainaService.createStream(dto);
  }

  @Post(ERoutes.SUBJECT)
  async createSubject(@Body() dto: CreateSubjectDto) {
    return await this.sainaService.createSubject(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sainaService.findOne(id);
  }
}
