import { Module } from '@nestjs/common';
import { TelemetryController } from './telemetry.controller';
import { TelemetryService } from './telemetry.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TelemetryGateway } from '../telemetry/telemetry.gateway';

@Module({
  imports: [PrismaModule], // Import PrismaModule here
  controllers: [TelemetryController],
  providers: [TelemetryService, TelemetryGateway],
})
export class TelemetryModule {}
