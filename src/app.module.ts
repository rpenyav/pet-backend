import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { ClientsModule } from './clients/clients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { CasesModule } from './cases/cases.module';
import { ConsultationsModule } from './consultations/consultation.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    UsersModule,
    AuthModule,
    PatientsModule,
    ClientsModule,
    DoctorsModule,
    AppointmentsModule,
    CasesModule,
    ConsultationsModule,
    SettingsModule,
  ],
})
export class AppModule {}
