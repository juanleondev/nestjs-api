import { Module } from '@nestjs/common';
import { AffiliatedCommunitiesService } from './affiliated-communities.service';
import { AffiliatedCommunitiesController } from './affiliated-communities.controller';

@Module({
  controllers: [AffiliatedCommunitiesController],
  providers: [AffiliatedCommunitiesService],
})
export class AffiliatedCommunitiesModule {}
