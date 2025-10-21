import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersPrivateService } from './users-private.service';
import { CreateUsersPrivateDto } from './dto/create-users-private.dto';
import { UpdateUsersPrivateDto } from './dto/update-users-private.dto';

@Controller('users-private')
export class UsersPrivateController {
  constructor(private readonly usersPrivateService: UsersPrivateService) {}

  @Post()
  create(@Body() createUsersPrivateDto: CreateUsersPrivateDto) {
    return this.usersPrivateService.create(createUsersPrivateDto);
  }

  @Get()
  findAll() {
    return this.usersPrivateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersPrivateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersPrivateDto: UpdateUsersPrivateDto,
  ) {
    return this.usersPrivateService.update(+id, updateUsersPrivateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersPrivateService.remove(+id);
  }
}
