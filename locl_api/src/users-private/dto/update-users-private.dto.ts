import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersPrivateDto } from './create-users-private.dto';

export class UpdateUsersPrivateDto extends PartialType(CreateUsersPrivateDto) {}
