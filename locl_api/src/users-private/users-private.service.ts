import { Injectable } from '@nestjs/common';
import { CreateUsersPrivateDto } from './dto/create-users-private.dto';
import { UpdateUsersPrivateDto } from './dto/update-users-private.dto';

@Injectable()
export class UsersPrivateService {
  create(createUsersPrivateDto: CreateUsersPrivateDto) {
    return 'This action adds a new usersPrivate';
  }

  findAll() {
    return `This action returns all usersPrivate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersPrivate`;
  }

  update(id: number, updateUsersPrivateDto: UpdateUsersPrivateDto) {
    return `This action updates a #${id} usersPrivate`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersPrivate`;
  }
}
