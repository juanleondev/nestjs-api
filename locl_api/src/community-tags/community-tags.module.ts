import { Module } from '@nestjs/common';
import { CommunityTagsService } from './community-tags.service';
import { CommunityTagsController } from './community-tags.controller';

@Module({
  controllers: [CommunityTagsController],
  providers: [CommunityTagsService],
})
export class CommunityTagsModule {}
