import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    UsersModule,
    // AuthModule,

    // DiagnosisReportsModule,
    // AppointmentsModule,
    // CasesModule,

    // BillingCodesModule,
    // SettingsModule,
  ],
})
export class AppModule {}
