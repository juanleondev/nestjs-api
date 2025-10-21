import { Module } from '@nestjs/common';
import { UsersPrivateService } from './users-private.service';
import { UsersPrivateController } from './users-private.controller';

@Module({
  controllers: [UsersPrivateController],
  providers: [UsersPrivateService],
})
export class UsersPrivateModule {}
