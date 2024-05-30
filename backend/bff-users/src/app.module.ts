import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { ApiModule } from './api/api.module';
import { CommunicationModule } from 'infrastructure';
import config from './config/config';
import { busConfig } from 'infrastructure';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthCheckModule } from 'infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, busConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [ApiModule],
    }),
    ApiModule,
    CommunicationModule,
    HealthCheckModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
