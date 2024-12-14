import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TelemetryModule } from './modules/telemetry/telemetry.module';
import { LaunchModule } from './modules/launch/launch.module';
import { TelemetryGateway } from './modules/telemetry/telemetry.gateway';

@Module({
  imports: [PrismaModule, TelemetryModule, LaunchModule],
  controllers: [AppController],
  providers: [AppService, TelemetryGateway],
})
export class AppModule {}
