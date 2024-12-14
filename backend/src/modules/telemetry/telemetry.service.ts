import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelemetryGateway } from './telemetry.gateway';

@Injectable()
export class TelemetryService {
  constructor(
    private prisma: PrismaService,
    private gateway: TelemetryGateway,
  ) {}

  async createTelemetry(data: {
    altitude: number;
    velocity: number;
    fuelLevel: number;
    latitude: number;
    longitude: number;
    launchId: number;
  }) {
    // Check if the launchId exists
    const launch = await this.prisma.launch.findUnique({
      where: { id: data.launchId },
    });

    if (!launch) {
      throw new NotFoundException(`Launch with ID ${data.launchId} not found.`);
    }

    // Proceed to create telemetry
    const telemetry = await this.prisma.telemetryData.create({
      data,
    });
    this.gateway.sendTelemetryUpdate(telemetry); // Emit event
    return telemetry;
  }

  async getTelemetryByLaunch(launchId: number) {
    return this.prisma.telemetryData.findMany({
      where: { launchId },
      select: {
        id: true,
        altitude: true,
        velocity: true,
        fuelLevel: true,
        latitude: true,
        longitude: true,
        timestamp: true,
      },
    });
  }
}
