import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Geting all Users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserEntity,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Geting one User' })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @HttpCode(HttpStatus.OK)
  @Get('byid/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Creating Results Pdf' })
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Get('pdf/:id')
  getPdf(@Param('id') id: string) {
    return this.userService.getPdf(id);
  }

  @ApiOperation({ summary: 'Deleting User' })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }

  @ApiOperation({ summary: 'Updating User' })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBurgerDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateBurgerDto);
  }
}
