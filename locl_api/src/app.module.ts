import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunitiesModule } from './communities/communities.module';
import { databaseConfig } from './config/database.config';
import { PlacesModule } from './places/places.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { CommunityTagsModule } from './community-tags/community-tags.module';
import { EmojisModule } from './emojis/emojis.module';
import { ConnectionsModule } from './connections/connections.module';
import { CommunityMembersModule } from './community-members/community-members.module';
import { AffiliatedCommunitiesModule } from './affiliated-communities/affiliated-communities.module';
import { PostReactionsModule } from './post-reactions/post-reactions.module';
import { PostCommentLikesModule } from './post-comment-likes/post-comment-likes.module';
import { UsersPrivateModule } from './users-private/users-private.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    CommunitiesModule,
    PlacesModule,
    UsersModule,
    PostsModule,
    PostCommentsModule,
    CommunityTagsModule,
    EmojisModule,
    ConnectionsModule,
    CommunityMembersModule,
    AffiliatedCommunitiesModule,
    PostReactionsModule,
    PostCommentLikesModule,
    UsersPrivateModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
