// database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repository/user.repository.service';
import { OrganisationRepository } from './repository/organisation.repository.service';
import { OrganisationSchema, UserSchema } from 'data-model';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Asume que ConfigModule ya está configurado globalmente
      useFactory: async (configService: ConfigService) => ({
        // uri: 'mongodb://root:Pass4MONGO.38.242.195.225.2023@38.242.195.225:27017/admin?retryWrites=true&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1',
        uri: configService.get('mongo.url'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Organisation', schema: OrganisationSchema },
    ]),
  ],
  exports: [MongooseModule, UserRepository, OrganisationRepository],
  providers: [UserRepository, OrganisationRepository],
})
export class DatabaseModule {}
