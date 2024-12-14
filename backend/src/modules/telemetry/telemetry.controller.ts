import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post()
  async createTelemetry(
    @Body()
    body: {
      altitude: number;
      velocity: number;
      fuelLevel: number;
      latitude: number;
      longitude: number;
      launchId: number;
    },
  ) {
    return this.telemetryService.createTelemetry(body);
  }

  @Get(':launchId')
  async getTelemetry(@Param('launchId') launchId: string) {
    return this.telemetryService.getTelemetryByLaunch(Number(launchId));
  }
}
